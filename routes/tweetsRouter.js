const express = require("express");
const tweetService = require("../services/tweetService");

const router = express.Router();

router.get("/", getTweets);
router.post("/", createTweet);
router.get("/:tweetId", getTweet);
router.delete("/:tweetId", deleteTweet);
router.patch("/:tweetId", updateTweet);

module.exports = router

async function getTweets(req, res) {
    try {
        const tweets = await tweetService.getTweets();
        res.status(200).json(tweets)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function createTweet(req, res) {
    try {
        const tweet = req.body;
        const rowsAffected = await tweetService.createTweet(tweet);
        if(rowsAffected > 0) {
            res.status(201).json({ message: "Tweet created!"})
        } else {
            res.status(501).json({ message: "Tweet not created!"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function getTweet(req, res) {
    try {
        const { tweetId } = req.params;
        const tweet = await tweetService.getTweet(tweetId);
        res.status(200).json(tweet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

async function deleteTweet(req, res) {
    try {
        const { tweetId } = req.params;
        const deletedRows = await tweetService.deleteTweet(tweetId);
        if(deletedRows > 0) {
            res.status(200).json({ message: "Tweet deleted!"});
        } else {
            res.status(404).json({ message: "Tweet not found!"})
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

async function updateTweet(req, res) {
    try {
        const { tweetId } = req.params;
        const { content } = req.body;
        const updatedRows = await tweetService.updateTweet(tweetId, content);
        if(updatedRows > 0) {
            res.status(200).json({ message: "Tweet updated!"});
        } else {
            res.status(404).json({ message: "Tweet not found!"})
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}