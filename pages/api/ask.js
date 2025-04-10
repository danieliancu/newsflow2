// pages/api/ask.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { source, label, question } = req.body;
  if (!source || !label || !question) {
    return res.status(400).json({ error: "Lipsesc unul sau mai multe câmpuri" });
  }

  try {
    // Preluarea articolelor din API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/articles";
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();
    const articles = data.data || [];

    // Calculăm timpul pentru filtrare (ultima oră)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Filtrăm articolele după sursă, label și dată
    const filteredArticles = articles.filter((article) => {
      const articleDate = new Date(article.date);
      return (
        article.source === source &&
        article.label === label &&
        articleDate >= oneHourAgo
      );
    });

    // Creăm contextul pentru prompt folosind câmpurile: source, text, label, date
    const context = filteredArticles
      .map(
        (a, i) => `
#${i + 1} [${a.source}, ${a.label}] 
Data publicării: ${a.date}
Conținut: ${a.text}
`
      )
      .join("\n\n");

    // Construim promptul cu informațiile necesare
    const prompt = `
Caută din Publicația: ${source}.
Domeniul: ${label}.

Acestea sunt știrile găsite (ultima oră):
${context}

Întrebare: ${question}

Răspunde clar, în stil jurnalistic, rezumând doar informațiile relevante.
`;

    // Apelăm endpoint-ul de chat completions
    const openAIResponse = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Ești un asistent AI care răspunde clar și în stil jurnalistic.",
        },
        {
          role: "user",
          content: prompt + "\nVă rog să răspunzi concis și să nu depășești 1024 tokens.",
        },
      ],
      max_tokens: 1024, // Acesta este locul unde setezi limita de tokens pentru răspuns
    });
    

    // Extragem răspunsul de la AI
    const answer = openAIResponse.choices[0].message.content.trim();
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Eroare la AI:", error.message);
    return res.status(500).json({ error: "Eroare internă la AI" });
  }
}
