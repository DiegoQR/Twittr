const pool = require("../lib/connection");

const insertTweets = `INSERT INTO tweets (userId, content)
VALUES 
    (1, 'This is my first tweet!'),
    (1, 'This is my second tweet!'),
    (1, 'I love coding'),
    (1, 'Node.js is awesome'),
    (1, 'Just finished my OpenAI project'),
    (2, 'Hello Twitter!'),
    (2, 'This is Jane''s second tweet!'),
    (2, 'I love databases'),
    (2, 'MySQL is great'),
    (2, 'Just finished a database design project');
`;

async function seedTweets() {
    const client = await pool.connect();
    try {
        client.query(insertTweets);
        console.log("Tweets inserted succesfully!");
    } catch (er) {
        console.error("Error at inserting Tweets in db", er);
    } finally {
        client.release();
    }
}

seedTweets();