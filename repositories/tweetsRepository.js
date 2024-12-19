const res = require("express/lib/response");
const pool = require("../lib/connection");

module.exports = {
    getTweets,
    createTweet,
    getTweet,
    deleteTweet,
    updateTweet,
}

async function getTweets() {
    let result
    const query = "SELECT * FROM tweets";
    const client = await pool.connect();
    try {
        result = await client.query(query);
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }

    return result.rows;
}

async function createTweet(tweet) {
    let result
    const { userid, content } = tweet
    const query = `
        INSERT INTO tweets (userid, content) 
        VALUES ($1, $2)
    `
    const client = await pool.connect();
    try {
        result = await client.query(query, [userid, content]);
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }

    return result.rowCount
    
}

async function getTweet(tweetId) {
    let result
    const query = "SELECT * FROM tweets WHERE tweetId = $1";
    const client = await pool.connect();
    try {
        result = await client.query(query, [tweetId]);
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }

    return result.rows;
}

async function deleteTweet(tweetId) {
    let result;
    const query = "DELETE FROM tweets WHERE tweetId = $1";
    const client = await pool.connect();
    try {
        result = await client.query(query, [tweetId]);
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }

    return result.rowCount;

}

async function updateTweet(tweetId, content) {
    let result;
    const query = "UPDATE tweets SET content = $1 WHERE tweetId = $2";
    const client = await pool.connect();
    try {
        result = await client.query(query, [content, tweetId]);
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }

    return result.rowCount;
}