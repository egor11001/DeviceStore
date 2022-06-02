const { Device, Order, User } = require('../models/models');

class OrderController {
  async create(req, res) {
    const { userId, address, devices, total_price, token } = req.body;
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const order = await Order.create({ userId, address, devices, total_price });

    return res.json(order);
  }

  async get(req, res) {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
    });

    const devices = await Device.findAll({
      where: { id: order.devices },
    });

    const user = await User.findOne({ where: { id: order.userId } });

    return res.json({ order, devices, email: user.email });
  }
}

module.exports = new OrderController();
