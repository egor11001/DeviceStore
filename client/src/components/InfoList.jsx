import { observer } from 'mobx-react-lite';
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Context } from '..';
import {
  deleteType,
  deleteBrand,
  deleteDevice,
  fetchTypes,
  fetchBrands,
  fetchDevices,
} from '../http/deviceAPI';
import UpdateDevice from './modals/UpdateDevice';

const InfoList = observer(() => {
  const { device } = React.useContext(Context);
  const [updateVisible, setUpdateVisible] = React.useState(false);
  const [propId, setPropId] = React.useState(null);

  React.useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices().then((data) => device.setDevices(data.rows));
  }, []);

  const removeType = (type) => {
    deleteType(type).then((data) => {
      fetchTypes().then((data) => {
        device.setTypes(data);
      });
    });
  };

  const removeBrand = (brand) => {
    deleteBrand(brand).then((data) => {
      fetchBrands().then((data) => {
        device.setBrands(data);
      });
    });
  };

  const removeDevice = (item) => {
    deleteDevice(item).then((data) => {
      fetchDevices().then((data) => {
        device.setDevices(data.rows);
      });
    });
  };

  const onUpdate = (id) => {
    setPropId(id);
    setUpdateVisible(true);
  };

  return (
    <Container className="d-flex flex-row justify-content-between mt-5">
      <Container className="d-flex flex-column ">
        <h3 className="d-inline-block align-self-center">Удалить тип</h3>
        {device.types.map((type) => (
          <Container
            key={type.id}
            style={{ border: '1px solid grey' }}
            className="d-flex flex-row align-items-center p-2 justify-content-between">
            <h5 className="m-0">{type.name}</h5>
            <Button onClick={() => removeType(type)} variant={'outline-danger'} className="ms-4">
              X
            </Button>
          </Container>
        ))}
      </Container>
      <Container className="d-flex flex-column ">
        <h3 className="d-inline-block align-self-center">Удалить бренд</h3>
        {device.brands.map((brand) => (
          <Container
            key={brand.id}
            style={{ border: '1px solid grey' }}
            className="d-flex flex-row align-items-center p-2 justify-content-between">
            <h5 className="m-0">{brand.name}</h5>
            <Button onClick={() => removeBrand(brand)} variant={'outline-danger'} className="ms-4">
              X
            </Button>
          </Container>
        ))}
      </Container>
      <Container className="d-flex flex-column ">
        <h3 className="d-inline-block align-self-center">Удалить товар</h3>
        {device.devices.map((item) => (
          <Container
            key={item.id}
            style={{ border: '1px solid grey' }}
            className="d-flex flex-row align-items-center p-2 justify-content-between">
            <h5 className="m-0 d-inline-block">ID: {item.id}</h5>
            <p className="m-0 d-inline-block">{item.name}</p>
            <Button onClick={() => onUpdate(item.id)} variant={'outline-danger'}>
              Изменить
            </Button>
            <Button onClick={() => removeDevice(item)} variant={'outline-danger'} className="ms-4">
              X
            </Button>
          </Container>
        ))}
        {propId ? (
          <UpdateDevice
            show={updateVisible}
            onHide={() => {
              setUpdateVisible(false);
              setPropId(null);
            }}
            id={propId}
          />
        ) : null}
      </Container>
    </Container>
  );
});

export default InfoList;
