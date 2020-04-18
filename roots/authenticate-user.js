const User = require("../models/user");
const hash = require("../utils/hash");
const lodash = require("lodash");

const authenticateUserRootHandler = (req, res) => {
  const parsedPostDataChunks = [];
  req.on("data", chunk => {
    parsedPostDataChunks.push(chunk);
  });

  req.on("end", () => {
    const parsedPostData = JSON.parse(
      Buffer.concat(parsedPostDataChunks).toString()
    );

    const credsValid = Boolean(
      User.getUser(parsedPostData.username).password ===
        hash(parsedPostData.password) &&
        !lodash.isEmpty(User.getUser(parsedPostData.username))
    );

    credsValid
      ? res.writeHead(200, "Authentication successful").end()
      : res.writeHead(401, "Invalid credentials").end();
  });
};

module.exports = authenticateUserRootHandler;
