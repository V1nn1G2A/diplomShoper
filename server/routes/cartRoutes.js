const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartContollers');

router.post('/:userId/cart', controller.addToCart);
router.put('/:userId/cart', controller.updateCartItem);
router.delete('/:userId/cart/:productId', controller.deleteFromCart);

module.exports = router;
