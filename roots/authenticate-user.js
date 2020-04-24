const User = require("../models/User");
const hash = require("../utils/hash");
const lodash = require("lodash");

const authenticateUserRootHandler = (req, res) => {
  try {
    const parsedPostDataChunks = [];
    req.on("data", chunk => {
      parsedPostDataChunks.push(chunk);
    });

    req.on("end", async () => {
      const parsedPostData = JSON.parse(
        Buffer.concat(parsedPostDataChunks).toString()
      );

      const queriedUser = await User.getUser(parsedPostData.username);
      const credsValid = Boolean(
        queriedUser.password === hash(parsedPostData.password) &&
          !lodash.isEmpty(queriedUser)
      );

      credsValid
        ? res.writeHead(200, "Authentication successful").end()
        : res.writeHead(401, "Invalid credentials").end();
    });
  } catch (err) {
    console.log(`Error in authentication handler: ${err}`);
    res.writeHead(500, "Internal server error :(").end();
  }
};

module.exports = authenticateUserRootHandler;
