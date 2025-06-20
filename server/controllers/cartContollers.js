const pool = require('../db/db');

exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart.quantity + $3 RETURNING *',
      [userId, productId, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

exports.updateCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const result = await pool.query(
      'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
      [quantity, userId, productId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

exports.deleteFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    await pool.query('DELETE FROM cart WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};
