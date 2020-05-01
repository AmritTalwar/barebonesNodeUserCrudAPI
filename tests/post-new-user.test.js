const assert = require("assert");
const lodash = require("lodash");
const hash = require("../utils/hash");
const User = require("../models/User");
const dbConnection = require("../db/connectionPool");
const fetch = require("node-fetch");
const flushDBUtil = require("../utils/flushDB");

describe("/post-new-user", () => {
  describe("When posting valid stringified JSON of the user creds", () => {
    it("We should get a 201 Authentication successful response", async () => {
      await fetch(`${process.env.BASE_SERVER_URL}/post-new-user`, {
        method: "POST",
        body: JSON.stringify({
          email: "Joe@Bloggs.com",
          username: "Joe Bloggs",
          password: "Bloggs1234"
        })
      }).then(response => {
        assert.equal(response.status, 201);
      });
    });

    it("Test user should be present in the test DB with the correct data", async () => {
      const testUser = await User.getUser("Joe Bloggs");
      assert.equal(
        lodash.isMatch(testUser, {
          email: "Joe@Bloggs.com",
          password: hash("Bloggs1234")
        }),
        true
      );
    });
  });

  describe("When trying to post an existing user (existing username)", () => {
    it("Should get a 409 response when posting the same user again", async () => {
      await fetch(`${process.env.BASE_SERVER_URL}/post-new-user`, {
        method: "POST",
        body: JSON.stringify({
          email: "foo@bar.com",
          username: "Joe Bloggs",
          password: "Wait, my username already exists?!"
        })
      }).then(response => {
        assert.equal(response.status, 409);
      });
    });
  });

  after("Flush test DB", async () => {
    await flushDBUtil(dbConnection);
  });
});
