const db = require('../config/database');

class User {
  static async findAll() {
    try {
      const [rows] = await db.query('SELECT id, username, email, created_at FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(userData) {
    try {
      const { username, email, password } = userData;
      const [result] = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, userData) {
    try {
      const { username, email } = userData;
      const [result] = await db.query(
        'UPDATE users SET username = ?, email = ? WHERE id = ?',
        [username, email, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;