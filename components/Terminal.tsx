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
    <div className="flex-1 flex flex-col p-4 bg-gray-900/50" onClick={() => inputRef.current?.focus()}>
      <div className="flex-1 overflow-y-auto pe-4 font-mono min-h-0">
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
      <form onSubmit={handleSubmit} className="mt-4 flex items-center">
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
