const Post = require("../models/post.model");

const create = async (req, res) => {
  const { title, content, category } = req.body;
  const path = req.file ? req.file.path : null;
  const user = req.user.id;
  try {
    if (!user || !content || !category || !title || !path) {
      return res
        .status(400)
        .json({ error: "Post creation failed: Missing required information!" });
    }
    const newPost = new Post({
      title,
      content,
      category,
      image: path,
      author: user,
    });
    await newPost.save();
    res.json({
      success: true,
      message: "Post created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json([{ error: "Internal server error" }, { message: error.message }]);
  }
};

const findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ error: "Post not found!" });
    }
  } catch (error) {
    console.error("Error finding post:", error);
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error finding post: ${error.message}` },
      ]);
  }
};

const findAll = async (req, res) => {
  const { action } = req.query;

  try {
    let posts = [];

    switch (action) {
      case undefined:
        posts = await Post.find();
        break;
      case "sort-date-asc":
        posts = await Post.find().sort({ updatedAt: 1 });
        break;
      case "sort-date-desc":
        posts = await Post.find().sort({ updatedAt: -1 });
        break;
      case "sort-title":
        posts = await Post.find().sort({ title: 1 });
        break;
      case "sort-category":
        posts = await Post.find().sort({ category: 1 });
        break;
      case "sort-author":
        posts = await Post.find().sort({ author: 1 });
        break;
      case "custom-pagination":
        const { pageSize = 2, pageNumber = 1 } = req.query;
        posts = await Post.find()
          .limit(parseInt(pageSize))
          .skip((parseInt(pageNumber) - 1) * parseInt(pageSize));
        break;
      default:
        return res.status(400).json({ error: "Invalid action parameter" });
    }

    if (posts.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const viewAll = async (req, res) => {
  try {
    const posts = await Post.find();

    if (posts.length > 0) {
      return res.status(200).json(posts);
    } else {
      return res.status(404).json({ error: "No posts found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error retrieving posts: ${error.message}` },
      ]);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { createdAt, author, ...newPostData } = req.body;
    const path = req.file ? req.file.path : null;
    const user = req.user;

    if (!id || !newPostData || !user) {
      return res
        .status(400)
        .json({ error: "Post update failed: Missing required fields!" });
    }

    // Get the existing post to get the old image path
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found!" });
    }

    // Prepare update data
    const updateData = {
      ...newPostData,
      $set: { updatedAt: new Date() },
    };

    // Only update the image field if a new file was uploaded
    if (path) {
      updateData.image = path;
      // Store the old image path in the request body for the upload middleware
      req.body.oldImage = existingPost.image;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error updating post: ${error.message}` },
      ]);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!id || !user) {
      return res
        .status(400)
        .json({ error: "Post deletion failed: Missing required information!" });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found!" });
    }

    return res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json([
        { error: "Internal server error" },
        { message: `Error deleting post: ${error.message}` },
      ]);
  }
};
const checkLoggedIn = async (req, res) => {
  res.json({ loggedIn: true });
};

module.exports = {
  create,
  findOne,
  viewAll,
  update,
  remove,
  findAll,
  checkLoggedIn,
};
