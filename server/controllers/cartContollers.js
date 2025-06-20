// server/controllers/cartControllers.js
const pool = require('../db/db');

exports.getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        c.id as cart_id,
        c.quantity,
        p.id,
        p.name,
        p.description,
        p.price,
        p.characteristics
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
    `, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};

exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity = 1 } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + $3 RETURNING *',
      [userId, productId, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};

exports.updateCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    if (quantity <= 0) {
      // Если количество 0 или меньше, удаляем товар из корзины
      await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [userId, productId]);
      res.status(204).send();
    } else {
      const result = await pool.query(
        'UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
        [quantity, userId, productId]
      );
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};

exports.deleteFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
};