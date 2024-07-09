const express = require("express");
const cors = require("cors");
const app = express();
// const api = require("./src/api/index");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const db = require("./src/models");
dotenv.config();

db.sequelize.sync().then(() => {
  console.log("DB connection success.");
});

const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
  const { title } = req.body;

  try {
    // Store the image URL in the ImagePost table
    const imagePost = await db.ImagePost.create({
      title,
      imageUrl: filePath,
    });

    res.json({
      message: "File uploaded successfully",
      imagePost,
    });
  } catch (error) {
    console.error("Failed to store image URL:", error);
    res.status(500).json({ error: "Failed to store image URL" });
  }
});
app.get("/allposts", async (req, res) => {
  const posts = await db.ImagePost.findAll().catch((error) => {
    console.error("Failed to get posts:", error);
    res.status(500).json({ error: "Failed to get posts" });
  });
  res.json(posts);
});

app.post("/comment", async (req, res) => {
  const { content, imagePostId } = req.body;
  await db.Comment.create({
    imagePostId: imagePostId,
    content: content,
  })
    .then((comment) => {
      res.json(comment);
    })
    .catch((error) => {
      console.error("Failed to store comment:", error);
      res.status(500).json({ error: "Failed to store comment" });
    });
});

app.get("/comment/:id", async (req, res) => {
  const { id } = req.params;
  const comments = await db.Comment.findAll({
    where: {
      imagePostId: id,
    },
  }).catch((error) => {
    console.error("Failed to get comments:", error);
    res.status(500).json({ error: "Failed to get comments" });
  });
  res.json(comments);
});

app.use((_req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "Not Found",
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
