import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Menu, { CategoryProvider } from '../components/Menu';

// pages/despre.js
const Privacy = () => {

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
        <h1 className="heading-1">Privacy Policy</h1>
        <section>
        <h2>1. Introducere</h2>
<p>Această Politică de Confidențialitate se aplică datelor personale pe care le colectăm despre tine în următoarele situații:</p>
<ul>
  <li>când vizitezi site-ul nostru www.newsflow.ro;</li>
  <li>când trimiți o solicitare sau feedback prin formulare online;</li>
  <li>când îți creezi sau te autentifici într-un cont Newsflow;</li>
  <li>când te abonezi la unul dintre newsletter-ele noastre;</li>
  <li>când activezi notificări push pe dispozitiv;</li>
  <li>când propui o publicație pentru includerea în platforma Newsflow;</li>
  <li>dacă te abonezi la alerte prin email (ex. secțiune de anunțuri);</li>
  <li>dacă îți creezi un cont pentru gestionarea acestor alerte;</li>
  <li>când ne contactezi prin rețele sociale;</li>
  <li>când ne trimiți un email direct;</li>
  <li>când corespondezi prin poștă sau telefonic cu noi;</li>
  <li>când aplici pentru un post în cadrul echipei Newsflow;</li>
  <li>în contextul afișării de publicitate online;</li>
  <li>și/sau în cadrul altor acțiuni de marketing.</li>
</ul>
<p>(În cadrul acestui document, termenii „date” și „informații” sunt folosiți interschimbabil.)</p>

<p>Dacă nu se precizează altfel, Green Horizon Concepts SRL („Newsflow”, „noi”, „ne” sau „al nostru”) este operatorul datelor personale pe care le colectăm și le procesăm. Datele de contact ale responsabilului nostru cu protecția datelor se regăsesc la secțiunea 9.</p>

<p>În unele cazuri, colaborăm cu terți pentru procesarea datelor în numele nostru. Aceștia acționează ca persoane împuternicite (procesatori), ceea ce înseamnă că urmează instrucțiunile noastre, nu pot partaja datele mai departe și noi rămânem responsabili pentru protecția acestora.</p>

<p>Prin continuarea utilizării site-urilor noastre, îți exprimi acordul privind colectarea, stocarea și utilizarea datelor tale personale, conform descrierii de mai jos.</p>

        <h2>2. Datele pe care le colectăm despre tine</h2>
<p>Prin „date cu caracter personal” înțelegem orice informație care permite identificarea unei persoane fizice. Acestea nu includ datele anonimizate.</p>
<p>Colectăm, stocăm și prelucrăm date personale în următoarele situații:</p>
<p><strong>Când vizitezi site-ul nostru</strong> – www.newsflow.ro și alte subdomenii asociate. Politica noastră de confidențialitate nu se aplică site-urilor operate de terți, chiar dacă sunt accesibile prin linkuri de pe site-ul nostru.</p>
<p><strong>Funcționalitatea site-ului</strong> – Pentru a furniza servicii personalizate, stocăm preferințele și comportamentul de navigare în cookie-uri (dacă nu ești autentificat) sau în contul tău Newsflow (dacă ești autentificat).</p>
<p><strong>Cookie-uri</strong> – Vezi <a href="/politica-cookie">Politica de Cookie-uri</a> pentru detalii.</p>
<p><strong>Date despre minori</strong> – Platforma Newsflow nu este destinată persoanelor sub 18 ani.</p>
<p><strong>Date sensibile</strong> – Nu colectăm date precum origine etnică, orientare sexuală, opinii politice, sănătate, cazier. Dacă ne furnizezi astfel de informații voluntar (ex. printr-un formular), înțelegem că îți dai acordul pentru procesare.</p>
<p><strong>Obligația de furnizare a datelor</strong> – Dacă ești obligat legal sau contractual să ne furnizezi anumite date și refuzi, este posibil să nu putem oferi serviciile corespunzătoare.</p>

<h2>3. Cum folosim datele tale personale</h2>
<p>Folosim datele tale doar în condițiile permise de legislația română și europeană (GDPR). Scopuri comune:</p>
<p><strong>Analize și jurnale de sistem</strong> – Colectăm date precum IP, browser, sistem de operare, preferințe, pentru identificarea utilizatorilor unici și îmbunătățirea experienței.</p>
<p>Folosim Google Analytics, Hotjar și instrumente interne pentru aceste scopuri. Datele sunt stocate 30 zile (intern) sau 365 zile (Hotjar), în mod anonim.</p>
<p><strong>Preferințe personale</strong>:</p>
<ul>
  <li>„Cele mai vizualizate” – memorăm paginile accesate frecvent.</li>
  <li>Font personalizat – salvăm preferințele tale privind dimensiunea fontului.</li>
  <li>Publicații ascunse – dacă alegi să ascunzi sau evidențiezi anumite surse.</li>
  <li>Alerte și notificări – dacă respingi o alertă, reținem alegerea.</li>
  <li>Căutări recente – în cazul anunțurilor agregate (dacă oferim acest serviciu).</li>
</ul>
<p><strong>Formulare online</strong> – Dacă ne trimiți un mesaj printr-un formular, reținem datele pentru a putea răspunde. Nu le asociem cu alte date fără acordul tău.</p>
<p><strong>Conturi Newsflow</strong> – Salvăm adresa de email, știrile vizualizate, preferințele și detalii despre activitatea ta pentru a furniza funcționalități precum „Citite recent”.</p>
<p><strong>Buletine informative</strong> – Pentru trimiterea newsletter-elor folosim MailChimp. Datele sunt stocate cu acordul tău.</p>
<p><strong>Notificări pe dispozitive</strong> – Folosim OneSignal pentru notificări push. Datele colectate includ OS, limbă, fus orar, IP, interacțiuni cu notificările. Sunt folosite doar cu consimțământul tău.</p>
<p><strong>Aplicații de publicare</strong> – Dacă trimiți o publicație spre aprobare, vom prelucra datele tale în scop contractual și operațional.</p>
<p><strong>Emailuri directe</strong> – Dacă ne scrii direct, păstrăm corespondența pentru urmărirea istoricului solicitărilor.</p>

<h2>4. Divulgarea datelor tale personale</h2>
<p>Putem partaja datele cu:</p>
<ul>
  <li>Furnizori de plăți (Stripe)</li>
  <li>Furnizori de analiză (Google, Hotjar)</li>
  <li>Furnizori de email (MailChimp)</li>
  <li>Furnizori de infrastructură cloud (Google Cloud, AWS)</li>
  <li>Consultanți profesioniști sau autorități, dacă este legal necesar</li>
</ul>
<p>În cazul unei fuziuni sau vânzări, este posibil ca datele tale să fie transferate, cu menținerea protecției lor.</p>

<h2>5. Transferuri internaționale</h2>
<p>Unele date pot fi transferate în afara UE/SEE. Ne asigurăm că aceste transferuri respectă legislația, prin:</p>
<ul>
  <li>Clauze contractuale standard</li>
  <li>Transfer către țări cu decizie de adecvare</li>
  <li>Mecanisme conforme cum ar fi acordurile UE-SUA privind protecția datelor</li>
</ul>

<h2>6. Securitatea datelor</h2>
<p>Aplicăm măsuri tehnice și organizatorice pentru a preveni accesul neautorizat, pierderea sau utilizarea greșită a datelor tale. Accesul este permis doar persoanelor autorizate. Dacă are loc o breșă, te vom informa conform legii.</p>

<h2>7. Păstrarea datelor</h2>
<p>Stocăm datele doar atât cât este necesar pentru scopul în care au fost colectate. Putem păstra unele date în formă anonimizată pentru scopuri statistice pe termen nedeterminat.</p>

<h2>8. Drepturile tale legale</h2>
<p>Conform GDPR, ai dreptul:</p>
<ul>
  <li>să fii informat despre modul în care îți folosim datele</li>
  <li>să accesezi datele pe care le deținem despre tine</li>
  <li>să ceri rectificarea datelor inexacte</li>
  <li>să ceri ștergerea datelor („dreptul de a fi uitat”)</li>
  <li>să restricționezi prelucrarea</li>
  <li>să te opui prelucrării (ex: marketing direct)</li>
  <li>la portabilitatea datelor</li>
  <li>să retragi consimțământul în orice moment</li>
</ul>
<p>Ne poți contacta oricând la <strong><a href="emailto:office@newsflow.ro">office@newsflow.ro</a></strong> pentru a-ți exercita aceste drepturi. Nu percepem taxe pentru cereri legitime. Vom răspunde în maximum o lună.</p>

<h2>9. Contact</h2>
<p>Dacă ai întrebări legate de această Politică de Confidențialitate, contactează responsabilul nostru cu protecția datelor la:</p>
<p><strong>Data Protection Officer<br/>www.newsflow.ro<br/>Email: <a href="emailto:office@newsflow.ro">office@newsflow.ro</a></strong></p>

<h2>10. Modificări ale acestei politici</h2>
<p>Putem actualiza periodic această Politică de Confidențialitate. Te încurajăm să revii regulat pe această pagină. În cazul unor modificări importante, te vom anunța prin email sau notificare pe site.</p>

         

        </section>
      </div>
      <Footer />
      </CategoryProvider>
    );
  };
  


  export default Privacy;
  