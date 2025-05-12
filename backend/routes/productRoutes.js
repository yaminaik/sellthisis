const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { addProduct, getProductsForShop, deleteProduct } = require('../controllers/productController');
const multer = require('multer');

// 🧠 For now, store in memory (or change to diskStorage if you want to save locally)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add/:shopId', verifyToken, upload.single('image'), addProduct);
router.get('/:shopId', getProductsForShop);
router.delete('/delete/:productId', verifyToken, deleteProduct);

module.exports = router;
