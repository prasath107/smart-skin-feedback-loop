import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  // ✅ Build correct public URL for Render
  const imageUrl =
    "https://smart-skin-feedback-loop.onrender.com/uploads/" +
    req.file.filename;

  res.json({
    message: "Image uploaded successfully ✅",
    imageUrl,
  });
});

export default router;