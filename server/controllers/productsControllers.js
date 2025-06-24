const pool = require('../db/db');

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY category, name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, characteristics, image_url, category } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, characteristics, image_url, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, characteristics, image_url, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, characteristics, image_url, category } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, characteristics = $4, image_url = $5, category = $6 WHERE id = $7 RETURNING *',
      [name, description, price, characteristics, image_url, category, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};