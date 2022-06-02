import { $host, $authHost } from './index';

export const createType = async (type) => {
  const { data } = await $authHost.post('api/type', type);
  return data;
};

export const deleteType = async (type) => {
  const { data } = await $authHost.post('api/type/del', type);
  return data;
};

export const deleteBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand/del', brand);
  return data;
};

export const deleteDevice = async (device) => {
  const { data } = await $authHost.post('api/device/del', device);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type');
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('api/brand', brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get('api/brand');
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post('api/device', device);
  return data;
};

export const fetchDevices = async (typeId, brandId) => {
  const { data } = await $host.get('api/device', {
    params: {
      typeId,
      brandId,
    },
  });
  return data;
};

export const fetchOneDevices = async (id) => {
  const { data } = await $host.get('api/device/' + id);
  return data;
};

export const setDeviceRating = async (info) => {
  const { data } = await $host.post('api/device/' + info.id, info);
  return data;
};

export const updateBasket = async (info) => {
  const { data } = await $host.post('api/basket', info);
  return data;
};

export const fetchBasket = async (token) => {
  const { data } = await $host.get('api/basket', { params: { token } });
  return data;
};

export const deleteBasket = async (info) => {
  const { data } = await $host.post('api/basket/del', info);
  return data;
};

export const updateDevice = async (info) => {
  const { data } = await $authHost.post('api/device/update', info);
  return data;
};

export const createOrder = async (info) => {
  const { data } = await $host.post('api/order/create', info);
  return data;
};

export const getOrder = async (id) => {
  const { data } = await $host.get('api/order/' + id);
  return data;
};
