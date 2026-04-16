"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.tools": "Tools",
    "nav.dashboard": "Dashboard",
    "nav.admin": "Admin",
    "nav.login": "Login",
    "home.hero.title": "Secure Your Digital Realm",
    "home.hero.subtitle": "Cyber-Sphere provides futuristic AI-driven defense mechanisms for a safer tomorrow.",
    "tools.fakeMessage": "Fake Message Detection",
    "tools.linkScanner": "Malicious Link Scanner",
    "tools.passwordChecker": "Password Strength",
    "tools.deepfakeVerifier": "Deepfake Verifier",
    "tools.malwareScanner": "File Malware Scanner",
    "tools.qrScanner": "QR Security Scanner",
    "tools.portScanner": "Port Scanner",
    "emergency.button": "PANIC",
    "emergency.alert": "Emergency Protocol Activated! Authorities and security teams notified.",
    "footer.rights": "© 2024 Cyber-Sphere. All Rights Reserved."
  },
  hi: {
    "nav.home": "होम",
    "nav.tools": "टूल्स",
    "nav.dashboard": "डैशबोर्ड",
    "nav.admin": "एडमिन",
    "nav.login": "लॉगिन",
    "home.hero.title": "अपने डिजिटल साम्राज्य को सुरक्षित करें",
    "home.hero.subtitle": "साइबर-स्फेयर कल के सुरक्षित भविष्य के लिए भविष्य के AI-संचालित रक्षा तंत्र प्रदान करता है।",
    "tools.fakeMessage": "नकली संदेश का पता लगाना",
    "tools.linkScanner": "दुर्भावनापूर्ण लिंक स्कैनर",
    "tools.passwordChecker": "पासवर्ड की मजबूती",
    "tools.deepfakeVerifier": "डीपफेक सत्यापनकर्ता",
    "tools.malwareScanner": "फ़ाइल मैलवेयर स्कैनर",
    "tools.qrScanner": "QR सुरक्षा स्कैनर",
    "tools.portScanner": "पोर्ट स्कैनर",
    "emergency.button": "पैनिक",
    "emergency.alert": "आपातकालीन प्रोटोकॉल सक्रिय! अधिकारियों और सुरक्षा टीमों को सूचित किया गया।",
    "footer.rights": "© 2024 साइबर-स्फेयर। सर्वाधिकार सुरक्षित।"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}