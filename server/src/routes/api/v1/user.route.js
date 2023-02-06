const express = require("express");
// const validate = require("../../../middlewares/validate");
const { userController } = require("../../../controllers");
const { authMiddleware } = require("../../../middlewares");
// const { userValidation } = require("../../../validations");

const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .get(authMiddleware.verifyToken, userController.getUsers)
  .delete(authMiddleware.verifyTokenAdmin, userController.deleteUserByUsername);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
