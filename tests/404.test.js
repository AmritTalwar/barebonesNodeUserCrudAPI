const fetch = require("node-fetch");
const assert = require("assert");

describe("/{endpoint that doest exist}", () => {
  describe("When trying to make a request to a non existing endpoint", () => {
    it("We should get a 404 response", async () => {
      await fetch(`${process.env.BASE_SERVER_URL}/idontexist`).then(
        response => {
          assert.equal(response.status, 404);
        }
      );
    });
  });
});
