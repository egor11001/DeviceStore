const Router = require('express');
const orderController = require('../controllers/orderController');
const router = new Router();

router.post('/create', orderController.create);
router.get('/:id', orderController.get);

module.exports = router;
