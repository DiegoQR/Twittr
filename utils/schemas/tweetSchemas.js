const joi = require("joi");

const idSchema = joi.number();
const tweetContentSchema = joi.string().max(280);

const tweetIdSchema = {
	tweetId: idSchema.required(),
}

const createTweetSchema = { // Esquema para crear
	userId: idSchema.required(),
	content: tweetContentSchema.required(),
}

const updateTweetSchema = { // Esquema para actualizar
	content: tweetContentSchema.required(),
}

module.exports = {
    tweetIdSchema,
    createTweetSchema,
    updateTweetSchema,
}