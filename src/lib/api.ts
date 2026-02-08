const BASE_URL = "https://smart-skin-feedback-loop.onrender.com";
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function analyzeSkin(imageUrl: string) {
  const res = await fetch(`${BASE_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageUrl }),
  });

  return res.json();
}
