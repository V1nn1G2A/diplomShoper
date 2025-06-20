// server/routes/cartRoutes.js
const express = require('express');
const { getCartByUserId, addToCart, updateCartItem, deleteFromCart } = require('../controllers/cartControllers');

const router = express.Router();

router.get('/:userId', getCartByUserId);
router.post('/:userId', addToCart);
router.put('/:userId', updateCartItem);
router.delete('/:userId/:productId', deleteFromCart);

module.exports = router;