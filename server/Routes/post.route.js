const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const isAuthenticated = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload");

router.post(
  "/",
  isAuthenticated,
  upload.single("image"),
  postController.create
);
router.get("/", isAuthenticated, postController.findAll);
router.get("/:id", isAuthenticated, postController.findOne);
router.put(
  "/:id",
  isAuthenticated,
  upload.single("image"),
  postController.update
);
router.delete("/:id", isAuthenticated, postController.remove);
module.exports = router;
