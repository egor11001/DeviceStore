import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import './App.scss';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const { user } = React.useContext(Context);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          user.setIsAuth(true);
          user.setUser(true);
          if (data.role === 'ADMIN') {
            user.setIsRole(data.role);
          }
          console.log(user.isRole);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);
  if (loading) {
    return <Spinner animation={'grow'} />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
