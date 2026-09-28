require('./dotenv');

const pg = require('pg');

const ssl = {
  rejectUnauthorized: false
};

const config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl
    }
  : {
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      ssl
    };

const pool = new pg.Pool(config);

module.exports = { pool };
