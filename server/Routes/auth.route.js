const express = require("express");
const authController = require("../controllers/auth.controller");
// const {
//   authenticated,
//   isAuthenticated,
// } = require("../middlewares/auth.middleware");
const validateLoginInput = require("../validators/login.validator");
const validateRegisterInput = require("../validators/signup.validator");
const router = express.Router();

// router.get("/profile", authController.profile);
router.post(
  "/login",
  [validateLoginInput],
  authController.login
);
router.post("/signup", [validateRegisterInput], authController.signup);
router.get("/logout", authController.destroy);

module.exports = router;
