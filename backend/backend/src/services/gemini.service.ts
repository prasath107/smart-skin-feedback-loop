export async function analyzeSkin(imageUrl: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
Analyze the face skin.

Return ONLY JSON.

Format:
{
  "acne": number (0-1),
  "dryness": number (0-1),
  "oiliness": number (0-1),
  "redness": number (0-1),
  "summary": string
}

Do not explain.
Only JSON.
`
              }
            ]
          }
        ]
      }),
    }
  );

  const data = await response.json();

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const cleanText = text.replace(/```json|```/g, "").trim();

  return JSON.parse(cleanText);
}
