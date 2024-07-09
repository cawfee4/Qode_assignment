const router = require("express").Router();
const multer = require("multer");
const db = require("../models");
const cloudinary = require("cloudinary").v2;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { title } = req.body;

  try {
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "qode_app",
      },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Error uploading image to Cloudinary" });
        }

        db.ImagePost.create({
          title,
          imageUrl: result.secure_url,
        })
          .then((imagePost) => {
            res.json({
              message: "File uploaded successfully",
              imagePost,
            });
          })
          .catch((error) => {
            console.error("Error creating ImagePost record:", error);
            res.status(500).json({ error: "Error creating ImagePost record" });
          });
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
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
