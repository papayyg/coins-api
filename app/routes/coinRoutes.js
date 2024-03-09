const express = require('express');
const coinController = require('../controllers/coinController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/categories', coinController.getCategories);
router.get('/category/:id', coinController.getCategory);
router.post('/category', authMiddleware.authenticateToken, coinController.addCategory);
router.delete('/category/:id', authMiddleware.authenticateToken, coinController.deleteCategory);
router.put('/category/:id', authMiddleware.authenticateToken, coinController.editCategory);

module.exports = router;
