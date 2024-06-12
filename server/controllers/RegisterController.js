const { User } = require(`../models/index`);

class RegisterController {
  static async Register(req, res, next) {
    try {
      let { username, email, password } = req.body;

      let user = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        message: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RegisterController;
