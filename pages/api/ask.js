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

    // Creăm contextul pentru prompt folosind câmpurile: source, text, label, date și href
    const context = filteredArticles
      .map((a, i) => `
#${i + 1} [${a.source}, ${a.label}]
Data publicării: ${a.date}
Conținut: ${a.text}
Link: ${a.href}
      `)
      .join("\n\n");

    // Construim promptul cu instrucțiuni suplimentare pentru formatul HTML și hyperlink-uri
    const prompt = `
Caută din Publicația: ${source}.
Domeniul: ${label}.

Acestea sunt știrile găsite (ultimele 24 de ore):
${context}

Întrebare: ${question}

Te rog să formatezi răspunsul în HTML folosind exclusiv tag-ul <p>. 
Regulile pentru formatarea răspunsului sunt:
1. Răspunde exclusiv în HTML folosind tag-ul <p> pentru fiecare paragraf.
2. Pentru fiecare știre, identifică propoziția ce conține verbul principal (acțiunea centrală a știrii).
3. În acea propoziție, inserează hyperlink-ul exact lângă verbul principal. Pentru inserare, înlocuiește segmentul corespunzător verbului (sau inserează imediat după el) cu un element de tip: <a href="{href}" target="_blank" rel="noopener noreferrer">Textul acțiunii</a>, unde {href} este preluat din contextul respectiv.
4. Nu adăuga text suplimentar precum "Detalii suplimentare aici" sau alte completări. Răspunsul trebuie să fie un rezumat curat și integrat.

Structura finală a răspunsului trebuie să fie:
<p>{O introducere scurtă privind numărul de știri și contextul general}</p>
<p>{Știre 1 cu hyperlink integrat în propoziție}</p>
<p>{Știre 2 cu hyperlink integrat în propoziție}</p>
...
<p>{O concluzie scurtă de încheiere}</p>

Important: Pentru fiecare știre, identifică verbul principal care exprimă acțiunea și, dacă e necesar, completează-l cu cuvinte adiționale pentru a forma o expresie relevantă. Această expresie trebuie înlocuită cu un hyperlink HTML folosind tag-ul <a href="{href}">Expresie</a>, unde {href} este preluat din contextul fiecărei știri.

Asigură-te că răspunsul este concis și nu depășește 1024 tokens.
Răspunde clar și în stil jurnalistic, concentrându-te doar pe informațiile relevante.
Ai grijă să nu rămâi cu text neformatat sau cu tag-uri HTML neînchise.
Ai grijă să nu rămâi cu text neterminat sau cu propoziții incomplete.
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
