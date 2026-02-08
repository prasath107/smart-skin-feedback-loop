import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// ✅ ensure uploads folder exists (important for Render)
const uploadDir = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ upload route
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  // ✅ build public URL dynamically
  const base =
    process.env.BASE_URL ||
    "https://smart-skin-feedback-loop.onrender.com";

  const imageUrl = `${base}/uploads/${req.file.filename}`;

  res.json({
    message: "Image uploaded successfully ✅",
    imageUrl,
  });
});

export default router;