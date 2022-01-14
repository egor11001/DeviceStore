import { observer } from 'mobx-react-lite';
import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Context } from '..';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Page from '../components/Page';
import TypeBar from '../components/TypeBar';
import usePagination from '../hooks/usePagination';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import { check } from '../http/userAPI';

const Shop = observer(() => {
  const { device, user } = React.useContext(Context);

  React.useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  React.useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.selectedType, device.selectedBrand]);

  const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, setPage, totalPages } =
    usePagination({
      contentPerPage: 8,
      count: device.totalCount,
    });

  return (
    <Container>
      <Row className="mt-4">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList firstContentIndex={firstContentIndex} lastContentIndex={lastContentIndex} />
          <Page
            nextPage={nextPage}
            prevPage={prevPage}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
