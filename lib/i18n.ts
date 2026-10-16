import type { Language } from "./LanguageContext";

interface Strings {
  brand: string;
  tagline: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  step1: string;
  step2: string;
  uploadCta: string;
  uploadHint: string;
  notesPlaceholder: string;
  diagnose: string;
  analyzing: string;
  emptyTitle: string;
  emptySubtitle: string;
  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  chatThinking: string;
  chatExamples: string[];
  footerDisclaimer: string;
  footerLicense: string;
}

export const translations: Record<Language, Strings> = {
  en: {
    brand: "AgriAegis",
    tagline: "Multilingual crop advisor",
    heroTitle: "See the crop. Speak your language. Protect the harvest.",
    heroHighlight: "Speak your language.",
    heroSubtitle:
      "Upload a photo of an affected crop and get a structured diagnosis with organic and chemical remedies, dosage per bigha, and the reasoning behind every recommendation.",
    step1: "1. Upload crop photo",
    step2: "2. Notes (optional)",
    uploadCta: "Snap or upload a crop photo",
    uploadHint: "JPG, PNG, or HEIC",
    notesPlaceholder: "Describe the symptoms, crop variety, or paste vernacular text…",
    diagnose: "Diagnose Crop",
    analyzing: "Analyzing crop… (60–90s)",
    emptyTitle: "Your diagnosis will appear here",
    emptySubtitle:
      "Upload a crop photo and click Diagnose to see the structured prescription with reasoning steps.",
    chatTitle: "Ask a follow-up question",
    chatSubtitle: "Chat with the AgriAegis advisor in your chosen language",
    chatPlaceholder: "Type your question…",
    chatThinking: "Thinking…",
    chatExamples: [
      "When should I irrigate wheat?",
      "How to prevent stem borer in paddy?",
      "Which fertiliser for sugarcane?",
    ],
    footerDisclaimer:
      "Informational guidance only. Confirm with a local agricultural specialist.",
    footerLicense: "MIT License · Open source",
  },
  hi: {
    brand: "एग्रीईजिस",
    tagline: "बहुभाषी फसल सलाहकार",
    heroTitle: "फसल देखें। अपनी भाषा में बोलें। उपज बचाएँ।",
    heroHighlight: "अपनी भाषा में बोलें।",
    heroSubtitle:
      "प्रभावित फसल की फोटो अपलोड करें और जैविक व रासायनिक उपचार, प्रति बीघा मात्रा, और हर सिफारिश के पीछे का कारण सहित संरचित निदान प्राप्त करें।",
    step1: "1. फसल की फोटो अपलोड करें",
    step2: "2. टिप्पणी (वैकल्पिक)",
    uploadCta: "फसल की फोटो खींचें या अपलोड करें",
    uploadHint: "JPG, PNG, या HEIC",
    notesPlaceholder: "लक्षण, फसल की किस्म, या स्थानीय भाषा का पाठ लिखें…",
    diagnose: "फसल का निदान करें",
    analyzing: "फसल का विश्लेषण हो रहा है… (60–90 सेकंड)",
    emptyTitle: "आपका निदान यहाँ दिखाई देगा",
    emptySubtitle:
      "फसल की फोटो अपलोड करें और निदान बटन दबाएँ।",
    chatTitle: "आगे कोई प्रश्न पूछें",
    chatSubtitle: "अपनी चुनी हुई भाषा में एग्रीईजिस सलाहकार से बात करें",
    chatPlaceholder: "अपना प्रश्न लिखें…",
    chatThinking: "सोच रहे हैं…",
    chatExamples: [
      "गेहूं की सिंचाई कब करें?",
      "धान में तना छेदक कैसे रोकें?",
      "गन्ने के लिए कौन सी खाद?",
    ],
    footerDisclaimer:
      "केवल सूचनात्मक मार्गदर्शन। किसी स्थानीय कृषि विशेषज्ञ से पुष्टि करें।",
    footerLicense: "MIT लाइसेंस · ओपन सोर्स",
  },
  awa: {
    brand: "एग्रीईजिस",
    tagline: "बहुभाषी फसल सलाहकार",
    heroTitle: "फसल देखीं। अपनी भाषा में बोलीं। उपज बचाईं।",
    heroHighlight: "अपनी भाषा में बोलीं।",
    heroSubtitle:
      "प्रभावित फसल कय फोटो अपलोड करीं अउर जैविक अउर रासायनिक इलाज, प्रति बीघा मात्रा सहित संरचित निदान पाईं।",
    step1: "1. फसल कय फोटो अपलोड करीं",
    step2: "2. टिप्पणी (वैकल्पिक)",
    uploadCta: "फसल कय फोटो खींचीं या अपलोड करीं",
    uploadHint: "JPG, PNG, या HEIC",
    notesPlaceholder: "लक्षण, फसल कय किस्म, या स्थानीय भाषा कय पाठ लिखीं…",
    diagnose: "फसल कय निदान करीं",
    analyzing: "फसल कय विश्लेषण हो रहा है… (60–90 सेकंड)",
    emptyTitle: "आप कय निदान इहाँ देखाई दीही",
    emptySubtitle: "फसल कय फोटो अपलोड करीं अउर निदान बटन दबाईं।",
    chatTitle: "आगे कवनो सवाल पूछीं",
    chatSubtitle: "अपनी चुनी हुई भाषा में एग्रीईजिस सलाहकार से बात करीं",
    chatPlaceholder: "अपना सवाल लिखीं…",
    chatThinking: "सोचत बानी…",
    chatExamples: [
      "गेहूं कय सिंचाई कब करीं?",
      "धान में तना छेदक कइसे रोकीं?",
      "गन्ना खातिर कवन खाद?",
    ],
    footerDisclaimer:
      "खाली सूचनात्मक मार्गदर्शन। कवनो स्थानीय कृषि विशेषज्ञ से पुष्टि करीं।",
    footerLicense: "MIT लाइसेंस · ओपन सोर्स",
  },
};

export function t(language: Language): Strings {
  return translations[language] ?? translations.hi;
}