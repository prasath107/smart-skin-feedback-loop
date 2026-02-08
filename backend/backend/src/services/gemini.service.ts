export async function analyzeSkin(imageUrl: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Analyze this face skin image.

Return ONLY JSON:
{
  "acne": number (0-1),
  "dryness": number (0-1),
  "oiliness": number (0-1),
  "redness": number (0-1),
  "summary": string
}
`
              },
              {
                file_data: {
                  mime_type: "image/jpeg",
                  file_uri: imageUrl
                }
              }
            ]
          }
        ]
      }),
    }
  );

  const data = await response.json();

  console.log("Gemini raw:", data);

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  const clean = text.replace(/```json|```/g, "").trim();

  return JSON.parse(clean);
}