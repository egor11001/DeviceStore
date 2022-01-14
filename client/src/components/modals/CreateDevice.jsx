import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { Context } from '../..';
import { fetchTypes, fetchBrands, createDevice } from '../../http/deviceAPI';

const CreateDevice = observer(({ show, onHide }) => {
  React.useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('typeId', device.selectedType.id);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('info', JSON.stringify(info));
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить устройство</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex flex-row">
            <Dropdown>
              <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map((type) => (
                  <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="ms-2">
              <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map((brand) => (
                  <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Form.Control
            className="mt-3"
            placeholder="Введите название устройства..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            type="number"
            placeholder="Введите стоимость устройства (руб.)..."
            value={price}
            onChange={(e) => Number(setPrice(e.target.value))}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button onClick={addInfo} variant={'outline-dark'}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-3" key={i.number}>
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
        <Button variant={'outline-success'} onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
