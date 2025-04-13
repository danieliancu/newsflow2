import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Menu, { CategoryProvider } from '../components/Menu';

const Contact = () => {
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
        <div className="static-page answer">
            <h1 className="heading-1">Contact</h1>
            <p className="first">Pentru întrebări, sugestii sau feedback, ne poți contacta la: <a href="emailto:office@newsflow.ro">office@newsflow.ro</a></p>


        </div>
        <Footer />
    </CategoryProvider>
  );
};

export default Contact;
