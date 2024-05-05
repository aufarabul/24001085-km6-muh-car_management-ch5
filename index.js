const express = require("express");
const router = require("./route");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: process.env.NODE_ENV == "development" ? "./tmp" : "/tmp",
  })
);
app.post("/fileupload", (req, res) => {
  if (!req.files || !req.files.image) {
    // Tangani kasus ketika tidak ada file yang diunggah
    return res.status(400).send("No file uploaded.");
  }

  // Proses file yang diunggah (misalnya, simpan ke disk atau lakukan tindakan lain)
  const uploadedImage = req.files.image;
  // ...

  // Respon dengan pesan berhasil
  res.send("File uploaded successfully.");
});

app.use(express.static("public"));

app.use("/api", router);

app.use("*", (req, res) => {
  res.status(404).json({
    data: null,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    data: null,
    message,
  });
});
app.listen(port, () => console.log(`Server running on port ${port}`));
