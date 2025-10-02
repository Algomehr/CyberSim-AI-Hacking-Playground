import type { ReactNode } from 'react';

export type Language = 'en' | 'fa';

export enum GameMode {
  LEARN = 'LEARN',
  HACKER = 'HACKER',
  DEFENDER = 'DEFENDER',
}

export enum MessageAuthor {
    USER = 'USER',
    AI = 'AI',
    SYSTEM = 'SYSTEM',
}

export interface TerminalLine {
    author: MessageAuthor;
    content: ReactNode;
}

export interface LearningModule {
    id: number;
    title: string;
    description: string;
    conceptPrompt: string;
    scenarioPrompt: string;
}