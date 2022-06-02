import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getOrder } from '../http/deviceAPI';

const OrderPage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);

  React.useEffect(() => {
    getOrder(id).then((data) => {
      setInfo(data);
      console.log(data);
    });
  }, []);
  return (
    <Container className="d-flex flex-column mt-5">
      <h2 style={{ marginBottom: '20px' }}>Номер заказа: {info?.order?.id}</h2>
      <h2>Email: {info?.email}</h2>
      <Container style={{ height: 550, overflowY: 'auto' }} className="d-flex flex-column">
        {info?.devices
          ? info?.devices.map((device) => (
              <div
                key={device.id}
                style={{ width: 930, padding: 30, borderColor: '#E3E3E3' }}
                className="d-flex justify-content-between align-items-center align-self-center mt-2 mb-2 border rounded">
                <Image width={120} height={120} src={process.env.REACT_APP_API_URL + device.img} />
                <div style={{ width: 350 }} className="d-inline-flex flex-column">
                  <h4 style={{ fontSize: 18, fontWeight: 500, marginBottom: 5 }}>{device.name}</h4>
                  <p style={{ fontSize: 14, margin: 0 }}>Rating: {device.rating}</p>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{device.price} ₽</h3>
              </div>
            ))
          : null}
      </Container>
      <h3 style={{ marginBottom: '20px' }}>Адрес доставки: {info?.order?.address}</h3>
      <h3 style={{ marginBottom: '20px' }}>Итоговая цена: {info?.order?.total_price}</h3>
    </Container>
  );
};

export default OrderPage;
