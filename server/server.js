const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const pool = require('./db/db');
const usersRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const seedDatabase = require('./seedDatabase');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Логирование всех входящих запросов
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

const PORT = process.env.PORT || 5000;

// Подключение ручек
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

seedDatabase();
