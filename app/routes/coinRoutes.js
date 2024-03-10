const express = require('express');
const coinController = require('../controllers/coinController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', coinController.getCategories);
router.get('/list', coinController.getCoinsByFilter);
router.get('/:id', coinController.getCoin);
router.post('/', authMiddleware.authenticateToken, coinController.addCoin);
router.put('/:id', authMiddleware.authenticateToken, coinController.editCoin);
router.delete('/:id', authMiddleware.authenticateToken, coinController.deleteCoin);

module.exports = router;
