const { User } = require(`../models/index`);
const { comparePassword } = require(`../helpers/bcrypt`);
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class LoginController {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        throw { name: "emailRequire", message: "Email is require" };
      }
      if (!password) {
        throw { name: "passwordRequire", message: "Password is require" };
      }

      let user = await User.findOne({ where: { email } });
      if (!user || !comparePassword(password, user.password)) {
        throw { name: "invalidLogin", message: "invalid email/password" };
      }

      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (error) {
      next(error);
    }
  }
  static async loginByGoogle(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENTGOOGLEID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: `${Math.random() * 1000}`,
        },
      });
      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
