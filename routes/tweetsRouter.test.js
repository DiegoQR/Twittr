const testServer = require("../utils/testServer");
const tweetsRouter = require("./tweetsRouter");

const request = testServer(tweetsRouter); //Garangizamos que solo cargamos el router para que las pruebas sean mas livianas

jest.mock("../services/tweetService", () => ({
    getTweets: jest.fn().mockResolvedValue([{ id: 1, content: "Hello, World!"} , { id: 2, content: "Hello, World!" }])	
}));

describe("[ routes/tweetsRouter ]", () =>  {
    it("should return a response with status 200", () => {
        //Arrange
        const expected = 200;
        //Act
        const result = request.get("/tweets");
        //Assert
        expect(result).toEqual(expected);
    });
    it("should return all tweets", () => {
        //Arrange
        const expected = [{ id: 1, content: "Hello, World!"} , { id: 2, content: "Hello, World!" }];
        //Act
        const result = request.get("/tweets");
        //Assert
        expect(result).toEqual(expected);
    });
});