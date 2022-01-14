import React from 'react';
import { Container, Button } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import InfoList from '../components/InfoList';

const Admin = () => {
  const [brandVisible, setBrandVisible] = React.useState(false);
  const [deviceVisible, setDeviceVisible] = React.useState(false);
  const [typeVisible, setTypeVisible] = React.useState(false);
  return (
    <Container className="d-flex flex-column">
      <Button onClick={() => setBrandVisible(true)} variant={'outline-dark'} className="mt-4 p-2">
        Добавить бренд
      </Button>
      <Button onClick={() => setTypeVisible(true)} variant={'outline-dark'} className="mt-4 p-2">
        Добавить тип
      </Button>
      <Button onClick={() => setDeviceVisible(true)} variant={'outline-dark'} className="mt-4 p-2">
        Добавить устройство
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <InfoList />
    </Container>
  );
};

export default Admin;
