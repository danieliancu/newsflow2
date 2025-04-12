import {React, useEffect} from "react";
import { useRouter } from "next/router";
import ChatBox from "../components/ChatBox";
import AISparkleIcon from "@/components/aisparkleicon";
import Menu, { CategoryProvider } from "../components/Menu";

console.log("ChatBox type:", typeof ChatBox); // trebuie să fie "function"

export default function Home() {


  useEffect(() => {
  const elements = document.querySelectorAll(".top-right-mobile");
  elements.forEach(el => {
    el.style.display = "none";
  });

  // optional: dacă vrei să o readuci când se iese de pe pagină:
  return () => {
    elements.forEach(el => {
      el.style.display = "";
    });
  };
}, []);

  const router = useRouter();

  // Funcție pentru filtrarea după categorie: la click, navighează către pagina cu categoria selectată
  const handleCategoryFilter = (category) => {
    router.push(`/?category=${encodeURIComponent(category)}`);
  };

  return (
    <CategoryProvider>
      <Menu 
        selectedCategory=""
        selectedSource=""
        handleFilter={() => {}}
        handleCategoryFilter={handleCategoryFilter}
        setSearchTerm={() => {}}
        setIsSearching={() => {}}
        setSubmittedSearchTerm={() => {}}
      />
      <div>
        <h1
          style={{
            textAlign: "center",
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
            fontSize: "24px",
            fontWeight: "bolder",
            letterSpacing:"3px"
          }}
        >
          <AISparkleIcon style={{ width: "40px", height: "40px" }} />
          Rezumatul zilei
        </h1>
        <h2
          style={{
            textAlign:"left",
            maxWidth:"560px",
            padding:"20px",
            fontWeight:"bolder",
            margin:"auto !important"
          }}
        >
          Această aplicație îți oferă un rezumat al celor mai importante știri din România, bazat pe cele mai recente articole de pe site-urile de știri.
        </h2>
        <ChatBox />
      </div>
    </CategoryProvider>
  );
}
