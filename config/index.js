const dotenv = require('dotenv');
dotenv.config();

const { 
  NODE_ENV, 
  PORT, 
  PGHOST, 
  PGDATABASE, 
  PGUSER,
  PGPASSWORD, 
  PGPORT,
  CORS_ORIGIN } = process.env;

const config = {
  dev: NODE_ENV !== 'production',
  port: PORT || 3000,
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  pgport: PGPORT || 5432,
  corsOrigin: CORS_ORIGIN || "https://client.twittr.com",
};

module.exports = config;
