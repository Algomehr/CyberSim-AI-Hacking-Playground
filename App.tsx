import React, { useState, useEffect, useCallback } from 'react';
import type { TerminalLine, LearningModule, Language } from './types';
import { GameMode, MessageAuthor } from './types';
import { Sidebar } from './components/Sidebar';
import { Terminal } from './components/Terminal';
import { getAIResponse, startNewSession } from './services/geminiService';
import { getTranslations } from './i18n';

const App: React.FC = () => {
    const [mode, setMode] = useState<GameMode>(GameMode.LEARN);
    const [language, setLanguage] = useState<Language>('en');
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const t = getTranslations(language);

    useEffect(() => {
        const dir = language === 'fa' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
    }, [language]);

    useEffect(() => {
        setHistory([{ author: MessageAuthor.SYSTEM, content: t.welcomeMessage }]);
        startNewSession(GameMode.LEARN, language);
    }, [language]); // Re-initialize when language changes

    const handleLanguageChange = (newLang: Language) => {
        if (newLang !== language) {
            setLanguage(newLang);
        }
    };
    
    const handleModeChange = (newMode: GameMode) => {
        setMode(newMode);
        let message = '';
        switch(newMode) {
            case GameMode.LEARN:
                message = t.switchedToLearn;
                break;
            case GameMode.HACKER:
                message = t.switchedToHacker;
                break;
            case GameMode.DEFENDER:
                message = t.switchedToDefender;
                break;
        }
        setHistory([{ author: MessageAuthor.SYSTEM, content: message }]);
        startNewSession(newMode, language);
    };

    const sendPromptToAI = useCallback(async (prompt: string, isUserCommand: boolean) => {
        const currentHistory = (prev: TerminalLine[]) => {
            if (isUserCommand) {
                return [...prev, { author: MessageAuthor.USER, content: prompt }];
            }
            return [...prev, { author: MessageAuthor.SYSTEM, content: `${t.startingScenario}: ${prompt.substring(0, 100)}...` }];
        };
        setHistory(currentHistory);
        
        setIsLoading(true);
        try {
            // Pass the latest history for context if needed by the service, though Gemini's Chat manages it internally.
            const response = await getAIResponse(prompt, history, mode, language);
            setHistory(prev => [...prev, { author: MessageAuthor.AI, content: response }]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setHistory(prev => [...prev, { author: MessageAuthor.SYSTEM, content: `Error: ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    }, [history, mode, language, t.startingScenario]);

    const handleCommand = (command: string) => {
        sendPromptToAI(command, true);
    };
    
    const handleSelectModule = (module: LearningModule) => {
        setHistory([]);
        sendPromptToAI(module.conceptPrompt, false);
    };

    const handleStartScenario = (prompt: string, scenarioMode: GameMode) => {
        // We create a fresh history for new scenarios
        const startNew = () => {
            setHistory([]);
            sendPromptToAI(prompt, false);
        }

        if(mode !== scenarioMode) {
           setMode(scenarioMode);
           startNewSession(scenarioMode, language);
           // Brief delay to ensure state update before sending prompt
           setTimeout(startNew, 50);
        } else {
           startNew();
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <Sidebar 
              activeMode={mode} 
              onModeChange={handleModeChange} 
              onSelectModule={handleSelectModule}
              onStartScenario={handleStartScenario}
              language={language}
              onLanguageChange={handleLanguageChange}
            />
            <main className="flex-1 flex flex-col p-4 overflow-hidden">
                <Terminal 
                  history={history} 
                  onCommand={handleCommand} 
                  isLoading={isLoading} 
                  placeholderText={t.terminalPlaceholder}
                  loadingText={t.aiThinking}
                />
            </main>
        </div>
    );
};

export default App;