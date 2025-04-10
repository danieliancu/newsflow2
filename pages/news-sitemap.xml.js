const SitemapIndex = () => {
    return null;
  };
  
  export async function getServerSideProps({ res }) {
    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
    // Preluăm toate articolele din API-ul local
    const response = await fetch(`${siteUrl}/api/articles`);
    const result = await response.json();
    const articles = result.data || [];
  
    const chunkSize = 1000;
    const totalChunks = Math.ceil(articles.length / chunkSize);
  
    let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapIndex += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (let i = 1; i <= totalChunks; i++) {
      sitemapIndex += `  <sitemap>\n`;
      sitemapIndex += `    <loc>${siteUrl}/news-sitemap/${i}.xml</loc>\n`;
      sitemapIndex += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
      sitemapIndex += `  </sitemap>\n`;
    }
    sitemapIndex += `</sitemapindex>`;
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapIndex);
    res.end();
  
    return {
      props: {},
    };
  }
  
  export default SitemapIndex;
  