const dotenv = require('dotenv');
dotenv.config();

const { NODE_ENV, PORT, PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const config = {
  dev: NODE_ENV !== 'production',
  port: PORT || 3000,
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  pgport: PGPORT || 5432,
};

module.exports = config;
