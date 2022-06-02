import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../http/deviceAPI';
import { ORDER_ROUTE } from '../utils/consts';

const OrderCreate = () => {
  const [value, setValue] = useState('');
  const info = useLocation().state;
  const navigate = useNavigate();

  const onSubmit = async () => {
    const token = localStorage.getItem('token');
    await createOrder({
      token: token,
      userId: info.user.id,
      address: value,
      total_price: info.total_price,
      devices: info.devices.map((item) => {
        return item.id;
      }),
    }).then((data) => {
      navigate(ORDER_ROUTE + `/${data.id}`);
    });
  };

  return (
    <Container className="d-flex flex-column mt-5">
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Введите адрес доставки</Form.Label>
        <Form.Control
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="г. Красноярск, Свободный 78"
        />
      </Form.Group>
      <h4 style={{ margin: '10px 0 20px 0' }}>Итоговая сумма: {info.total_price}₽</h4>
      <Button variant="primary" onClick={onSubmit}>
        Готово
      </Button>
    </Container>
  );
};

export default OrderCreate;
