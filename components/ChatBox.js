// pages/api/ask.js
// pages/chat.js
// pages/api.articlesFiltered.js
// components/ChatBox.js
import { useState, useEffect } from "react";

export default function ChatBox() {
  // State pentru articolele complete preluate din API
  const [articles, setArticles] = useState([]);
  // Dropdown pentru publicații unice
  const [sources, setSources] = useState([]);
  // Dropdown pentru domenii; depinde de publicația aleasă
  const [labels, setLabels] = useState([]);
  // State pentru articolele filtrate (folosite pentru a decide dacă trimitem cererea)
  const [filteredArticles, setFilteredArticles] = useState([]);

  const [selectedSource, setSelectedSource] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  // Timpul este fixat implicit la 24 de ore (dropdown-ul pentru timp a fost eliminat)
  const [selectedHours] = useState("24");

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  // Stare nouă pentru a monitoriza fetch-ul articolelor filtrate
  const [articlesFilteredLoading, setArticlesFilteredLoading] = useState(false);

  // Preluăm articolele complete din API la montarea componentei
  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        const articlesData = data.data || [];
        setArticles(articlesData);
        // Extragem valorile unice pentru "source"
        const uniqueSources = Array.from(new Set(articlesData.map(article => article.source)));
        setSources(uniqueSources);
      })
      .catch((err) => {
        console.error("Eroare la preluarea articolelor:", err);
      });
  }, []);

  // Actualizăm lista de etichete (labels) când se schimbă publicația selectată
  useEffect(() => {
    if (selectedSource) {
      const filteredForLabels = articles.filter(article => article.source === selectedSource);
      const uniqueLabels = Array.from(new Set(filteredForLabels.map(article => article.label)));
      setLabels(uniqueLabels);
      if (!uniqueLabels.includes(selectedLabel)) {
        setSelectedLabel("");
      }
    } else {
      setLabels([]);
      setSelectedLabel("");
    }
  }, [selectedSource, articles, selectedLabel]);

  // Resetează răspunsul la orice schimbare în dropdown (Publicație sau Domeniu)
  useEffect(() => {
    setAnswer("");
  }, [selectedSource, selectedLabel]);

  // Preluăm articolele filtrate din API folosind endpoint-ul articlesFiltered
  useEffect(() => {
    if (!selectedSource || !selectedLabel) return;

    setArticlesFilteredLoading(true);

    const url = `/api/articlesFiltered?source=${selectedSource}&label=${selectedLabel}&hours=${selectedHours}`;
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Articole filtrate:", data.data);
        setFilteredArticles(data.data || []);
        setArticlesFilteredLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la preluarea articolelor filtrate:", err);
        setArticlesFilteredLoading(false);
      });
  }, [selectedSource, selectedLabel, selectedHours]);

  // Funcția care construiește promptul și face cererea către /api/ask
  const handleSummarize = async () => {
    if (!selectedSource || !selectedLabel) return;

    setLoading(true);
    setAnswer("");

    if (filteredArticles.length === 0) {
      setAnswer(`Din păcate, site-ul ${selectedSource} nu a publicat nicio știre din domeniul ${selectedLabel} în ultimele 24 de ore.`);
      setLoading(false);
      return;
    }

    const question = `Rezuma știrile din ultimele 24 de ore din Publicația ${selectedSource} la domeniul ${selectedLabel}. 
Te rog să extragi doar informațiile cele mai importante, fără a acoperi toate știrile, și să te încadrezi în 1024 tokens.
Dacă nu găsești știri relevante, te rog să returnezi mesajul "Din pacate site-ul respectiv nu detine nicio stire conform cu criteriile alese, va rugam sa incercati o alta cautare".`;

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: selectedSource,
          label: selectedLabel,
          hours: selectedHours,
          question,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const defaultMessageFragment = "îmi pare rău, dar ca asistent AI, nu am capacitatea";
        if (data.answer && data.answer.toLowerCase().includes(defaultMessageFragment)) {
          setAnswer("Din pacate site-ul respectiv nu detine nicio stire conform cu criteriile alese, va rugam sa incercati o alta cautare");
        } else {
          setAnswer(data.answer || "Nu am găsit un răspuns.");
        }
      } else {
        setAnswer(data.error || "Eroare la cerere.");
      }
    } catch (err) {
      setAnswer("Eroare la trimiterea cererii.");
    }
    setLoading(false);
  };

  // Calculăm textul pentru buton
  let buttonText = "";
  if (!selectedSource || !selectedLabel || filteredArticles.length === 0) {
    buttonText = "Te rugam sa selectezi o categorie pentru a putea face un rezumat";
  } else {
    const count = filteredArticles.length;
    let formattedCount = "";
    if (count === 1) {
      formattedCount = "o știre";
    } else if (count > 1 && count < 19) {
      formattedCount = `${count} știri`;
    } else if (count > 19) {
      formattedCount = `${count} de știri`;
    }
    buttonText = `${selectedSource} a publicat ${formattedCount} în categoria ${selectedLabel} în ultimele 24 de ore`;
  }

  // Determinăm dacă butonul trebuie să fie dezactivat:
  // Dacă nu este selectată publicația/domeniul, dacă încă se încarcă rezultatele, dacă nu există articole filtrate,
  // sau după ce s-a generat un rezultat (answer existent)
  const isDisabled =
    !selectedSource ||
    !selectedLabel ||
    loading ||
    articlesFilteredLoading ||
    filteredArticles.length === 0 ||
    answer !== "";

  return (
    <div style={{ maxWidth: 600, margin: "auto !important", padding: 20 }}>

      {/* Dropdown pentru Publicație */}
      <label style={{ display: "block", marginTop: "20px !important" }}>
        Publicație:
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 5 }}
        >
          <option value="">Selectează publicația</option>
          {sources.map(source => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown pentru Domeniu */}
      <label style={{ display: "block", marginTop: "20px !important" }}>
        Categorie:
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 5 }}
          disabled={!selectedSource}
        >
          <option value="">Selectează categoria</option>
          {labels.map(label => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown-ul pentru timp a fost eliminat; se folosește implicit 24 de ore */}

      <button
        onClick={handleSummarize}
        disabled={isDisabled}
        className={isDisabled ? "buttonDisabled" : "buttonEnabled"}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "10px 20px",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isDisabled ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Scriem rezumatul pentru tine..." : buttonText}
      </button>


      {answer && (
        <div style={{ marginTop: 20, background: "rgb(249, 249, 249)", padding: 15, borderRadius: 8 }}>
          <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
        </div>
      )}
    </div>
  );
}
