import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    menu: 'Menu',
    specials: 'Specials & Thalis',
    contact: 'Contact',
    
    // Hero section
    welcome: 'Welcome to',
    restaurantName: 'Naivedya Lunch Home',
    heroSubtitle: 'Authentic Maharashtrian flavors served with love',
    orderNow: 'Order Now',
    viewMenu: 'View Menu',
    
    // Menu section
    searchPlaceholder: 'Search dishes...',
    filterAll: 'All',
    filterVeg: 'Veg 🌱',
    filterNonVeg: 'Non-Veg 🍗',
    fullPlate: 'Full',
    halfPlate: 'Half',
    
    // Contact section
    contactTitle: 'Contact & Order',
    callToOrder: 'Call to Order',
    orderOnline: 'Order Online',
    address: 'Address',
    
    // Common
    price: '₹',
    perKg: 'per kg'
  },
  mr: {
    // Navigation
    home: 'मुख्यपृष्ठ',
    menu: 'मेनू',
    specials: 'स्पेशल आणि थाळी',
    contact: 'संपर्क',
    
    // Hero section
    welcome: 'स्वागत आहे',
    restaurantName: 'नैवेद्य लंच होम',
    heroSubtitle: 'प्रेमाने सर्व्ह केलेले अस्सल महाराष्ट्रीयन स्वाद',
    orderNow: 'आता ऑर्डर करा',
    viewMenu: 'मेनू पहा',
    
    // Menu section
    searchPlaceholder: 'पदार्थ शोधा...',
    filterAll: 'सर्व',
    filterVeg: 'शाकाहारी 🌱',
    filterNonVeg: 'मांसाहारी 🍗',
    fullPlate: 'फुल',
    halfPlate: 'हाफ',
    
    // Contact section
    contactTitle: 'संपर्क आणि ऑर्डर',
    callToOrder: 'ऑर्डरसाठी कॉल करा',
    orderOnline: 'ऑनलाइन ऑर्डर करा',
    address: 'पत्ता',
    
    // Common
    price: '₹',
    perKg: 'प्रति किलो'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('restaurant-language');
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('restaurant-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
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