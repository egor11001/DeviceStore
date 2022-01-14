import React from 'react';
import { Container, Col, Image, Row, Card, Button, Modal } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevices, setDeviceRating, updateBasket } from '../http/deviceAPI';

const DevicePage = () => {
  const [device, setDevice] = React.useState({ info: [] });
  const [show, setShow] = React.useState(false);
  const { id } = useParams();

  React.useEffect(() => {
    fetchOneDevices(id).then((data) => setDevice(data));
  }, []);

  const upRating = (id) => {
    setDeviceRating(id).then((data) => {
      fetchOneDevices(id).then((data) => setDevice(data));
    });
  };

  const setBasket = (id) => {
    const token = localStorage.getItem('token');
    updateBasket({ id: id, token: token }).then((data) => setShow(true));
  };

  const handleClose = () => setShow(false);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column">
            <div>
              <h2>{device.name}</h2>
              <div
                style={{
                  background: `url(${bigStar}) no-repeat center center`,
                  width: 240,
                  height: 240,
                  backgroundSize: 'cover',
                  fontSize: 64,
                  cursor: 'pointer',
                }}
                className="d-flex align-items-center justify-content-center"
                onClick={() => upRating(id)}>
                {device.rating}
              </div>
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: '5px solid lightgray',
            }}>
            <h3>от {device.price} руб.</h3>
            <Button onClick={() => setBasket(id)} variant={'outline-dark'}>
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-4">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
      <Modal style={{ marginTop: 200 }} show={show} onHide={handleClose}>
        <Modal.Body className="align-self-center">
          <Modal.Title className="mb-3 mt-3">Товар добавлен в корзину !</Modal.Title>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DevicePage;
