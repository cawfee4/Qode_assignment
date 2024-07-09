const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./src/api");
const dotenv = require("dotenv");
const db = require("./src/models");
dotenv.config();

db.sequelize.sync().then(() => {
  console.log("DB connection success.");
});

const PORT = process.env.PORT || 5000;

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

app.use("/api", api);

app.use((_req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "Not Found",
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
