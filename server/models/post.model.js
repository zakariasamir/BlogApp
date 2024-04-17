const mongoose = require("mongoose");

//Defining Post Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 5,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      min: 100,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Technology", "Fitness", "Health"],
      default: "Test",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
