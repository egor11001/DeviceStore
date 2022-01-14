import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';

export const Context = React.createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
    }}>
    <App />
  </Context.Provider>,
  document.getElementById('root'),
);
