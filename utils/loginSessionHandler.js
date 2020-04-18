const moment = require("moment");
const cookie = require("cookie");

const hash = require("../utils/hash");

class loginSessionHandler {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  isLoginSessionValid() {
    const requestCookies = cookie.parse(this.req.headers.cookie);
    const lastLoggedIn = requestCookies["lastLoggedIn"];
    const validationHash = requestCookies["lastLoggedInValidationHash"];

    const clientCookieValid = hash(lastLoggedIn) === validationHash;
    if (!clientCookieValid) {
      console.log("This cookie ain't sweet!");
      return false;
    }

    // Check current date is between the last logged in date and last logged in date + 1 minute
    // TODO: Try and do this without using moment because this is pretty gnarly
    const loginSessionValid = moment(moment().format()).isBetween(
      `${lastLoggedIn}`,
      `${moment(`${lastLoggedIn}`)
        .add(moment.duration(1, "minutes"))
        .format()}`,
      null,
      []
    );
    return loginSessionValid;
  }

  setLoginSessionCookie() {
    const loginSessionCookie = `lastLoggedIn=${moment().format()}`;
    const loginSessionValidationCookie = `lastLoggedInValidationHash=${hash(
      moment().format()
    )}`;
    this.res.setHeader("Set-Cookie", [
      loginSessionCookie,
      loginSessionValidationCookie
    ]);
  }
}

module.exports = loginSessionHandler;
