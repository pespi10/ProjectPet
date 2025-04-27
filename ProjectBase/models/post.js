const db = require('../config/database');

class Post {
  static async findAll() {
    try {
      const [rows] = await db.query(`
        SELECT p.*, u.username 
        FROM posts p
        JOIN users u ON p.user_id = u.id
        ORDER BY p.created_at DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query(`
        SELECT p.*, u.username 
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(postData) {
    try {
      const { title, content, user_id } = postData;
      const [result] = await db.query(
        'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
        [title, content, user_id]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, postData) {
    try {
      const { title, content } = postData;
      const [result] = await db.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      const [rows] = await db.query('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC', [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Post;