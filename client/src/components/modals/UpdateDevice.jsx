import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { fetchOneDevices, updateDevice } from '../../http/deviceAPI';

const UpdateDevice = ({ show, onHide, id }) => {
  const [device, setDevice] = React.useState({});
  const [devInfo, setDevInfo] = React.useState([]);

  const [file, setFile] = React.useState(null);

  const update = () => {
    const formData = new FormData();
    formData.append('id', device.id);
    formData.append('name', device.name);
    formData.append('price', `${device.price}`);
    formData.append('img', file);
    formData.append('info', JSON.stringify(devInfo));
    updateDevice(formData).then((data) => {
      onHide();
    });
  };

  React.useEffect(() => {
    fetchOneDevices(id).then((data) => {
      setDevice(data);
      data.info = data.info.map((i) => ({ ...i, number: Date.now() + i.id }));
      setDevInfo(data.info);
    });
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addInfo = () => {
    setDevInfo([...devInfo, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setDevInfo(devInfo.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setDevInfo(devInfo.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Изменить устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            placeholder="Название устройства"
            value={device.name || ''}
            onChange={(e) => setDevice({ ...device, name: e.target.value })}
          />
          <Form.Control
            className="mt-3"
            type="number"
            placeholder="Стоимость устройства (руб.)"
            value={device.price || 0}
            onChange={(e) => Number(setDevice({ ...device, price: e.target.value }))}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button onClick={addInfo} variant={'outline-dark'}>
            Добавить новое свойство
          </Button>
          {devInfo.map((i, index) => (
            <Row className="mt-3" key={i.number + index}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button onClick={() => removeInfo(i.number)} variant={'outline-danger'}>
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>
          Закрыть
        </Button>
        <Button variant={'outline-success'} onClick={update}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateDevice;
