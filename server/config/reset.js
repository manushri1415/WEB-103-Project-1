require('./dotenv');

const { pool } = require('./database');
const gitGuides = require('../data/gitGuides');

const createGitGuidesTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS git_guides (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      category VARCHAR(255) NOT NULL,
      difficulty VARCHAR(255) NOT NULL,
      command_text VARCHAR(255) NOT NULL,
      syntax VARCHAR(255) NOT NULL,
      example VARCHAR(255) NOT NULL,
      when_to_use TEXT NOT NULL,
      warning TEXT NOT NULL,
      description TEXT NOT NULL,
      submitted_by VARCHAR(255) NOT NULL,
      submitted_on TIMESTAMP NOT NULL
    )
  `;

  await pool.query(createTableQuery);
  console.log('git_guides table is ready');
};

const seedGitGuidesTable = async () => {
  await createGitGuidesTable();

  const insertQuery = `
    INSERT INTO git_guides (
      title,
      slug,
      category,
      difficulty,
      command_text,
      syntax,
      example,
      when_to_use,
      warning,
      description,
      submitted_by,
      submitted_on
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      category = EXCLUDED.category,
      difficulty = EXCLUDED.difficulty,
      command_text = EXCLUDED.command_text,
      syntax = EXCLUDED.syntax,
      example = EXCLUDED.example,
      when_to_use = EXCLUDED.when_to_use,
      warning = EXCLUDED.warning,
      description = EXCLUDED.description,
      submitted_by = EXCLUDED.submitted_by,
      submitted_on = EXCLUDED.submitted_on
  `;

  for (const guide of gitGuides) {
    const values = [
      guide.title,
      guide.slug,
      guide.category,
      guide.difficulty,
      guide.command,
      guide.syntax,
      guide.example,
      guide.whenToUse,
      guide.warning,
      guide.description,
      guide.submittedBy,
      guide.submittedOn
    ];

    await pool.query(insertQuery, values);
    console.log(`${guide.title} seeded successfully`);
  }
};

seedGitGuidesTable()
  .catch((error) => {
    console.error('error seeding git_guides table', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
