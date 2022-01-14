import { observer } from 'mobx-react-lite';
import React from 'react';
import { Container, NavDropdown, Image, Button } from 'react-bootstrap';
import { deleteBasket, fetchBasket } from '../http/deviceAPI';

const Basket = observer(() => {
  const sortItems = ['Без сортировки', 'По возрастанию', 'По убыванию'];
  const [sort, setSort] = React.useState(sortItems[0]);
  const [devices, setDevices] = React.useState(null);
  const [tPrice, setTPrice] = React.useState(0);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    fetchBasket(token).then((data) => {
      setDevices(data.result);
      setTPrice(data.tPrice);
    });
  }, []);

  const handleSort = (sortby, index) => {
    if (sortby === 'По возрастанию') {
      setDevices(
        devices.sort((a, b) => {
          return a.price - b.price;
        }),
      );
      setSort(sortItems[index]);
    } else if (sortby === 'По убыванию') {
      setDevices(
        devices.sort((a, b) => {
          return b.price - a.price;
        }),
      );
      setSort(sortItems[index]);
    } else {
      setDevices(
        devices.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
        }),
      );
      setSort(sortItems[index]);
    }
  };
  const removeDevice = (id) => {
    const token = localStorage.getItem('token');
    deleteBasket({ id: id, token: token }).then((data) => {
      fetchBasket(token).then((data) => {
        setDevices(data.result);
        setTPrice(data.tPrice);
      });
    });
  };
  return (
    <Container className="d-flex flex-column mt-5">
      <Container className="d-flex justify-content-between mt-5 align-items-center">
        <h3 style={{ margin: 0 }}>Корзина</h3>
        <NavDropdown title={sort} menuVariant="dark">
          {sortItems.map(
            (item, index) =>
              item !== sort && (
                <NavDropdown.Item onClick={() => handleSort(sortItems[index], index)} key={index}>
                  {item}
                </NavDropdown.Item>
              ),
          )}
        </NavDropdown>
      </Container>
      <hr />
      <Container style={{ height: 600, overflowY: 'auto' }} className="d-flex flex-column">
        {devices ? (
          devices.map((device) => (
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
              <Button
                onClick={() => removeDevice(device.id)}
                size={'m'}
                className="me-5"
                variant={'outline-danger'}>
                X
              </Button>
            </div>
          ))
        ) : (
          <Container>А пока тут пусто</Container>
        )}
      </Container>
      <hr />
      <Container style={{ width: 930, padding: 30 }} className="d-flex  align-items-center">
        <h3 style={{ margin: 0, fontWeight: 400, fontSize: 24 }}>Итого: </h3>
        <h3 style={{ marginBottom: 0, marginLeft: 15, fontSize: 24, fontWeight: 600 }}>
          {tPrice} ₽
        </h3>
        <Button className="ms-auto" size={'lg'} variant={'success'}>
          Перейти к оформлению
        </Button>
      </Container>
    </Container>
  );
});

export default Basket;
