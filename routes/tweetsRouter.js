const express = require("express");
const boom = require("@hapi/boom");
const tweetService = require("../services/tweetService");

const validation = require("../utils/middlewares/createValidationMiddleware");
const { createTweetSchema, updateTweetSchema, tweetIdSchema } = require("../utils/schemas/tweetSchemas");

// Cargar cacheMiddleware
const cache = require("../utils/middlewares/createCacheMiddleware");
const {
    FIVE_MINUTES_IN_SECONDS,
    ONE_MINUTE_IN_SECONDS
} = require("../utils/time");

const router = express.Router();

router.get("/", cache(ONE_MINUTE_IN_SECONDS), getTweets);
router.post("/", validation({ body: createTweetSchema}), createTweet);
router.get("/:tweetId", validation({ params: tweetIdSchema}), cache(FIVE_MINUTES_IN_SECONDS), getTweet);
router.delete("/:tweetId", validation({ params: tweetIdSchema}), deleteTweet);
router.patch("/:tweetId", validation({ params: tweetIdSchema}), validation({ body: updateTweetSchema}), updateTweet);

module.exports = (app) => app.use("/tweets", router);

async function getTweets(req, res, next) {
    try {
        const tweets = await tweetService.getTweets();
        res.status(200).json(tweets)
    } catch (error) {
        next(error);
    }
}

async function createTweet(req, res, next) {
    try {
        const tweet = req.body;
        /*
        const validationError = validate(tweet, createTweetSchema);
        if(validationError) {
            res.status(400).json({ message: validationError.details[0].message });
        }
        */
        const rowsAffected = await tweetService.createTweet(tweet);
        if(rowsAffected > 0) {
            res.status(201).json({ message: "Tweet created!"})
        } else {
            const { output: {statusCode, payload }} = boom.notImplemented();
            payload.message = "Tweet not found!";
            res.status(statusCode).json(payload);
        }
    } catch (error) {
        next(error);
    }
}

async function getTweet(req, res, next) {
    try {
        const { tweetId } = req.params;
        const tweet = await tweetService.getTweet(tweetId);
        res.status(200).json(tweet);
    } catch (error) {
        next(error)
    }    
}

async function deleteTweet(req, res, next) {
    try {
        const { tweetId } = req.params;
        const deletedRows = await tweetService.deleteTweet(tweetId);
        if(deletedRows > 0) {
            res.status(200).json({ message: "Tweet deleted!"});
        } else {
            const { output: {statusCode, payload }} = boom.notFound();
            payload.message = "Tweet not found!";
            res.status(statusCode).json(payload);
        }
        
    } catch (error) {
        next(error)
    }    
}

async function updateTweet(req, res, next) {
    try {
        const { tweetId } = req.params;
        const { content } = req.body;
        /*
        const validationError = validate(content , updateTweetSchema);
        if(validationError) {
            res.status(400).json({ message: validationError.details[0].message });
        }
        */
        const updatedRows = await tweetService.updateTweet(tweetId, content);
        if(updatedRows > 0) {
            res.status(200).json({ message: "Tweet updated!"});
        } else {
            const { output: {statusCode, payload }} = boom.notFound();
            payload.message = "Tweet not found!";
            res.status(statusCode).json(payload);
        }
        
    } catch (error) {
        next(error)
    }    
}