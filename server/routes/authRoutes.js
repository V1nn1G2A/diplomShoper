// server/routes/authRoutes.js
const express = require('express');
const { login, getUserByPhone } = require('../controllers/authControllers');

const router = express.Router();

router.post('/login', login);
router.get('/user/:phone', getUserByPhone);

module.exports = router;