const express = require("express");
const router = express.Router();

const LoginController = require(`../controllers/LoginController`);
const RegisterController = require(`../controllers/RegisterController`);
const CommentController = require(`../controllers/CommentController`);
const MidtransController = require(`../controllers/MidtransController`);
const { errorHandler } = require(`../middleware/errorhandler`);

const {
  authentication,
  authorization,
} = require(`../middleware/authentication`);

router.post("/login", LoginController.login);
router.post("/login-google", LoginController.loginByGoogle);
router.post("/register", RegisterController.Register);

router.use(authentication);
router.get("/comments/:chapterId", CommentController.getComment);
router.post("/comments", CommentController.postComment);
router.put("/comments/:id", authorization, CommentController.updateCommentById);
router.delete(
  "/comments/:id",
  authorization,
  CommentController.deleteCommentById
);
router.get(
  "/payment/midtrans/initiate",
  MidtransController.initiateMidtransTrx
);

router.use(errorHandler);

module.exports = router;
