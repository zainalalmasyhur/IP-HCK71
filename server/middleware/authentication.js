const { User, Comment } = require(`../models/index`);
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }
    const [type, token] = bearerToken.split(" ");
    if (type !== "Bearer" || !token) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }
    const data = verifyToken(token);
    const userId = data.id;

    const user = await User.findByPk(userId);

    if (!user) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }
    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) throw { name: "notFound", message: "error not found" };
    if (req.user) {
      if (req.user.id === comment.UserId) {
        next();
      } else {
        throw { name: "Forbidden", message: "Invalid Token" };
      }
    } else {
      throw { name: "Forbidden", message: "Invalid Token" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authentication,
  authorization,
};
