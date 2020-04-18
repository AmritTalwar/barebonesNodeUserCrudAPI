const https = require("https");
const fs = require("fs");

// SETUP APPROPRIATE CONFIG FOR DEV/PROD ENV
let config;
process.env.NODE_ENV === "DEV"
  ? (config = require("./secrets/DEV_ENV_VARS"))
  : (config = require("./secrets/PROD_ENV_VARS"));
Object.keys(config).forEach(env_var => {
  process.env[env_var] = config[env_var];
});

// SETUP SECURITY OPTIONS FOR HTTPS
const httpsOptions = {
  key: fs.readFileSync("./secrets/key.pem"),
  cert: fs.readFileSync("./secrets/cert.pem")
};

const postNewUserRootHandler = require("./roots/post-new-user");
const authenticateUserRootHandler = require("./roots/authenticate-user");
const loginRootHandler = require("./roots/login");

const httpsServer = https.createServer(httpsOptions, (req, res) => {
  if (req.url === "/post-new-user" && req.method === "POST") {
    postNewUserRootHandler(req, res);
  } else if (req.url === "/authenticate-user" && req.method === "POST") {
    authenticateUserRootHandler(req, res);
  } else if (
    req.url === "/login" &&
    (req.method === "GET" || req.method === "POST")
  ) {
    loginRootHandler(req, res);
  } else {
    res.writeHead(404, "Could not find what your looking for").end();
  }
});

httpsServer.listen(process.env.PORT, () => {
  console.log(`https server listening on port ${process.env.PORT}...`);
});
