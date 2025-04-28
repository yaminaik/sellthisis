const express = require('express');
const router = express.Router();
const { createOrUpdateShop } = require('../controllers/userController');

router.post('/create-or-update-shop', createOrUpdateShop);

module.exports = router;
