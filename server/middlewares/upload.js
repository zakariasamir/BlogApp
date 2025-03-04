const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Function to delete the old image
const deleteOldImage = (imagePath) => {
  if (imagePath) {
    const fullPath = path.join(__dirname, "..", imagePath);
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error("Error deleting old image:", err);
      }
    });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    fs.mkdir(uploadDir, { recursive: true }, function (err) {
      if (err) {
        console.error(err);
      }
      cb(null, uploadDir);
    });
  },
  filename: function (req, file, cb) {
    // If there's an old image path in the request, delete it
    if (req.body.oldImage) {
      deleteOldImage(req.body.oldImage);
    }
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = {
  upload,
  deleteOldImage,
};
