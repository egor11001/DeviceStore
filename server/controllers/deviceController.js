const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
  async create(req, res, next) {
    const { token } = req.query;
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    try {
      let { name, price, brandId, typeId, info } = req.body;
      let fileName;
      if (!req.files) {
        fileName = 'None.jpg';
      } else {
        const { img } = req.files;
        fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
      }
      const device = await Device.create({ name, price, brandId, typeId, img: fileName });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res) {
    const { id } = req.body;

    if (DeviceInfo.findOne({ where: { deviceId: id } })) {
      DeviceInfo.destroy({
        where: { deviceId: id },
      });
    }
    const result = await Device.destroy({ where: { id: id } });
    return res.json(result);
  }

  async update(req, res, next) {
    try {
      let { id, name, price, info } = req.body;

      const device = await Device.findOne({ where: { id: id } });
      await device.update({ name: name, price: price });

      if (req.files) {
        const { img } = req.files;
        let fileName;
        fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        await device.update({ img: fileName });
      }

      if (info) {
        info = JSON.parse(info);

        if (await DeviceInfo.findOne({ where: { deviceId: id } })) {
          await DeviceInfo.destroy({
            where: { deviceId: id },
          });
        }

        info.forEach(async (i) => {
          await DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: id,
          });
        });
      }
      await device.save();

      return res.json('Gotovo');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId } = req.query;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll();
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId } });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId } });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { brandId, typeId } });
    }
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    });
    return res.json(device);
  }

  async setRating(req, res) {
    const { id } = req.params;
    let updatedDevice = {};
    const device = await Device.findOne({ where: { id: id } });
    if (req.body.value === 1) {
      updatedDevice = await device.increment('rating');
    } else {
      updatedDevice = await device.decrement('rating');
    }

    return res.json(updatedDevice);
  }
}

module.exports = new DeviceController();
