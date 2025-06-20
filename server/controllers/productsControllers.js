const pool = require('../db/db');

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
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
  const { title, description, price, characteristics } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (title, description, price, characteristics) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, price, characteristics]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { title, description, price, characteristics } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET title = $1, description = $2, price = $3, characteristics = $4 WHERE id = $5 RETURNING *',
      [title, description, price, characteristics, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
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
