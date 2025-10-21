import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="outline-light"
      size="sm"
      onClick={toggleLanguage}
      className="ms-2"
      style={{ border: '1px solid rgba(255,255,255,0.3)' }}
    >
      {i18n.language === 'fr' ? 'EN' : 'FR'}
    </Button>
  );
};

export default LanguageSwitcher;