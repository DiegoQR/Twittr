const testServer = require("../utils/testServer");
const tweetsRouter = require("./tweetsRouter");

const request = testServer(tweetsRouter); //Garangizamos que solo cargamos el router para que las pruebas sean mas livianas

jest.mock("../services/tweetService", () => ({
  getTweets: jest.fn(() => ["tweet1", "tweet2"]),
}));

describe("[ routes / tweetsRouter]", () => {
  it("should return a response with status 200", async () => {
    // Arrange
    const expected = 200;

    // Act
    const { status: result } = await request.get("/tweets");

    // Assert
    expect(result).toEqual(expected);
  });

  it("should return all tweets", async () => {
    // Arrange
    const expected = ["tweet1", "tweet2"];

    // Act
    const { body: result } = await request.get("/tweets");

    // Assert
    expect(result).toEqual(expected);
  });
});