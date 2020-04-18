const fs = require("fs");

const assert = require("assert");
const fetch = require("node-fetch");

// TODO: Write test for malformed cookie response (when a user tries to login with an tampered session cookie)
describe("/login", () => {
  before("POST test user to /post-new-user", async () => {
    await fetch(`https://localhost:${process.env.PORT}/post-new-user`, {
      method: "POST",
      body: JSON.stringify({
        email: "Joe@Bloggs.com",
        username: "Joe Bloggs",
        password: "Bloggs1234"
      })
    });
  });

  describe("When logging in with valid credentials", () => {
    it("We should get a 200 response", async () => {
      await fetch(`https://localhost:${process.env.PORT}/login`, {
        method: "POST",
        body: JSON.stringify({
          username: "Joe Bloggs",
          password: "Bloggs1234"
        })
      }).then(response => {
        assert.equal(response.status, 200);
      });
    });
  });

  describe("When logging in as a user that does not exist in the db", () => {
    it("We should get a 401 response", async () => {
      await fetch(`https://localhost:${process.env.PORT}/login`, {
        method: "POST",
        body: JSON.stringify({
          username: "User does not exist",
          password: "Bloggs1234"
        })
      }).then(response => {
        assert.equal(response.status, 401);
      });
    });
  });

  describe("When logging in with an invalid password", () => {
    it("We should get a 401 response", async () => {
      await fetch(`https://localhost:${process.env.PORT}/login`, {
        method: "POST",
        body: JSON.stringify({
          username: "Joe Bloggs",
          password: "wrong password"
        })
      }).then(response => {
        assert.equal(response.status, 401);
      });
    });
  });

  after("Flush test DB", () => {
    fs.writeFileSync(__dirname + `/../${process.env.DB}`, "{}", () => {
      console.log("Test DB has been flushed");
    });
  });
});
