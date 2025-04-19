import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Menu, { CategoryProvider } from '../components/Menu';

// pages/despre.js
const Terms = () => {

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
        <h1 className="heading-1">Termeni și condiții</h1>
        <section>
        <h2>1. Introducere</h2>
        <p>Bine ai venit pe www.newsflow.ro. Prin accesarea și utilizarea acestui site, ești de acord cu respectarea acestor Termeni și Condiții. Dacă nu ești de acord cu acești termeni, te rugăm să nu folosești site-ul.</p>
        <p>Site-ul www.newsflow.ro este operat de Green Horizon Concepts SRL. Ne rezervăm dreptul de a modifica acești termeni în orice moment, fără notificare prealabilă. Este responsabilitatea ta să consulți periodic această pagină.</p>

        <h2>2. Accesul la site</h2>
        <p>Accesul la site este permis temporar. Putem restricționa sau suspenda accesul în orice moment, pentru întreținere, actualizări sau motive de securitate.</p>
        <p>Nu garantăm că site-ul sau conținutul acestuia va fi disponibil în mod continuu sau fără întreruperi.</p>

        <h2>3. Drepturi de proprietate intelectuală</h2>
        <p>Tot conținutul de pe www.newsflow.ro (texte, imagini) este protejat prin legislația privind drepturile de autor și nu aparține Green Horizon Concepts SRL. Utilizarea neautorizată este strict interzisă.</p>
        <p>Nu ai dreptul să copiezi, distribui, modifici sau reproduci conținutul fără acordul scris al deținătorului de drepturi.</p>

        <h2>4. Conturi de utilizator</h2>
        <p>Dacă îți creezi un cont pe Newsflow, ești responsabil pentru păstrarea confidențialității datelor de autentificare. Ne rezervăm dreptul de a suspenda sau închide conturi suspecte de utilizare abuzivă.</p>
        <p>Este interzisă folosirea unui cont în scopuri ilicite, de spam, fraudă sau pentru a interfera cu funcționarea site-ului.</p>

        <h2>5. Conținutul utilizatorului</h2>
        <p>Prin transmiterea oricărui tip de conținut către noi (ex. comentarii, publicații propuse, feedback), garantezi că ai dreptul să ne oferi acel conținut și ne acorzi o licență non-exclusivă, gratuită, de a-l utiliza în scop editorial sau de promovare.</p>

        <h2>6. Limitarea răspunderii</h2>
        <p>Site-ul nostru oferă informații cu caracter general. Nu garantăm că informațiile sunt complete, exacte sau actualizate. Utilizarea conținutului se face pe propriul risc.</p>
        <p>Nu suntem răspunzători pentru daune directe sau indirecte rezultate din utilizarea sau imposibilitatea de utilizare a site-ului.</p>

        <h2>7. Linkuri către site-uri externe</h2>
        <p>Site-ul poate conține linkuri către terți. Nu avem control asupra conținutului acestor site-uri și nu ne asumăm nicio responsabilitate privind politicile sau practicile lor. Te încurajăm să citești politicile acestora înainte de a interacționa cu respectivele site-uri.</p>

        <h2>8. Publicitate și cookie-uri</h2>
        <p>Serviciile gratuite oferite de Newsflow pot conține publicitate online. Acest lucru se face prin parteneri și platforme terțe (ex. Google, Facebook, Amazon etc.), în conformitate cu legislația în vigoare.</p>
        <p>Folosim cookie-uri pentru îmbunătățirea funcționalității site-ului. Pentru mai multe detalii, consultă <a href="/politica-cookie">Politica de Cookie-uri</a>.</p>

        <h2>9. Protecția datelor personale</h2>
        <p>Prelucrarea datelor personale este guvernată de <a href="/politica-confidentialitate">Politica de Confidențialitate</a>. Prin utilizarea site-ului, îți exprimi acordul pentru prelucrarea datelor în condițiile și scopurile descrise în aceasta.</p>

        <h2>10. Legislație aplicabilă</h2>
        <p>Termenii și condițiile sunt guvernate de legislația română. Orice dispută va fi soluționată de instanțele competente din România.</p>

        <h2>11. Contact</h2>
        <p>Pentru întrebări legate de acești termeni, ne poți contacta la:</p>
        <p><strong>Green Horizon Concepts SRL<br/>Email: <a href="mailto:office@newsflow.ro">office@newsflow.ro</a></strong></p>


        </section>
      </div>
      <Footer />
      </CategoryProvider>
    );
  };
  


  export default Terms;
  