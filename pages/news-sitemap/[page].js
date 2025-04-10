export async function getServerSideProps({ res, params }) {
    const page = parseInt(params.page) || 1;
    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  
    // Preluăm toate articolele din API
    const response = await fetch(`${siteUrl}/api/articles`);
    const result = await response.json();
    const articles = result.data || [];
    
    console.log('Total articole:', articles.length); // Pentru debugging
  
    const chunkSize = 1000;
    const start = (page - 1) * chunkSize;
    const chunkArticles = articles.slice(start, start + chunkSize);
  
    // Funcție de generare a slug-ului, exact ca în [slug].js
    const removeDiacritics = (str) => {
      const diacriticsMap = { "ă": "a", "â": "a", "î": "i", "ș": "s", "ş": "s", "ț": "t", "ţ": "t" };
      return str.split("").map((char) => diacriticsMap[char] || char).join("");
    };
  
    // Construcția XML-ului pentru chunk-ul curent
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" `;
    xml += `xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;
  
    chunkArticles.forEach(article => {
      // Generare slug conform logicei din [slug].js
      const generatedSlug = removeDiacritics(article.text)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const articleUrl = `${siteUrl}/news/${generatedSlug}-${article.id}`;
  
      xml += `  <url>\n`;
      xml += `    <loc>${articleUrl}</loc>\n`;
      xml += `    <news:news>\n`;
      xml += `      <news:publication>\n`;
      xml += `        <news:name>Newsflow Romania</news:name>\n`;
      xml += `        <news:language>ro</news:language>\n`;
      xml += `      </news:publication>\n`;
      xml += `      <news:publication_date>${new Date(article.date).toISOString()}</news:publication_date>\n`;
      xml += `      <news:title><![CDATA[${article.text}]]></news:title>\n`;
      xml += `    </news:news>\n`;
      xml += `  </url>\n`;
    });
    
    xml += `</urlset>`;
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
    
    return { props: {} };
  }
  
  export default function SitemapChunk() {
    // Nu afișăm nimic.
    return null;
  }
  