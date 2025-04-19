// pages/news/[slug].js
import React, { useState, useEffect } from "react";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import Head from "next/head";
import TimeAgo from "../../components/TimeAgo";
import { useRouter } from "next/router";
import Menu, { CategoryProvider } from "../../components/Menu";
import Footer from "@/components/Footer";
import { FaArrowLeft, FaExternalLinkAlt, FaRegClock } from "react-icons/fa";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "next-share";
import Link from "next/link";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 30000,
});

const NewsDetail = ({ article, slug, relatedArticles, categoryLabels }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");



    // verifica daca articolul e mai vechi de 24h
    const isOlderThan24h =
      Date.now() - new Date(article.date).getTime() >
      24 * 60 * 60 * 1000;


  // Acum primește și label, opțional
  const handleCategoryFilter = (category, label) => {
    const query = { category };
    if (label) {
      query.addLabel = label;
    }
    router.push({ pathname: "/", query });
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".top-right-mobile>svg");
    elements.forEach((el) => (el.style.display = "none"));
    return () => elements.forEach((el) => (el.style.display = ""));
  }, []);

  return (
    <CategoryProvider>
      <Menu
        selectedCategory={article.cat}
        selectedSource={article.source}
        handleFilter={() => {}}
        handleCategoryFilter={handleCategoryFilter}
        setSearchTerm={setSearchTerm}
        setIsSearching={setIsSearching}
        setSubmittedSearchTerm={setSubmittedSearchTerm}
      />

      <div className="news-detail-container">
        <Head>
          <title>{`${article.text} | Newsflow`}</title>
        </Head>

        {/* Coloană laterală cu etichete */}
        <div className="news-detail-container-side" style={{ flex: 3 }}>
          <h3>Alege o etichetă din <br /> <span style={{ textTransform:"uppercase" }}>{article.cat}</span></h3>
          <ul className="category-labels">
            {categoryLabels.map((label, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleCategoryFilter(article.cat, label)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Conținut principal articol */}
        <div className="news-detail-container-side" style={{ flex: 8 }}>
          <nav className="breadcrumbs">
            <Link href="/">Acasă</Link> &gt; <span>{article.cat}</span> &gt;{" "}
            <span>{article.text}</span>
          </nav>
          <h1>{article.text}</h1>
          {article.imgSrc && (
            <div className="news-detail-image">
              <img src={article.imgSrc} alt={article.text} />
            </div>
          )}
          {article.intro && <p className="news-intro">{article.intro}</p>}
        </div>

        {/* Coloană laterală cu detalii și share */}
        <div
          className="news-detail-container-side"
          style={{ flex: 3 }}
        >
          <div className="news-details">
            <p>
              <span>
                <strong>{article.label}</strong>
              </span>
              <span>
                <FaRegClock className="news-clock" />
                <span
                  style={{
                    margin: 0,
                  }}
                >
                  {isOlderThan24h
                    ? "Publicat la data de"
                    : "Publicat "}
                </span>
                <span style={{ textTransform:"lowercase", paddingLeft: "2px" }}>
                <TimeAgo
                  date={article.date}
                  source={article.source}
                  archived={article.isArchived}
                />
                </span>
              </span>
              <span>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt
                    style={{
                      display: "inline-block",
                      verticalAlign: "text-top"
                    }}
                  />{" "}
                  <span style={{ paddingLeft:"5px"}}>Citește știrea pe{" "}</span>
                  <strong>{article.source}</strong>
                </a>
              </span>
              
            </p>
          </div>

          <div className="news-social">
            <FacebookShareButton
              url={`https://newsflow.ro/news/${slug}`}
              quote={article.text}
            >
              <FacebookIcon size={50} className="share-icon" />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://newsflow.ro/news/${slug}`}
              title={article.text}
            >
              <TwitterIcon size={50} className="share-icon" />
            </TwitterShareButton>
          </div>
        </div>
      </div>

      {/* Articole înrudite */}
      {relatedArticles.length > 0 && (
        <div className="related-articles">
          <h2>Din aceeași categorie:</h2>
          <ul className="related-articles-list">
            {relatedArticles.map((rel) => (
              <li key={rel.id} className="related-news">
                <Link
                  href={`/news/${rel.text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}-${rel.id}`}
                >
                  {rel.text}
                </Link>
                <p className="related-label">{rel.label}</p>
                <img src={rel.imgSrc} alt={rel.text} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </CategoryProvider>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const parts = slug.split("-");
  const id = parts[parts.length - 1];

  let article = null,
    isArchived = false,
    relatedArticles = [],
    categoryLabels = [];

  try {
    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [
      id,
    ]);

    if (rows.length) {
      article = rows[0];
    } else {
      const [archiveRows] = await pool.query(
        "SELECT * FROM archive WHERE id = ?",
        [id]
      );
      if (archiveRows.length) {
        article = archiveRows[0];
        isArchived = true;
      }
    }

    if (!article) return { notFound: true };
    if (article.date) article.date = article.date.toISOString();

    const [relatedRows] = await pool.query(
      "SELECT * FROM articles WHERE cat = ? AND id != ? ORDER BY date DESC LIMIT 10",
      [article.cat, id]
    );
    relatedArticles = relatedRows.map((a) => ({
      ...a,
      date: a.date.toISOString(),
    }));

    const [labelRows] = await pool.query(
      "SELECT DISTINCT label FROM articles WHERE cat = ? AND label IS NOT NULL AND label != ''",
      [article.cat]
    );
    categoryLabels = labelRows.map((r) => r.label);

    const removeDiacritics = (str) => {
      const map = { ă: "a", â: "a", î: "i", ș: "s", ş: "s", ț: "t", ţ: "t" };
      return str
        .split("")
        .map((c) => map[c] || c)
        .join("");
    };
    const generatedSlug = removeDiacritics(article.text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return {
      props: {
        article: { ...article, isArchived },
        slug: `${generatedSlug}-${article.id}`,
        relatedArticles,
        categoryLabels,
      },
    };
  } catch (err) {
    console.error("Error fetching article:", err);
    return { notFound: true };
  }
}

export default NewsDetail;
