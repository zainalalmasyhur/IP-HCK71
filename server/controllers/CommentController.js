const { where } = require("sequelize");
const { User, Comment } = require(`../models/index`);

class CommentController {
  static async postComment(req, res, next) {
    try {
      let { comment, ChapterId } = req.body;

      const cmnt = await Comment.create({
        comment,
        UserId: req.user.id,
        ChapterId,
      });

      res.status(201).json({ message: "Comment created", cmnt });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateCommentById(req, res, next) {
    try {
      let { id } = req.params;
      let { comment } = req.body;

      let updatedComment = await Comment.findByPk(id);

      if (!updatedComment) {
        throw { name: "notFound", message: "error not found" };
      }

      await updatedComment.update({
        comment,
        UserId: req.user.id,
      });

      res.status(200).json({ updatedComment });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCommentById(req, res, next) {
    try {
      let { id } = req.params;

      let deletedComment = await Comment.findByPk(id);

      if (!deletedComment) {
        throw { name: "notFound", message: "error not found" };
      }

      await deletedComment.destroy();

      res
        .status(200)
        .json({ message: `${deletedComment.comment} success to delete` });
    } catch (error) {
      next(error);
    }
  }
  static async getComment(req, res, next) {
    try {
      let allComment = await Comment.findAll({
        where: {
          ChapterId: req.params.chapterId,
        },
        include: {
          model: User,
          attributes: ["id", "username"], // Include the User model when fetching comments
        },
      });
      res.status(200).json(allComment);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
