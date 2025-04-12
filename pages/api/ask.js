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

  const { source, label, hours, question } = req.body;
  if (!source || !label || !question) {
    return res.status(400).json({ error: "Lipsesc unul sau mai multe câmpuri" });
  }

  try {
    // Preluăm articolele din API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/articles";
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();
    const articles = data.data || [];

    // Calculăm timpul pentru filtrare (ultimele 24 de ore)
    const timeAgo = new Date(Date.now() - Number(hours) * 60 * 60 * 1000);

    // Filtrăm articolele după sursă, label și dată
    const filteredArticles = articles.filter((article) => {
      const articleDate = new Date(article.date);
      return (
        article.source === source &&
        article.label === label &&
        articleDate >= timeAgo
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

    // Construim promptul cu instrucțiunile suplimentare pentru formatul HTML
    const prompt = `
Caută din Publicația: ${source}.
Domeniul: ${label}.

Acestea sunt știrile găsite (ultimele 24 de ore):
${context}

Întrebare: ${question}

Te rog să formatezi răspunsul în HTML folosind exclusiv tag-ul <p>. Structura răspunsului trebuie să fie următoarea:
<p>{O introducere despre numărul de știri din categoria aleasă și motivul jurnalistic pentru care ne concentrăm pe anumite știri (foarte pe scurt)}</p>
<p>Știre</p>
<p>Știre</p>
<p>Știre</p>
... (și tot așa)
<p>{O concluzie care rezumă direcția evenimentelor afișate, tot pe scurt}</p>

Asigură-te că răspunsul este concis și nu depășește 1024 tokens.
Răspunde clar și în stil jurnalistic, concentrându-te doar pe informațiile relevante.
`;

    // Apelăm endpoint-ul de chat completions
    const openAIResponse = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Ești un asistent AI care răspunde clar, păstrând rigoarea jurnalistică dar folosind un limbaj comun, obișnuit, de zi cu zi.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1024,
    });

    // Extragem răspunsul de la AI
    const answer = openAIResponse.choices[0].message.content.trim();
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Eroare la AI:", error.message);
    return res.status(500).json({ error: "Eroare internă la AI" });
  }
}
