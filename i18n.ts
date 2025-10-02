import type { Language } from './types';

export const translations = {
  en: {
    appName: "CyberSim AI",
    modes: "Modes",
    learningPath: "Learning Path",
    hackerMode: "Hacker Mode",
    defenderMode: "Defender Mode",
    roadmap: "Roadmap",
    scenarios: "Scenarios",
    learnConcept: "Learn Concept",
    startScenario: "Start Scenario",
    newScenariosInfo: "New scenarios will challenge your skills. Start one below.",
    startNewRandomScenario: "Start New Random Scenario",
    welcomeMessage: "Welcome to CyberSim AI! Choose a mode from the sidebar. 'Learning Path' is recommended for beginners.",
    switchedToLearn: "Switched to Learning Mode. Select a module from the roadmap to begin.",
    switchedToHacker: "Switched to Hacker Mode. You are the attacker. Start a new scenario to receive your mission briefing.",
    switchedToDefender: "Switched to Defender Mode. You are the investigator. Start a new scenario to get the incident report.",
    terminalPlaceholder: "Enter your command here...",
    aiThinking: "AI is thinking...",
    startingScenario: "Starting",
  },
  fa: {
    appName: "سایبرسیم",
    modes: "حالت‌ها",
    learningPath: "مسیر یادگیری",
    hackerMode: "حالت هکر",
    defenderMode: "حالت مدافع",
    roadmap: "نقشه راه",
    scenarios: "سناریوها",
    learnConcept: "یادگیری مفهوم",
    startScenario: "شروع سناریو",
    newScenariosInfo: "سناریوهای جدید مهارت‌های شما را به چالش می‌کشند. یکی را در زیر شروع کنید.",
    startNewRandomScenario: "شروع سناریوی تصادفی جدید",
    welcomeMessage: "به سایبرسیم خوش آمدید! یک حالت را از نوار کناری انتخاب کنید. «مسیر یادگیری» برای مبتدیان توصیه می‌شود.",
    switchedToLearn: "به حالت یادگیری تغییر یافت. برای شروع، یک ماژول از نقشه راه انتخاب کنید.",
    switchedToHacker: "به حالت هکر تغییر یافت. شما مهاجم هستید. برای دریافت گزارش ماموریت، یک سناریوی جدید شروع کنید.",
    switchedToDefender: "به حالت مدافع تغییر یافت. شما بازرس هستید. برای دریافت گزارش حادثه، یک سناریوی جدید شروع کنید.",
    terminalPlaceholder: "دستور خود را اینجا وارد کنید...",
    aiThinking: "هوش مصنوعی در حال فکر کردن است...",
    startingScenario: "در حال شروع",
  }
};

export const getTranslations = (lang: Language) => translations[lang];