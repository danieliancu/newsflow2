import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Menu, { CategoryProvider } from '../components/Menu';

const Cookies = () => {

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

  // Funcția pentru filtrarea după categorie
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
        <h1 className="heading-1">Cookie Policy</h1>
        <section>
          <h2>1. Introducere</h2>
          <p>
            Această Politică de Cookie-uri explică ce sunt cookie-urile, cum le folosim, cum le folosesc terții cu care colaborăm, precum și opțiunile tale privind cookie-urile.
          </p>
          <p>
            Prin utilizarea site-ului nostru, ești de acord cu utilizarea cookie-urilor conform acestei politici.
          </p>

          <h2>2. Ce sunt cookie-urile?</h2>
          <p>
            Cookie-urile sunt fișiere mici de text folosite pentru a stoca informații pe dispozitivul tău când vizitezi un site web. Ele asigură funcționarea corectă, îmbunătățesc securitatea, permit analiza traficului și ne ajută să înțelegem comportamentul utilizatorilor.
          </p>

          <h2>3. Cum folosim cookie-urile?</h2>
          <p>
            În timpul vizitei pe site-ul nostru, putem plasa următoarele tipuri de cookie-uri:
          </p>
          <ul>
            <li><strong>Cookie-uri esențiale:</strong> Necesare pentru funcționarea site-ului.</li>
            <li><strong>Cookie-uri de performanță:</strong> Ajută la analizarea modului de utilizare a site-ului.</li>
            <li><strong>Cookie-uri funcționale:</strong> Păstrează preferințele utilizatorului (de ex., limba) și oferă o experiență personalizată.</li>
            <li><strong>Cookie-uri de publicitate:</strong> Folosite pentru a afișa reclame relevante și pentru a monitoriza eficiența campaniilor publicitare.</li>
          </ul>
          <p>
            Cookie-urile noastre nu conțin informații care te identifică direct și nu oferă acces la fișierele dispozitivului tău, deși putem corela aceste informații cu datele furnizate separat (ex.: printr-un formular).
          </p>

          <h2>4. Opțiunile tale privind cookie-urile</h2>
          <p>
            Poți gestiona preferințele cookie-urilor direct din setările browserului. Poți bloca anumite cookie-uri sau configura notificări când sunt setate cookie-uri noi.
          </p>

          <h2>5. Cookie-uri de la terți</h2>
          <p>
            Unii parteneri, precum furnizorii de servicii de plată sau Google Analytics, pot seta propriile cookie-uri, asupra cărora Newsflow nu are control. Te rugăm să consulți politicile lor de confidențialitate pentru mai multe detalii.
          </p>
          <p>
            Newsflow folosește <strong>Google Analytics</strong> pentru a analiza modul de utilizare a site-ului. Informațiile generate (inclusiv adresa IP anonimă) sunt stocate pe servere din SUA, conform <a href="http://www.google.co.uk/intl/en/privacy/" target="_blank" rel="noopener noreferrer">politicii de confidențialitate Google</a>.
          </p>

          <h2>6. Controlul cookie-urilor</h2>
          <p>
            Majoritatea browserelor sunt configurate inițial să accepte toate cookie-urile, dar poți modifica aceste setări pentru a bloca sau a primi notificări la setarea unui cookie nou. Consultă secțiunea „Ajutor” a browserului pentru mai multe informații.
          </p>
          <p>
            Pentru detalii suplimentare privind gestionarea cookie-urilor, poți vizita:
          </p>
          <ul>
            <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">www.youronlinechoices.eu</a> – pentru vizitatori din UE</li>
            <li><a href="https://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a> – pentru restul lumii</li>
          </ul>
        </section>
      </div>
      <Footer />
    </CategoryProvider>
  );
};

export default Cookies;
