// server/routes/authRoutes.js
const express = require('express');
const { login, register, getUserByPhone } = require('../controllers/authControllers');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/user/:phone', getUserByPhone);

module.exports = router;