import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '../';

let regExpEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Auth = observer(() => {
  const { user } = React.useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const click = async () => {
    try {
      let data;
      if (!regExpEmail.test(email)) {
        window.alert('Некорректный email !');
      }
      if (isLogin) {
        data = await login(email, password);
      } else {
        if (password >= 4) {
          data = await registration(email, password);
        } else {
          window.alert('Пароль должен быть больше 4 символов !');
        }
      }
      user.setUser(data);
      user.setIsAuth(true);
      if (data.role === 'ADMIN') {
        user.setIsRole('ADMIN');
      } else {
        user.setIsRole('USER');
      }
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Container className="d-flex justify-content-between mt-3 p-0">
            {isLogin ? (
              <div>
                Нет аккаунта ? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт ? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
              </div>
            )}
            <Button onClick={() => click()} variant={'outline-success'}>
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Container>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
