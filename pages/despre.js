import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Menu, { CategoryProvider } from '../components/Menu';

// pages/despre.js
const Despre = () => {

  useEffect(() => {
    const elements = document.querySelectorAll(".top-right-mobile>svg");
    elements.forEach(el => {
      el.style.display = "none";
    });

    return () => {
      elements.forEach(el => {
        el.style.display = "";
      });
    };
  }, []);

  const router = useRouter();

  // Funcția pentru filtrarea după categorie, definită în cadrul componentei
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
      <div className="static-page">
        <h1 className="heading-1">Despre noi</h1>
        <section>

          <h2>Misiunea noastră</h2>
          <p>
            <strong>Newsflow România</strong> promovează un consum sănătos de informație, prin susținerea accesului la jurnalism credibil, independent și de interes public, provenit dintr-o diversitate de surse. 
            Într-o eră a știrilor false și a polarizării, misiunea noastră este mai importantă ca niciodată.
          </p>

          <ul>
            <li>Facem ușor pentru milioane de oameni să descopere știri de la zeci de publicații.</li>
            <li>Ajutăm publicațiile, indiferent de dimensiune, să ajungă la publicuri altfel greu accesibile.</li>
          </ul>

          <h2>Cum funcționează Newsflow România</h2>
          <ol>
            <li>Evaluăm publicațiile conform Standardelor Editoriale, urmărind consistența în jurnalism de calitate și credibil.</li>
            <li>După acceptare, monitorizăm site-ul lor non-stop pentru știri noi.</li>
            <li>Tehnologia noastră analizează fiecare articol după criterii editoriale și îl distribuie în fluxurile relevante.</li>
            <li>Reevaluăm regulat publicațiile și colaborăm pentru menținerea standardelor înalte.</li>
          </ol>

          <h2>Filosofia noastră</h2>
          <p><strong>O societate sănătoasă are nevoie de o dietă informațională sănătoasă.</strong></p>
          <p>
            La Newsflow România, știrile sunt în centrul a tot ceea ce facem. Platforma noastră oferă acces la titluri din surse variate, credibile și independente. Oferim spațiul în care oamenii pot:
          </p>
          <ul>
            <li>Descoperi publicații noi</li>
            <li>Compara prezentări diferite ale acelorași fapte</li>
            <li>Provoca propriile convingeri</li>
            <li>Forma opinii bine informate</li>
          </ul>
          <p>
            Credem că acest proces contribuie la o societate mai echilibrată. Dar provocările sunt uriașe — viitorul jurnalismului de interes public depinde de finanțare durabilă și distribuție echitabilă.
          </p>

          <h2>Un mediu potrivit pentru toți</h2>
          <p>
            Cu milioane de oameni afectați de dependența de jocuri de noroc, Newsflow România își asumă responsabilitatea de a menține un mediu sigur pentru utilizatori.
          </p>
          <ul>
            <li>Am impus restricții stricte privind publicitatea la jocuri de noroc de peste un deceniu.</li>
            <li>Nu acceptăm publicitate sau conținut legat de jocuri de noroc.</li>
            <li>Nu facem trimitere către site-uri de pariuri sau care promovează acest tip de conținut.</li>
            <li>Articolele care conțin excesiv astfel de reclame pot fi eliminate de pe platformă.</li>
          </ul>

          <h2>O echipă cu o misiune dincolo de profit</h2>
          <p>
            La Newsflow România, nu urmărim doar cifre – ne concentrăm pe impactul pozitiv pe care știrile îl pot avea. Avem o echipă diversă, motivată de valori comune și o viziune pe termen lung.
          </p>
          <ul>
            <li>Structură orizontală de management – inițiativa este încurajată, opiniile sunt ascultate.</li>
            <li>Relații pe termen lung și recunoașterea meritelor fiecărui membru.</li>
            <li>Stabilitate combinată cu dinamismul unui start-up.</li>
          </ul>

          <h2>Cultura noastră organizațională</h2>
          <ul style={{ columns: 2, listStyleType: 'none', padding: 0 }}>
            <li><strong>Deschidere și colaborare:</strong> schimbăm idei între echipe.</li>
            <li><strong>Rigoare:</strong> experimentăm și validăm fiecare pas.</li>
            <li><strong>O echipă, o viziune:</strong> deciziile sunt luate în consens.</li>
            <li><strong>Atmosferă de apreciere:</strong> recunoștința face parte din ADN-ul nostru.</li>
            <li><strong>Spațiu de creștere:</strong> încurajăm dezvoltarea continuă.</li>
            <li><strong>Flexibilitate:</strong> înțelegem prioritățile personale și familiale.</li>
          </ul>

          <h2>Ești editor sau ai un site de știri?</h2>
          <p>
            <strong>Newsflow România</strong> ajută publicațiile – mari sau mici – să ajungă la publicuri noi și relevante. 
          </p>
          <ul>
            <li>Rulăm peste <strong>o sută de mii de titluri</strong> lunar.</li>
            <li>Colaborăm cu <strong>branduri media și creatori de conținut</strong> la nivel național.</li>
          </ul>
          <p>
            Dacă ești editor și vrei să îți crești audiența, <strong>Newsflow România</strong> este locul ideal pentru tine.
          </p>

        </section>
      </div>
      <Footer />
      </CategoryProvider>
    );
  };
  


  export default Despre;
  