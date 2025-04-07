const db = require('../db'); // Adjust this if your DB connection is elsewhere

// Create a new user
async function createUser(name, email, password) {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING user_id, name, email
  `;
  const values = [name, email, password];
  const result = await db.query(query, values);
  return result.rows[0];
}

// Find user by email
async function findUserByEmail(email) {
  const query = `
    SELECT * FROM users WHERE email = $1
  `;
  const result = await db.query(query, [email]);
  return result.rows[0];
}

// Optionally: Find user by ID
async function findUserById(userId) {
  const query = `
    SELECT user_id, name, email FROM users WHERE user_id = $1
  `;
  const result = await db.query(query, [userId]);
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};

