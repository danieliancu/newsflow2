// pages/api/articlesFiltered.js
export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { source, label, hours } = req.query;
  
    if (!source || !label || !hours) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
  
    try {
      // Dacă ai o variabilă de mediu care indică sursa articolelor, o folosești; altfel, folosește fallback-ul
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/articles";
      const apiResponse = await fetch(apiUrl);
      const data = await apiResponse.json();
      const articles = data.data || [];
  
      // Calculează momentul de referință: articolele mai noi decât (hours) ore
      const thresholdTime = new Date(Date.now() - parseInt(hours, 10) * 60 * 60 * 1000);
  
      // Filtrează articolele după source, label și dată
      const filteredArticles = articles.filter(article => {
        if (!article.date || !article.source || !article.label) return false;
        const articleDate = new Date(article.date);
        return article.source === source && article.label === label && articleDate >= thresholdTime;
      });
  
      return res.status(200).json({ data: filteredArticles });
    } catch (error) {
      console.error("Error in articlesFiltered endpoint:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  