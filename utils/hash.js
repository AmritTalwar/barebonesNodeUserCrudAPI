const crypto = require("crypto");
const salt = require("../secrets/salt");

const hash = string => {
  string += salt;
  return crypto
    .createHash("sha256")
    .update(string)
    .digest("hex");
};

module.exports = hash;
