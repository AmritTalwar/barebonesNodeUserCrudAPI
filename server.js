const https = require("https");
const fs = require("fs");

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

httpsServer.listen(1234, () => {
  console.log(`https server listening at ${process.env.BASE_SERVER_URL}`);
});
