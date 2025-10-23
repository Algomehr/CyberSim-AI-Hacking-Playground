import React from 'react';
import type { LearningModule, Language } from '../types';
import { GameMode } from '../types';
import { getRoadmap } from '../constants';
import { BrainIcon, HackerIcon, ShieldIcon, StarIcon } from './Icons';
import { getTranslations } from '../i18n';

interface SidebarProps {
  activeMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  onSelectModule: (module: LearningModule) => void;
  onStartScenario: (prompt: string, mode: GameMode) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeMode, onModeChange, onSelectModule, onStartScenario, language, onLanguageChange }) => {
  
  const t = getTranslations(language);
  const roadmap = getRoadmap(language);

  const ModeButton: React.FC<{
    mode: GameMode;
    icon: React.ReactNode;
    label: string;
  }> = ({ mode, icon, label }) => (
    <button
      onClick={() => onModeChange(mode)}
      className={`flex items-center w-full p-3 my-1 rounded-lg transition-all duration-200 ${
        activeMode === mode ? 'bg-emerald-500 text-gray-900 shadow-lg' : 'bg-gray-800 hover:bg-gray-700'
      }`}
    >
      {icon}
      <span className="ms-3 font-semibold">{label}</span>
    </button>
  );
  
  const levelColorClasses = {
    'Beginner': 'bg-green-600/50 text-green-300 border-green-500/50',
    'Intermediate': 'bg-yellow-600/50 text-yellow-300 border-yellow-500/50',
    'Advanced': 'bg-red-600/50 text-red-300 border-red-500/50',
  };

  const levelTranslations = {
    'Beginner': t.levelBeginner,
    'Intermediate': t.levelIntermediate,
    'Advanced': t.levelAdvanced,
  }

  return (
    <div className="w-1/4 max-w-sm bg-gray-900/80 backdrop-blur-sm border-e border-gray-700/50 p-4 flex flex-col h-full overflow-y-auto">
      <div className="flex items-center mb-6">
        <span className="text-2xl font-bold text-emerald-400">{t.appName}</span>
      </div>

      <div className="border-b border-gray-700 pb-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.modes}</h3>
        <ModeButton mode={GameMode.LEARN} icon={<BrainIcon className="w-6 h-6" />} label={t.learningPath} />
        <ModeButton mode={GameMode.HACKER} icon={<HackerIcon className="w-6 h-6" />} label={t.hackerMode} />
        <ModeButton mode={GameMode.DEFENDER} icon={<ShieldIcon className="w-6 h-6" />} label={t.defenderMode} />
      </div>

      <div className="flex-grow">
        {activeMode === GameMode.LEARN && (
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{t.roadmap}</h2>
            {roadmap.map((section) => (
              <div key={section.title} className="mb-6 last:mb-0">
                <h3 className="text-lg font-bold text-gray-300 mb-3 border-b border-gray-700 pb-1">{section.title}</h3>
                <div className="space-y-3">
                  {section.modules.map((module) => (
                    <div key={module.id} className="p-3 bg-gray-800 rounded-lg border border-gray-700/70 hover:border-emerald-500 transition-all duration-200">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-emerald-400 text-base flex-1">{module.title}</h4>
                        <div className="flex items-center shrink-0 space-x-2 rtl:space-x-reverse text-xs font-semibold ms-2">
                           <span className={`px-2 py-0.5 rounded-full border ${levelColorClasses[module.level]}`}>
                             {levelTranslations[module.level]}
                           </span>
                           {module.isCapstone && (
                            <span className="flex items-center px-2 py-0.5 rounded-full bg-purple-600/50 text-purple-300 border border-purple-500/50" title={t.capstone}>
                              <StarIcon className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1 mb-3">{module.description}</p>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button onClick={() => onSelectModule(module)} className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded transition-colors">
                          {t.learnConcept}
                        </button>
                        <button onClick={() => onStartScenario(module.scenarioPrompt, GameMode.LEARN)} className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1 px-3 rounded transition-colors">
                          {t.startScenario}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
          
        {(activeMode === GameMode.HACKER || activeMode === GameMode.DEFENDER) && (
          <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.scenarios}</h3>
              <div className="p-3 mb-2 bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-300">{t.newScenariosInfo}</p>
                  <button 
                    onClick={() => onStartScenario(
                        activeMode === GameMode.HACKER 
                        ? (language === 'fa' ? "یک سناریوی هک تصادفی در سطح مبتدی برای من ایجاد کن تا حل کنم. باید یک فلگ پیدا کنم. گزارش ماموریت را به من بده." : "Generate a new, random beginner-level hacking scenario for me to solve. I need to find a flag. Give me the mission briefing.")
                        : (language === 'fa' ? "یک سناریوی پاسخ به حادثه تصادفی در سطح مبتدی ایجاد کن. من مدافع هستم. گزارش اولیه حادثه را به من بده." : "Generate a new, random beginner-level incident response scenario. I am the defender. Give me the initial incident report."),
                        activeMode
                    )} 
                    className="mt-3 w-full text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    {t.startNewRandomScenario}
                  </button>
              </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex justify-around items-center bg-gray-800 rounded-lg p-1">
            <button onClick={() => onLanguageChange('en')} className={`px-4 py-1 rounded-md text-sm transition-colors ${language === 'en' ? 'bg-emerald-500 text-gray-900 font-bold' : 'text-gray-300 hover:bg-gray-700'}`}>
                EN
            </button>
            <button onClick={() => onLanguageChange('fa')} className={`px-4 py-1 rounded-md text-sm transition-colors ${language === 'fa' ? 'bg-emerald-500 text-gray-900 font-bold' : 'text-gray-300 hover:bg-gray-700'}`}>
                FA
            </button>
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">
            <span>{t.developedBy} </span>
            <a 
                href="https://mehrdad.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
                {t.developerName}
            </a>
        </div>
      </div>
    </div>
  );
};
