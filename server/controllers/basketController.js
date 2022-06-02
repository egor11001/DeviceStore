const { Basket, BasketDevice, Device } = require('../models/models');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

class BasketController {
  async update(req, res) {
    const { id, token } = req.body;
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const basket = await Basket.findOne({ where: { userId: decoded.id } });
    const basketItem = await BasketDevice.create({ basketId: basket.id, deviceId: id });
    return res.json(basketItem);
  }
  async getAll(req, res) {
    const { token } = req.query;
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const devices = await BasketDevice.findAll({ where: { basketId: decoded.id } });

    const arr = devices.map((device) => device.deviceId);

    let result = [];
    let tPrice = 0;
    for (let i = 0; i < arr.length; i++) {
      let d = await Device.findOne({ where: { id: arr[i] } });
      result.push(d);
      tPrice = tPrice + d.price;
    }

    return res.json({
      result: result,
      tPrice: tPrice,
      user: { id: decoded.id, email: decoded.email },
    });
  }
  async delete(req, res) {
    const { id, token } = req.body;
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const basket = await Basket.findOne({ where: { userId: decoded.id } });
    const result = await BasketDevice.destroy({ where: { basketId: basket.id, deviceId: id } });
    return res.json(result);
  }
}

module.exports = new BasketController();
