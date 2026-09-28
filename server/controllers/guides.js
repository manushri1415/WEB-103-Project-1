const { pool } = require('../config/database');

const guideColumns = `
  id,
  title,
  slug,
  category,
  difficulty,
  command_text AS "command",
  syntax,
  example,
  when_to_use AS "whenToUse",
  warning,
  description,
  submitted_by AS "submittedBy",
  submitted_on AS "submittedOn"
`;

const searchableColumns = {
  title: 'title',
  category: 'category',
  difficulty: 'difficulty',
  command: 'command_text'
};

const getGuides = async (req, res) => {
  const search = String(req.query.search || '').trim();
  const attribute = String(req.query.attribute || 'all');

  try {
    let query = `SELECT ${guideColumns} FROM git_guides`;
    let values = [];

    if (search && searchableColumns[attribute]) {
      query += ` WHERE ${searchableColumns[attribute]} ILIKE $1`;
      values = [`%${search}%`];
    } else if (search) {
      query += `
        WHERE title ILIKE $1
        OR category ILIKE $1
        OR difficulty ILIKE $1
        OR command_text ILIKE $1
        OR description ILIKE $1
      `;
      values = [`%${search}%`];
    }

    query += ' ORDER BY id ASC';

    const results = await pool.query(query, values);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getGuideBySlug = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT ${guideColumns} FROM git_guides WHERE slug = $1`,
      [req.params.slug]
    );

    if (!results.rows.length) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

module.exports = {
  getGuides,
  getGuideBySlug
};
