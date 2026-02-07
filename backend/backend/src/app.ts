import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import uploadRoutes from "./routes/upload.routes";
import analyzeRoutes from "./routes/analyze.routes";
import { products } from "./dataLoader";   // ✅ NEW IMPORT

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/analyze", analyzeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Smart Skin Backend is running ✅" });
});


// ✅ ✅ NEW SMART SKIN RECOMMENDATION ROUTE
app.get("/api/recommend", (req, res) => {
  const problem = String(req.query.problem || "").toLowerCase();

  const map: any = {
    acne: ["salicylic", "tea tree", "benzoyl"],
    dryness: ["hyaluronic", "glycerin", "ceramide"],
    darkspots: ["vitamin c", "niacinamide"],
    wrinkles: ["retinol", "peptide"]
  };

  const keys = map[problem] || [];

  const results = products
    .filter(p =>
      keys.some(k =>
        (p.ingredients || "").toLowerCase().includes(k)
      )
    )
    .slice(0, 5);

  res.json(results);
});


export default app;