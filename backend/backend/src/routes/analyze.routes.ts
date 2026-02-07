import { Router } from "express";
import { analyzeSkin } from "../services/gemini.service";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }

    const ai = await analyzeSkin(imageUrl);

    const results = {
      confidence: 95,
      skinType:
        ai.oiliness > 0.6
          ? "Oily"
          : ai.dryness > 0.6
          ? "Dry"
          : "Combination",

      overallHealth:
        ai.acne < 0.3 && ai.redness < 0.3
          ? "Good"
          : "Needs Attention",

      issues: [
        {
          type: "Acne",
          severity:
            ai.acne > 0.7
              ? "Severe"
              : ai.acne > 0.4
              ? "Moderate"
              : ai.acne > 0.2
              ? "Mild"
              : "Light",
          areas: ["Face"],
          confidence: Math.round(ai.acne * 100),
        },
        {
          type: "Dryness",
          severity:
            ai.dryness > 0.7
              ? "Severe"
              : ai.dryness > 0.4
              ? "Moderate"
              : ai.dryness > 0.2
              ? "Mild"
              : "Light",
          areas: ["Skin"],
          confidence: Math.round(ai.dryness * 100),
        },
        {
          type: "Oiliness",
          severity:
            ai.oiliness > 0.7
              ? "Severe"
              : ai.oiliness > 0.4
              ? "Moderate"
              : ai.oiliness > 0.2
              ? "Mild"
              : "Light",
          areas: ["T-Zone"],
          confidence: Math.round(ai.oiliness * 100),
        },
        {
          type: "Redness",
          severity:
            ai.redness > 0.7
              ? "Severe"
              : ai.redness > 0.4
              ? "Moderate"
              : ai.redness > 0.2
              ? "Mild"
              : "Light",
          areas: ["Cheeks"],
          confidence: Math.round(ai.redness * 100),
        },
      ],
    };

    res.json(results);
  } catch (error: any) {
    console.error("FULL ERROR:", error);
    res.status(500).json({
      error: "AI analysis failed",
      details: error?.message || error,
    });
  }
});

export default router;
