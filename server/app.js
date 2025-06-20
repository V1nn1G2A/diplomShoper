// server/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./db/db');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Пример запроса к базе
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
