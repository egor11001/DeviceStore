import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '..';
import DeviceItem from './DeviceItem';

const DeviceList = observer(({ firstContentIndex, lastContentIndex }) => {
  const { device } = useContext(Context);

  const brandName = (id) => {
    const result = device.brands.filter((brand) => brand.id === id);
    return result[0].name;
  };
  return (
    <Row className="d-flex mt-4">
      {device.devices.slice(firstContentIndex, lastContentIndex).map((d) => (
        <DeviceItem key={d.id} device={d} brand={brandName} />
      ))}
    </Row>
  );
});

export default DeviceList;
