
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ta';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
};

const translations = {
  appName: {
    en: 'PasumaiAI',
    ta: 'பசுமை AI',
  },
  login: {
    en: 'Login',
    ta: 'உள்நுழைய',
  },
  phoneNumber: {
    en: 'Phone Number',
    ta: 'தொலைபேசி எண்',
  },
  enterOTP: {
    en: 'Enter OTP',
    ta: 'OTP ஐ உள்ளிடவும்',
  },
  verifyOTP: {
    en: 'Verify OTP',
    ta: 'OTP சரிபார்க்க',
  },
  getOTP: {
    en: 'Get OTP',
    ta: 'OTP பெற',
  },
  dashboard: {
    en: 'Dashboard',
    ta: 'முகப்புப்பலகை',
  },
  weather: {
    en: 'Weather',
    ta: 'வானிலை',
  },
  crops: {
    en: 'My Crops',
    ta: 'என் பயிர்கள்',
  },
  addCrop: {
    en: 'Add Crop',
    ta: 'பயிர் சேர்க்க',
  },
  market: {
    en: 'Market',
    ta: 'சந்தை',
  },
  profile: {
    en: 'Profile',
    ta: 'சுயவிவரம்',
  },
  logout: {
    en: 'Logout',
    ta: 'வெளியேறு',
  },
  language: {
    en: 'Language',
    ta: 'மொழி',
  },
  welcome: {
    en: 'Welcome',
    ta: 'வரவேற்கிறோம்',
  },
  notifications: {
    en: 'Notifications',
    ta: 'அறிவிப்புகள்',
  },
  cropName: {
    en: 'Crop Name',
    ta: 'பயிர் பெயர்',
  },
  plantedDate: {
    en: 'Planted Date',
    ta: 'நடப்பட்ட தேதி',
  },
  acreage: {
    en: 'Acreage',
    ta: 'பரப்பளவு',
  },
  cropIdentify: {
    en: 'Identify Crop',
    ta: 'பயிரை அடையாளம் காண',
  },
  next: {
    en: 'Next',
    ta: 'அடுத்து',
  },
  submit: {
    en: 'Submit',
    ta: 'சமர்ப்பி',
  },
  englishLang: {
    en: 'English',
    ta: 'ஆங்கிலம்',
  },
  tamilLang: {
    en: 'Tamil',
    ta: 'தமிழ்',
  },
  irrigationDue: {
    en: 'Irrigation Due',
    ta: 'பாசன காலம்',
  },
  fertilizerDue: {
    en: 'Fertilizer Due',
    ta: 'உரம் போடும் நாள்',
  },
  daysToHarvest: {
    en: 'Days to Harvest',
    ta: 'அறுவடைக்கு நாட்கள்',
  },
  expectedPrice: {
    en: 'Expected Price',
    ta: 'எதிர்பார்க்கப்படும் விலை',
  },
  captureImage: {
    en: 'Capture Image',
    ta: 'படம் எடுக்க'
  },
  uploadImage: {
    en: 'Upload Image',
    ta: 'படம் பதிவேற்ற'
  },
  scanCrop: {
    en: 'Scan Crop',
    ta: 'பயிரை ஸ்கேன் செய்'
  },
  viewDetails: {
    en: 'View Details',
    ta: 'விவரங்களை பார்க்க'
  },
  guideMe: {
    en: 'Guide Me For This Crop',
    ta: 'இந்த பயிருக்கு வழிகாட்டு'
  },
};

export type TranslationKey = keyof typeof translations;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations) => {
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
