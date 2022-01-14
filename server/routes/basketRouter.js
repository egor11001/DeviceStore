const Router = require('express');
const basketController = require('../controllers/basketController');
const router = new Router();

router.post('/', basketController.update);
router.post('/del', basketController.delete);
router.get('/', basketController.getAll);

module.exports = router;
