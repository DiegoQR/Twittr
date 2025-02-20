require('dotenv').config();
const config = require('../config');
const debug = require('debug')('app:db');

const { Pool } = require('pg');


const pool = new Pool({
  host: config.host,
  database: config.database,
  username: config.username,
  password: config.password,
  port: config.pgport,
  ssl: {
    require: true,
  },
});

debug("Connected to database");

module.exports = pool