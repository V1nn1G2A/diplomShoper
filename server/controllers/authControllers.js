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