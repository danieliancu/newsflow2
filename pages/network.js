import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Menu, { CategoryProvider } from '../components/Menu';

const Network = () => {
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
            <h1 className="heading-1">Rețeaua de publicații</h1>

            <h2>Publică pe Newsflow România</h2>
            <p>Mii de editori beneficiază de distribuția linkurilor către articolele lor prin intermediul Newsflow România, ajungând la peste 11 milioane de utilizatori unici în fiecare lună.</p>
            <p>Publicul nostru este format în mare parte din profesioniști și factori de decizie din România. În fiecare lună, pot fi vizualizate peste o sută de mii de articole. Newsflow promovează o Politică de Conținut Deschis, permițând atât marilor publicații, cât și site-urilor independente sau bloggerilor să își crească vizibilitatea prin includerea în platforma noastră.</p>

            <h2>Criterii de eligibilitate</h2>
            <p>Pentru a putea fi listat în rețeaua editorială Newsflow, site-ul tău trebuie să dovedească un istoric de conținut de calitate în mod constant, cel puțin în ultimele șase luni.</p>
            <p>Este necesar ca tu și publicația ta să respectați <a href="https://newsflow.ro/terms">Termenii și Condițiile rețelei Newsflow</a>, care includ Standardele Editoriale, Codul de Conduită, Politica de Rezolvare a Disputelor și Cerințele Tehnice. În unele cazuri, este posibil să solicităm afișarea unui logo Newsflow pe site-ul tău.</p>
            <p>Știm că aceste condiții pot părea riguroase pentru unii editori, însă ele asigură calitatea și încrederea în conținutul promovat. Te rugăm să le parcurgi atent și să te asiguri că le poți respecta înainte de a aplica.</p>

            <h2>Cum poți deveni partener Newsflow?</h2>
            <p><strong>IMPORTANT:</strong> Din cauza numărului foarte mare de solicitări, nu mai acceptăm aplicații directe pentru includerea în Rețeaua de Publisheri Newsflow.</p>
            <p>Echipa noastră editorială continuă însă să monitorizeze constant piața și adaugă manual cele mai valoroase și relevante surse descoperite prin cercetare proprie.</p>

            <h2>Notificări și solicitări</h2>
            <ul>
              <li><a href="mailto:office@newsflow.ro?subject=Modificare%20nume%20sau%20URL%20site">Solicită modificarea numelui sau URL-ului publicației</a></li>
              <li><a href="mailto:office@newsflow.ro?subject=Redesign%20programat">Anunță un redesign planificat</a></li>
              <li><a href="mailto:office@newsflow.ro?subject=Titlu%20nepreluat">Semnalează un titlu care nu a fost preluat</a></li>
              <li><a href="mailto:office@newsflow.ro?subject=Ștergere%20titlu">Solicită eliminarea unui titlu</a></li>
              <li><a href="mailto:office@newsflow.ro?subject=Alte%20informații">Alte întrebări sau solicitări</a></li>
            </ul>

            <p>Platforma www.newsflow.ro este operată de <strong>Green Horizon Concepts SRL</strong>, o companie românească dedicată promovării conținutului de calitate și a jurnalismului independent.</p>


        </div>
        <Footer />
    </CategoryProvider>
  );
};

export default Network;
