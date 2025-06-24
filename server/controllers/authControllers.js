// server/controllers/authControllers.js
const pool = require('../db/db');

exports.login = async (req, res) => {
  const { phone } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const user = result.rows[0];
    
    // Простая авторизация по телефону (в реальном проекте должна быть проверка пароля)
    res.json({
      token: `token_${user.id}`, // Простой токен для примера
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

exports.register = async (req, res) => {
  const { first_name, last_name, middle_name, email, phone, city } = req.body;

  try {
    // Проверяем, не существует ли уже пользователь с таким телефоном или email
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE phone = $1 OR email = $2', 
      [phone, email]
    );
    
    if (existingUser.rows.length > 0) {
      const existing = existingUser.rows[0];
      if (existing.phone === phone) {
        return res.status(400).json({ error: 'Пользователь с таким номером телефона уже существует' });
      }
      if (existing.email === email) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      }
    }

    // Создаем нового пользователя
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, middle_name, email, phone, city, role)
       VALUES ($1, $2, $3, $4, $5, $6, 'user') RETURNING *`,
      [first_name, last_name, middle_name, email, phone, city]
    );

    const user = result.rows[0];
    
    res.status(201).json({
      token: `token_${user.id}`,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.getUserByPhone = async (req, res) => {
  const { phone } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};