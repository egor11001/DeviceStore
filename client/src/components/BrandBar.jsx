import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Context } from '..';

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Container className="d-flex flex-wrap">
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: 'pointer' }}
          action="true"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
          key={brand.id}
          className="p-3">
          {brand.name}
        </Card>
      ))}
    </Container>
  );
});

export default BrandBar;
