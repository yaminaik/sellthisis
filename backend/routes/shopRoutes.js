const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { createShop, getMyShops, updateShop, deleteShop,getShopByLink, publishShop } = require('../controllers/shopController');


router.post('/create', verifyToken, createShop);
router.get('/myshops', verifyToken, getMyShops);
router.put('/update/:shopId', verifyToken, updateShop);
router.delete('/delete/:shopId', verifyToken, deleteShop);
router.get('/:shopLink',getShopByLink);
router.post('/:shopLink/publish',verifyToken, publishShop);

module.exports = router;
