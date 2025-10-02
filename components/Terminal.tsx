import React, { useState, useRef, useEffect } from 'react';
import type { TerminalLine } from '../types';
import { MessageAuthor } from '../types';
import { LoaderIcon } from './Icons';

interface TerminalProps {
  history: TerminalLine[];
  onCommand: (command: string) => void;
  isLoading: boolean;
  placeholderText: string;
  loadingText: string;
}

const TerminalOutput: React.FC<{ line: TerminalLine }> = ({ line }) => {
    const renderContent = (content: React.ReactNode) => {
        if (typeof content === 'string') {
            return content.split('\n').map((item, key) => (
                <span key={key}>
                    {item}
                    <br />
                </span>
            ));
        }
        return content;
    };
  
    switch (line.author) {
      case MessageAuthor.USER:
        return (
          <div className="flex">
            <span className="text-emerald-400 me-2">$</span>
            <p className="flex-1 whitespace-pre-wrap break-words">{line.content}</p>
          </div>
        );
      case MessageAuthor.AI:
         return <div className="whitespace-pre-wrap break-words text-gray-300">{renderContent(line.content)}</div>;
      case MessageAuthor.SYSTEM:
         return <div className="whitespace-pre-wrap break-words text-yellow-400 italic">{renderContent(line.content)}</div>;
      default:
        return null;
    }
  };

export const Terminal: React.FC<TerminalProps> = ({ history, onCommand, isLoading, placeholderText, loadingText }) => {
  const [input, setInput] = useState('');
  const endOfHistoryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800/50 rounded-lg border border-gray-700/50 shadow-2xl overflow-auto" onClick={() => inputRef.current?.focus()}>
      
      {/* Header */}
      <div className="flex items-center p-2 bg-gray-900/60 border-b border-gray-700/50 rounded-t-lg">
        <div className="flex space-x-1.5 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-1 text-center text-xs text-gray-400 uppercase tracking-widest font-semibold">
          CyberSim Terminal
        </div>
      </div>

      {/* Central Content (scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 font-mono min-h-0">
        {history.map((line, index) => (
          <TerminalOutput key={index} line={line} />
        ))}
        {isLoading && (
            <div className="flex items-center text-gray-400">
                <LoaderIcon className="w-5 h-5 animate-spin me-2" />
                <span>{loadingText}</span>
            </div>
        )}
        <div ref={endOfHistoryRef} />
      </div>

      {/* Footer (input) */}
      <form onSubmit={handleSubmit} className="flex items-center p-3 bg-gray-900/60 border-t border-gray-700/50 rounded-b-lg">
        <span className="text-emerald-400 me-2 font-mono">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent border-none text-gray-200 focus:ring-0 font-mono"
          placeholder={placeholderText}
          disabled={isLoading}
          autoComplete="off"
        />
      </form>
    </div>
  );
};