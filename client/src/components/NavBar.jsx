import React from 'react';
import { Context } from '..';
import { Navbar, Container, Nav, Button, Form, ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';

const NavBar = observer(() => {
  const { user, device } = React.useContext(Context);
  const navigate = useNavigate();
  const [display, setDisplay] = React.useState(device.devices);
  const [showDisplay, setShowDisplay] = React.useState(false);
  const ref = React.useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDisplay(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  const handleSearch = (e) => {
    let searchQuery = e.target.value.toLowerCase();
    let displayedDevices = device.devices.filter((d) => {
      let searchValue = d.name.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    setDisplay(displayedDevices);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ textDecoration: 'none', color: 'white', fontSize: 24 }} to={SHOP_ROUTE}>
          DeviceStore
        </NavLink>
        <div ref={ref} className="d-flex flex-column">
          <Form.Control
            onClick={() => setShowDisplay(true)}
            style={{ width: 293 }}
            onChange={(e) => handleSearch(e)}
            type="search"
            placeholder="Search"
            className="me-2 search-field"
            aria-label="Search"
          />
          {showDisplay ? (
            <ListGroup style={{ zIndex: 10, marginTop: 38 }} className="position-fixed">
              {display.map((d) => (
                <ListGroup.Item
                  style={{ cursor: 'pointer' }}
                  action
                  onClick={() => navigate(DEVICE_ROUTE + '/' + d.id)}
                  key={d.id}>
                  {d.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : null}
        </div>
        {user.isAuth ? (
          user.isRole === 'ADMIN' ? (
            <Nav className="ml-auto">
              <Button onClick={() => navigate(ADMIN_ROUTE)} variant={'outline-light'}>
                Админ панель
              </Button>
              <Button
                className="ms-4"
                onClick={() => navigate(BASKET_ROUTE)}
                variant={'outline-light'}>
                Корзина
              </Button>
              <Button onClick={() => logOut()} className="ms-4">
                Выйти
              </Button>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Button
                className="ms-4"
                onClick={() => navigate(BASKET_ROUTE)}
                variant={'outline-light'}>
                Корзина
              </Button>
              <Button onClick={() => logOut()} className="ms-4">
                Выйти
              </Button>
            </Nav>
          )
        ) : (
          <Nav className="ml-auto">
            <Button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
