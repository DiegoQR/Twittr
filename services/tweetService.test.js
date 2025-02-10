const tweetService = require("./tweetService");
const tweetsRepository = require("../repositories/tweetsRepository");

describe("[Services / tweetService]", () => {
    describe("#getTweets", () => {
        it("should return alll tweets", async () => {
            // Arrange
            const expected = [{ id: 1, content: "Hello, World!"} , { id: 2, content: "Hello, World!" }];
            tweetsRepository.getTweets = jest.fn().mockResolvedValue(expected);
            // Act
            const result = await tweetService.getTweets();
            // Assert
            expect(result).toEqual(expected);
            // Another Assert
            expect(tweetsRepository.getTweets).toHaveBeenCalledTimes(1);
        });
    });
    describe("#createTweet", () => {
        it("should create a tweet", async () => {
            // Arrange
            const tweet = { id: 1, content: "Created tweet!" };
            tweetsRepository.createTweet = jest.fn().mockResolvedValue(tweet);
            // Act
            const result = await tweetService.createTweet(tweet);
            // Assert
            expect(result).toEqual(tweet);
            // Another Assert
            expect(tweetsRepository.createTweet).toHaveBeenCalledTimes(1);
            expect(tweetsRepository.createTweet).toHaveBeenCalledWith(tweet);
        });
    });
    describe("#getTweet", () => {
        it("should return a tweet", async () => {
            // Arrange
            const tweet = { id: 1, content: "Hello, World!" };
            tweetsRepository.getTweet = jest.fn().mockResolvedValue(tweet);
            // Act
            const result = await tweetService.getTweet(tweet.id);
            // Assert
            expect(result).toEqual(tweet);
            // Another Assert
            expect(tweetsRepository.getTweet).toHaveBeenCalledTimes(1);
            expect(tweetsRepository.getTweet).toHaveBeenCalledWith(tweet.id);
        });
    });
    describe("#deleteTweet", () => {
        it("should delete a tweet", async () => {
            // Arrange
            const tweetId = 1;
            tweetsRepository.deleteTweet = jest.fn().mockResolvedValue(1);
            // Act
            await tweetService.deleteTweet(tweetId);
            // Assert
            expect(tweetsRepository.deleteTweet).toHaveBeenCalledTimes(1);
            expect(tweetsRepository.deleteTweet).toHaveBeenCalledWith(tweetId);
        });
    });
    describe("#updateTweet", () => {
        it("should update a tweet", async () => {
            // Arrange
            const tweetId = 1;
            const content = "Updated tweet!";
            tweetsRepository.updateTweet = jest.fn().mockResolvedValue();
            // Act
            await tweetService.updateTweet(tweetId, content);
            // Assert
            expect(tweetsRepository.updateTweet).toHaveBeenCalledTimes(1);
            expect(tweetsRepository.updateTweet).toHaveBeenCalledWith(tweetId, content);
        });
    });
});