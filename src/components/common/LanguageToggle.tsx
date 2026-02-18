
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex gap-2 items-center">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'bg-primary hover:bg-primary-600' : ''}
      >
        {t('englishLang')}
      </Button>
      <Button
        variant={language === 'ta' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('ta')}
        className={`${language === 'ta' ? 'bg-primary hover:bg-primary-600' : ''} ${language === 'ta' ? 'font-tamil' : ''}`}
      >
        {t('tamilLang')}
      </Button>
    </div>
  );
};

export default LanguageToggle;
