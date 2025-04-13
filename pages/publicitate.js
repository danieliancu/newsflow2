import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Menu, { CategoryProvider } from '../components/Menu';

const Publicitate = () => {
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
        <h1 className="heading-1">Promovează-te cu Newsflow România</h1>
        <div>
          <p className="first">
            De la lansarea sa, Newsflow România a devenit una dintre cele mai importante platforme pentru descoperirea știrilor esențiale.
          </p>
          <p>
            Oferim conexiuni rapide către cele mai relevante articole, dintr-o varietate de surse online — de la publicații internaționale, naționale și regionale, până la comunicate de presă și publicații exclusiv digitale.
          </p>
          <p>
            Indiferent de obiectivele tale de marketing, avem soluții eficiente pentru promovare, sponsorizare și vizibilitate direcționată.
          </p>
          <p>
            Pentru a te pune în legătură cu persoana potrivită, te rugăm să completezi formularul de mai jos.
          </p>
        </div>
        <div>
          <form
            name="Advertiser.Enquiry"
            action="mailto:dani.iancu@yahoo.com"
            method="POST"
            encType="text/plain"
          >
            <div className="nnform">
              <h2>Tipul Cererii</h2>
              <div className="form_item">
                <div className="form_label">Ești:</div>
                <div className="form_field">
                  <select name="TipOrganizatie" required>
                    <option value="">Selectează</option>
                    <option value="advertiser">Un promotor direct</option>
                    <option value="ad_agency">Agenție de publicitate</option>
                    <option value="ad_network">Rețea publicitară</option>
                    <option value="technology_provider">Furnizor de tehnologie</option>
                  </select>
                </div>
              </div>
              <div className="form_item">
                <div className="form_label">Ce dorești să faci?</div>
                <div className="form_field">
                  <select name="Scop" required>
                    <option value="">Selectează</option>
                    <option value="advertise">Promovează pe platforma noastră</option>
                    <option value="monetise">Oferă soluții de monetizare</option>
                    <option value="other">Alt scop</option>
                  </select>
                </div>
              </div>
              <div className="form_item">
                <div className="form_label">Zone geografice de interes</div>
                <div className="form_field">
                  <label className="opt">
                    <input className="custom-checkbox custom-checkbox-form" name="Geos" type="checkbox" value="Romania" />
                    România
                  </label>
                  <label className="opt">
                    <input className="custom-checkbox custom-checkbox-form" name="Geos" type="checkbox" value="EU" />
                    Uniunea Europeană
                  </label>
                  <label className="opt">
                    <input className="custom-checkbox custom-checkbox-form" name="Geos" type="checkbox" value="Global" />
                    Global
                  </label>
                </div>
              </div>
              <h2>Datele tale</h2>
              <div className="form_item">
                <div className="form_label">Prenume</div>
                <div className="form_field">
                  <input name="Prenume" type="text" required />
                </div>
              </div>
              <div className="form_item">
                <div className="form_label">Nume</div>
                <div className="form_field">
                  <input name="Nume" type="text" required />
                </div>
              </div>
              <div className="form_item">
                <div className="form_label">Companie</div>
                <div className="form_field">
                  <input name="Companie" type="text" required />
                </div>
              </div>
              <div className="form_item">
                <div className="form_label">Website companie</div>
                <div className="form_field">
                  <input name="Website" type="text" required />
                </div>
              </div>
              <div className="form_item">
                <div className="form_label">Telefon</div>
                <div className="form_field">
                  <input name="Telefon" type="text" required />
                </div>
              </div>
              <div className="form_item">
                <div className="form_label">Adresă de email</div>
                <div className="form_field">
                  <input name="Email" type="email" required />
                </div>
              </div>
              <div className="form_item">
                <div className="form_label">Mesajul tău</div>
                <div className="form_field">
                  <textarea name="Comentarii" rows="5" />
                </div>
              </div>
              <div className="form_item">
                <div className="form_field form_c_submit">
                  <button type="submit" className="btn--primary">
                    Trimite Cererea
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </CategoryProvider>
  );
};

export default Publicitate;
