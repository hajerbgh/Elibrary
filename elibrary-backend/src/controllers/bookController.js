const db = require('../config/db');

exports.getBooks = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT b.*, c.name as category_name FROM books b LEFT JOIN categories c ON b.category_id = c.id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
