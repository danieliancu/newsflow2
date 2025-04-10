// components/ChatBox.js
// pages/api/ask.js
// pages/chat.js


import { useState, useEffect } from "react";

export default function ChatBox() {
  // State pentru articolele preluate din API
  const [articles, setArticles] = useState([]);
  // Dropdown pentru publicații unice
  const [sources, setSources] = useState([]);
  // Dropdown pentru domenii; depinde de publicația aleasă
  const [labels, setLabels] = useState([]);

  const [selectedSource, setSelectedSource] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  // Valoarea din dropdown-ul pentru timp (numărul de ore)
  const [selectedHours, setSelectedHours] = useState("1");

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Opțiuni statice pentru timpul relativ (în ore)
  const timeOptions = [
    { value: "1", label: "Acum o oră" },
    { value: "2", label: "Acum două ore" },
    { value: "3", label: "Acum trei ore" },
  ];

  // Preluăm articolele din API la montarea componentei
  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        const articlesData = data.data || [];
        setArticles(articlesData);
        // Extragem valorile unice pentru "source"
        const uniqueSources = Array.from(
          new Set(articlesData.map((article) => article.source))
        );
        setSources(uniqueSources);
      })
      .catch((err) => {
        console.error("Eroare la preluarea articolelor:", err);
      });
  }, []);

  // Actualizăm lista de etichete (labels) când se schimbă publicația selectată
  useEffect(() => {
    if (selectedSource) {
      const filteredArticles = articles.filter(
        (article) => article.source === selectedSource
      );
      const uniqueLabels = Array.from(
        new Set(filteredArticles.map((article) => article.label))
      );
      setLabels(uniqueLabels);
      // Resetăm domeniul dacă acesta nu se regăsește în noile opțiuni
      if (!uniqueLabels.includes(selectedLabel)) {
        setSelectedLabel("");
      }
    } else {
      setLabels([]);
      setSelectedLabel("");
    }
  }, [selectedSource, articles, selectedLabel]);

  // Funcția ce construiește promptul și face cererea către /api/ask
  const handleSummarize = async () => {
    if (!selectedSource || !selectedLabel || !selectedHours) return;

    setLoading(true);
    setAnswer("");

    // Creăm un prompt ce menționează clar ce se dorește
    const question = `Rezuma știrile din ${selectedHours} ${
      selectedHours === "1" ? "ultima oră" : "ultimele ore"
    } din Publicația ${selectedSource} la domeniul ${selectedLabel}. 
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
    // Înlocuim mesajul implicit dacă acesta conține textul nedorit
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

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Asistent AI pentru știri 🧠</h2>

      {/* Dropdown pentru Publicație (source) */}
      <label style={{ display: "block", marginBottom: 10 }}>
        Publicație:
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 5 }}
        >
          <option value="">Selectează publicația</option>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown pentru Domeniu (label) */}
      <label style={{ display: "block", marginBottom: 10 }}>
        Domeniu:
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 5 }}
          disabled={!selectedSource}
        >
          <option value="">Selectează domeniul</option>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {/* Dropdown pentru Timp */}
      <label style={{ display: "block", marginBottom: 10 }}>
        Timp:
        <select
          value={selectedHours}
          onChange={(e) => setSelectedHours(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 5 }}
        >
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={handleSummarize}
        disabled={!selectedSource || !selectedLabel || !selectedHours || loading}
        style={{ marginTop: 10 }}
      >
        {loading ? "Se generează..." : "Afișează sumarul știrilor"}
      </button>

      {answer && (
        <div
          style={{
            marginTop: 20,
            background: "#f9f9f9",
            padding: 15,
            borderRadius: 8,
          }}
        >
          <strong>Răspuns AI:</strong>
          <p style={{ whiteSpace: "pre-wrap" }}>{answer}</p>
        </div>
      )}
    </div>
  );
}
