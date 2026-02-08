const BASE_URL = "https://smart-skin-feedback-loop.onrender.com";

export async function analyzeSkin(formData: FormData) {
  const res = await fetch(`${BASE_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Analysis failed");
  return res.json();
}

export async function getRecommendations(problem: string) {
  const res = await fetch(
    `${BASE_URL}/api/recommend?problem=${problem}`
  );

  if (!res.ok) throw new Error("Recommend failed");
  return res.json();
}