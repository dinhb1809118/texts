const express = require('express');
const router = express.Router();
const CartController = require('../app/controllers/CartController');


router.get('/all', CartController.showall);
router.post('/add', CartController.addToCart);

module.exports = router;