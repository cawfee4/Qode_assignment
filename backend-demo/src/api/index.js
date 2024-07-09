const router = require("express").Router();
const multer = require("multer");
const db = require("../models");

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), async (req, res) => {
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
router.get("/allposts", async (req, res) => {
  const posts = await db.ImagePost.findAll().catch((error) => {
    console.error("Failed to get posts:", error);
    res.status(500).json({ error: "Failed to get posts" });
  });
  res.json(posts);
});

router.post("/comment", async (req, res) => {
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

router.get("/comment/:id", async (req, res) => {
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

module.exports = router;
