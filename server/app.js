const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const authRoutes = require("./Routes/auth.route");
const postRoutes = require("./Routes/post.route");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: ["http://localhost:5173", "https://blog-app-front-red.vercel.app"], // Replace with your frontend's actual URL
  credentials: true, // This allows cookies and authorization headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed request methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};
app.use(cors(corsOptions));
app.use(cookieParser());
async function main() {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
  app.use("/uploads", express.static("uploads"));
  app.use("/auth", authRoutes);
  app.use("/posts", postRoutes);
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  const PORT = 3000;

  app.listen(PORT, console.log(`Server started on port ${PORT}`));
}
main();
