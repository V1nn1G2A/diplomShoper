const pool = require('../db/db');

// Получить всех пользователей
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};

// Получить одного пользователя
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};

// Создать пользователя
exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, middle_name, email, phone, city } = req.body;
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, middle_name, email, phone, city)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, last_name, middle_name, email, phone, city]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};

// Обновить пользователя
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, middle_name, email, phone, city } = req.body;
    const result = await pool.query(
      `UPDATE users
       SET first_name = $1, last_name = $2, middle_name = $3, email = $4, phone = $5, city = $6
       WHERE id = $7 RETURNING *`,
      [first_name, last_name, middle_name, email, phone, city, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};

// Удалить пользователя
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};
