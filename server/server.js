// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const pool = require('./db/db');
const usersRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Подключение ручек
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// Опциональное заполнение БД (раскомментировать при необходимости)
/*
const seedDatabase = async () => {
  try {
    // Проверяем, есть ли уже данные
    const productsCheck = await pool.query('SELECT COUNT(*) FROM products');
    const usersCheck = await pool.query('SELECT COUNT(*) FROM users');
    
    if (parseInt(productsCheck.rows[0].count) > 0 || parseInt(usersCheck.rows[0].count) > 0) {
      console.log('Database already has data, skipping seed');
      return;
    }

    console.log('Seeding database...');
    
    // Добавляем пользователей
    await pool.query(`
      INSERT INTO users (first_name, last_name, middle_name, email, phone, city, role)
      VALUES
        ('Иван', 'Иванов', 'Иванович', 'ivan@example.com', '89001234567', 'Москва', 'admin'),
        ('Петр', 'Петров', 'Петрович', 'petr@example.com', '89007654321', 'Санкт-Петербург', 'user'),
        ('Анна', 'Сидорова', 'Александровна', 'anna@example.com', '89123456789', 'Екатеринбург', 'user'),
        ('Михаил', 'Козлов', 'Викторович', 'mikhail@example.com', '89876543210', 'Новосибирск', 'user')
    `);

    // Добавляем товары (сокращенный список для примера)
    const products = [
      ['Intel Core i5-13600K', 'Мощный 14-ядерный процессор для игр и работы', 29990.00, '{"Ядра": "14", "Потоки": "20", "Базовая частота": "3.5 ГГц", "Турбо частота": "5.1 ГГц", "Сокет": "LGA1700"}'],
      ['NVIDIA GeForce RTX 4070', 'Мощная видеокарта для 1440p гейминга', 59990.00, '{"Память": "12 ГБ GDDR6X", "Шина памяти": "192 бит", "Базовая частота": "1920 МГц", "Boost частота": "2475 МГц"}'],
      ['Kingston FURY Beast 16GB DDR4', 'Быстрая игровая память DDR4', 4990.00, '{"Объем": "16 ГБ", "Тип": "DDR4", "Частота": "3200 МГц", "Тайминги": "CL16", "Количество модулей": "2x8 ГБ"}'],
      ['Samsung 980 PRO 1TB', 'Скоростной NVMe SSD для профессионалов', 12990.00, '{"Объем": "1 ТБ", "Интерфейс": "NVMe PCIe 4.0", "Скорость чтения": "7000 МБ/с", "Скорость записи": "5000 МБ/с"}'],
      ['ASUS TUF Gaming VG27AQ', '27" игровой монитор с G-Sync', 29990.00, '{"Диагональ": "27 дюймов", "Разрешение": "2560x1440", "Частота": "165 Гц", "Матрица": "IPS", "Время отклика": "1 мс"}']
    ];

    for (const product of products) {
      await pool.query(
        'INSERT INTO products (name, description, price, characteristics) VALUES ($1, $2, $3, $4)',
        product
      );
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Раскомментировать для заполнения БД
// seedDatabase();
*/