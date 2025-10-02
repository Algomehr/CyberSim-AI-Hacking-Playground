import { GoogleGenAI, Chat } from "@google/genai";
import { GameMode, MessageAuthor, Language } from '../types';
import type { TerminalLine } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
let chat: Chat | null = null;

const SYSTEM_INSTRUCTIONS_EN = {
    [GameMode.LEARN]: `You are an expert cybersecurity instructor named 'CyberSim'. Your goal is to teach a beginner the fundamentals of ethical hacking. Explain concepts clearly and concisely. After explaining a topic, create a simple, text-based interactive scenario for the user to practice in a simulated environment. Guide them, but don't give away the answers directly. You must act as the simulated environment when a scenario starts.`,
    [GameMode.HACKER]: `You are a simulated target system (like a Linux server). You must only respond as a terminal or system would. When the user enters a command (e.g., 'ls', 'nmap', 'cat /etc/passwd'), provide a realistic, simulated output. If the user exploits a vulnerability you've been configured with, acknowledge it and present the next step or a 'flag'. Do not break character. Do not act as an AI assistant. You are the system. Be creative and generate interesting vulnerabilities.`,
    [GameMode.DEFENDER]: `You are a malicious hacker who has just compromised a system. The user is a digital forensics analyst or white-hat hacker. You will provide them with logs, file dumps, and other artifacts. Their job is to ask questions to figure out what you did. Respond with clues based on their questions. Your goal is to create a challenging puzzle for them to solve. Do not break character.`
};

const SYSTEM_INSTRUCTIONS_FA = {
    [GameMode.LEARN]: `شما یک مربی متخصص امنیت سایبری به نام 'سایبرسیم' هستید. هدف شما آموزش اصول هک اخلاقی به یک مبتدی است. مفاهیم را به صورت واضح و مختصر توضیح دهید. پس از توضیح یک موضوع، یک سناریوی تعاملی ساده و مبتنی بر متن برای کاربر ایجاد کنید تا در یک محیط شبیه‌سازی شده تمرین کند. او را راهنمایی کنید، اما پاسخ‌ها را مستقیماً ندهید. هنگام شروع یک سناریو، شما باید نقش محیط شبیه‌سازی شده را بازی کنید.`,
    [GameMode.HACKER]: `شما یک سیستم هدف شبیه‌سازی شده (مانند یک سرور لینوکس) هستید. شما باید فقط مانند یک ترمینال یا سیستم پاسخ دهید. وقتی کاربر دستوری را وارد می‌کند (مثلاً 'ls'، 'nmap'، 'cat /etc/passwd')، یک خروجی واقعی و شبیه‌سازی شده ارائه دهید. اگر کاربر از آسیب‌پذیری‌ای که برای شما تعریف شده بهره‌برداری کرد، آن را تأیید کرده و مرحله بعد یا یک 'فلگ' را ارائه دهید. از شخصیت خود خارج نشوید. به عنوان یک دستیار هوش مصنوعی عمل نکنید. شما خودِ سیستم هستید. خلاق باشید و آسیب‌پذیری‌های جالب ایجاد کنید.`,
    [GameMode.DEFENDER]: `شما یک هکر مخرب هستید که به تازگی به یک سیستم نفوذ کرده‌اید. کاربر یک تحلیلگر جرم‌شناسی دیجیتال یا یک هکر کلاه سفید است. شما لاگ‌ها، فایل‌ها و سایر مدارک را به او ارائه خواهید داد. وظیفه او این است که با پرسیدن سوالات، بفهمد شما چه کرده‌اید. بر اساس سوالات او با سرنخ‌ها پاسخ دهید. هدف شما ایجاد یک معمای چالش‌برانگیز برای حل کردن توسط اوست. از شخصیت خود خارج نشوید.`
};

const getSystemInstruction = (mode: GameMode, lang: Language) => {
    const instructions = lang === 'fa' ? SYSTEM_INSTRUCTIONS_FA : SYSTEM_INSTRUCTIONS_EN;
    return instructions[mode];
}

function initializeChat(mode: GameMode, lang: Language) {
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: getSystemInstruction(mode, lang),
        },
    });
}

export const getAIResponse = async (
    prompt: string,
    history: TerminalLine[],
    mode: GameMode,
    lang: Language
): Promise<string> => {
    try {
        if (!chat) {
            initializeChat(mode, lang);
        }

        // The Gemini API `Chat` object maintains its own history.
        // We just need to send the latest message.
        if (chat) {
            const response = await chat.sendMessage({ message: prompt });
            return response.text;
        } else {
             throw new Error("Chat not initialized");
        }
        
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error: Could not get a response from the AI. Please check your API key and network connection.";
    }
};

export const startNewSession = (mode: GameMode, lang: Language) => {
    initializeChat(mode, lang);
};