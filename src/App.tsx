import { useState } from "react";
import ImageCapture from "./components/ImageCapture";
import SkinAnalysis from "./components/SkinAnalysis";
import { uploadImage, analyzeSkin } from "./lib/api";

// helper: base64 → File
function base64ToFile(base64: string, filename: string) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

function App() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  // 🔥 THIS is what Analyze button triggers
  const handleImageCapture = async (base64Image: string) => {
    setLoading(true);
    setImage(base64Image);

    try {
      // 1️⃣ convert base64 → file
      const file = base64ToFile(base64Image, "skin.jpg");

      // 2️⃣ upload image
      const uploadRes = await uploadImage(file);

      // 3️⃣ analyze skin
      const result = await analyzeSkin(uploadRes.imageUrl);

      // 4️⃣ store result
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Smart Skin Feedback Loop
      </h1>

      {!analysis && (
        <ImageCapture onImageCapture={handleImageCapture} />
      )}

      {loading && (
        <p className="mt-6 text-lg font-semibold">
          🔍 Analyzing skin...
        </p>
      )}

      {analysis && (
        <SkinAnalysis results={analysis} image={image} />
      )}
    </div>
  );
}

export default App;
