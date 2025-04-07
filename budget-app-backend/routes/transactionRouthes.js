// backend/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ GET all transactions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Failed to get transactions' });
  }
});

// ➕ POST a new transaction
router.post('/', async (req, res) => {
  const { user_id, description, amount, category, date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO transactions (user_id, description, amount, category, date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, description, amount, category, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

module.exports = router;
