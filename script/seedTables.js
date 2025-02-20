const debug = require('debug')('app:db:script');
const pool = require("../lib/connection");

const createUsersTable = `CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bio TEXT,
    location VARCHAR(255)
);`;

const createTweetsTable = `CREATE TABLE tweets (
	tweetId SERIAL PRIMARY KEY,
	userId INT,
	content VARCHAR(280),
	creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

const insertUsers = `INSERT INTO users (username, email, passwordHash, bio, location)
  VALUES 
  ('JohnDoe', 'johndoe@example.com', 'hashedpassword1', 'I love coding', 'New York'),
  ('JaneDoe', 'janedoe@example.com', 'hashedpassword2', 'I love databases', 'San Francisco')`;

async function seedTable() {
    const client = await pool.connect();
    try {
        client.query(createUsersTable);
        client.query(createTweetsTable);
        client.query(insertUsers);
        debug("Tables created succesfully")
    } catch (er) {
        console.error("Failed at create tables ", er);
    } finally {
        client.release();
    }
}

seedTable();