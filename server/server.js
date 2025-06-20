const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const pool = require('./db/db'); // пусть остаётся, если нужен
const usersRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Подключение ручек
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
