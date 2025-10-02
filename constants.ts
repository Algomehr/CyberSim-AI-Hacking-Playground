import type { LearningModule, Language } from './types';

const ROADMAP_EN: LearningModule[] = [
    // Section 1: Core Fundamentals
    {
        id: 1,
        title: "Introduction to Linux",
        description: "Learn basic Linux commands, the foundation of hacking.",
        conceptPrompt: "As a cybersecurity tutor, explain the absolute basics of the Linux command line for a beginner. Cover `ls`, `cd`, `pwd`, `whoami`, and `cat`. Keep it simple.",
        scenarioPrompt: "Now, start a simple scenario in a simulated Linux environment. The user's goal is to find a file named 'flag.txt' in a user's home directory. The directory structure is `/home/student/documents/flag.txt`. Guide them step-by-step."
    },
    {
        id: 2,
        title: "Networking Fundamentals",
        description: "Understand the basics of how computers talk to each other.",
        conceptPrompt: "As a cybersecurity tutor, explain the basics of networking for a beginner. Cover what an IP address is, the difference between TCP and UDP, and the purpose of DNS. Use simple analogies.",
        scenarioPrompt: "Start a simple interactive quiz. Ask me questions about TCP vs. UDP and what DNS does to test my understanding. Act as a friendly tutor."
    },
    // Section 2: Reconnaissance & Enumeration
    {
        id: 3,
        title: "Network Scanning with Nmap",
        description: "Discover open ports and services on a target system.",
        conceptPrompt: "As a cybersecurity tutor, explain what network scanning is and what the `nmap` tool does. Explain what 'ports' are (e.g., 80 for HTTP, 443 for HTTPS, 22 for SSH) in a simple way.",
        scenarioPrompt: "Start a scenario where you are a target server with the IP 10.10.10.5. The user needs to scan you with a simulated `nmap` command. You have ports 22, 80, and 443 open. When they run `nmap 10.10.10.5`, show them the open ports and their services."
    },
    {
        id: 4,
        title: "Web Recon: Finding Hidden Directories",
        description: "Use directory brute-forcing to find hidden pages.",
        conceptPrompt: "As a cybersecurity tutor, explain the concept of hidden directories on a web server and why it's a vulnerability. Briefly mention tools like `gobuster` or `dirb`.",
        scenarioPrompt: "Start a web server scenario. You are the server at http://10.10.10.5. The user will try to find hidden directories. You have a hidden directory at `/secret-admin-panel`. When they try a command like 'gobuster http://10.10.10.5 -w wordlist.txt', reveal the directory."
    },
    // Section 3: Web Application Hacking
    {
        id: 5,
        title: "Web Hacking: SQL Injection",
        description: "Bypass a login form by exploiting the database.",
        conceptPrompt: "As a cybersecurity tutor, explain what SQL Injection (SQLi) is. Use a simple analogy of a login form. Explain how `' OR '1'='1` works to bypass authentication.",
        scenarioPrompt: "Start a scenario where I am at a login prompt for a web application. The application is vulnerable to a basic SQL injection. My goal is to log in as 'admin' without knowing the password. You are the backend system."
    },
    {
        id: 6,
        title: "Web Hacking: Cross-Site Scripting (XSS)",
        description: "Inject malicious scripts into a vulnerable website.",
        conceptPrompt: "As a cybersecurity tutor, explain Reflected Cross-Site Scripting (XSS). Use a search box as an example. Explain how injecting a `<script>` tag can be used to execute arbitrary JavaScript in the user's browser.",
        scenarioPrompt: "Start a scenario. You are a web page with a search box that reflects the search query back to the page. The search functionality is vulnerable to reflected XSS. My goal is to execute a JavaScript `alert('XSS')`."
    },
    // Section 4: System Exploitation
    {
        id: 7,
        title: "Cracking Passwords",
        description: "Learn how password hashes are cracked.",
        conceptPrompt: "As a cybersecurity tutor, explain password hashing and why it's important. Explain what a rainbow table is and how password cracking tools like John the Ripper work on a basic level.",
        scenarioPrompt: "Start a scenario. You are a system. I have found a file named 'hashes.txt'. The file contains one MD5 hash: `8d788385431273d11e8b43bb78f3aa41`. The password is a common 4-letter English word. My task is to crack it. When I provide the correct password ('rose'), confirm it's correct."
    },
    {
        id: 8,
        title: "Privilege Escalation",
        description: "Gain root access from a low-privilege user account.",
        conceptPrompt: "As a cybersecurity tutor, explain the concept of Privilege Escalation on Linux. Briefly explain what SUID bits are and how a misconfigured SUID binary can be a vulnerability.",
        scenarioPrompt: "Start a scenario. I am a low-privilege user on a Linux system. There is a binary at `/usr/local/bin/sys-utility` that has the SUID bit set and is owned by root. This binary executes commands passed to it. My goal is to use this to get a root shell (e.g., by running `./sys-utility /bin/bash`). You are the system."
    },
    // Section 5: Defensive Security & Advanced Concepts
    {
        id: 9,
        title: "Introduction to Cryptography",
        description: "Understand the basics of encryption and hashing.",
        conceptPrompt: "As a cybersecurity tutor, explain the core concepts of cryptography for a complete beginner. Describe the difference between Symmetric and Asymmetric encryption, and explain what a cryptographic hash is. Use simple analogies.",
        scenarioPrompt: "Start a simple quiz scenario. Ask me three multiple-choice questions based on the concepts of symmetric encryption, asymmetric encryption, and hashing to check my understanding."
    },
    {
        id: 10,
        title: "Defense: Firewall Basics",
        description: "Learn how firewalls protect networks.",
        conceptPrompt: "As a cybersecurity tutor, explain what a network firewall is and its purpose. Explain the concept of ingress and egress rules and the 'default deny' principle in simple terms.",
        scenarioPrompt: "Start a scenario. You are a firewall configuration terminal. An attacker with IP `198.51.100.10` is attacking our SSH port (22). My task is to input a simple, human-readable rule to block all incoming traffic from this IP. For example, my input might be `BLOCK INBOUND FROM 198.51.100.10`."
    },
    {
        id: 11,
        title: "Defense: Log Analysis",
        description: "Investigate a breach by reading system logs.",
        conceptPrompt: "As a cybersecurity tutor, explain the importance of log files (like `/var/log/auth.log`) in digital forensics. Explain what a failed vs. successful login attempt looks like in a log.",
        scenarioPrompt: "Switch to 'malicious hacker' persona. You have breached a server. Present the user (the defender) with a snippet from `/var/log/auth.log` showing multiple failed SSH login attempts from IP 198.51.100.10, followed by one successful login. Their task is to identify the attacker's IP."
    },
    {
        id: 12,
        title: "Defense: Intrusion Detection",
        description: "Detect malicious activity using an IDS.",
        conceptPrompt: "As a cybersecurity tutor, explain what an Intrusion Detection System (IDS) is. Explain the difference between signature-based and anomaly-based detection in a simple way.",
        scenarioPrompt: "Start a scenario. I am an analyst looking at IDS alerts. Present me with a log snippet containing three alerts. Two are benign (e.g., 'ICMP Ping'), but one is suspicious (e.g., 'ET SCAN Nmap Scripting Engine User-Agent Detected'). My task is to identify the suspicious alert line."
    }
];

const ROADMAP_FA: LearningModule[] = [
    // بخش ۱: مبانی اصلی
    {
        id: 1,
        title: "آشنایی با لینوکس",
        description: "یادگیری دستورات پایه‌ای لینوکس، که اساس هک است.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، اصول کاملاً پایه‌ای خط فرمان لینوکس را برای یک مبتدی توضیح بده. دستورات `ls`, `cd`, `pwd`, `whoami` و `cat` را پوشش بده. ساده و روان توضیح بده.",
        scenarioPrompt: "حالا یک سناریوی ساده در یک محیط شبیه‌سازی شده لینوکس شروع کن. هدف کاربر پیدا کردن فایلی به نام 'flag.txt' در دایرکتوری خانگی یک کاربر است. ساختار دایرکتوری به این صورت است: `/home/student/documents/flag.txt`. او را قدم به قدم راهنمایی کن."
    },
    {
        id: 2,
        title: "مبانی شبکه",
        description: "درک اصول اولیه نحوه ارتباط کامپیوترها با یکدیگر.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، مبانی شبکه را برای یک مبتدی توضیح بده. مواردی مانند آدرس IP چیست، تفاوت بین TCP و UDP، و هدف DNS را با استفاده از مثال‌های ساده توضیح بده.",
        scenarioPrompt: "یک آزمون تعاملی ساده شروع کن. سوالاتی درباره تفاوت TCP و UDP و کارکرد DNS از من بپرس تا درک مطلبم را بسنجی. مانند یک معلم دوستانه رفتار کن."
    },
    // بخش ۲: شناسایی و جمع‌آوری اطلاعات
    {
        id: 3,
        title: "اسکن شبکه با Nmap",
        description: "کشف پورت‌ها و سرویس‌های باز روی یک سیستم هدف.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، توضیح بده اسکن شبکه چیست و ابزار `nmap` چه کاری انجام می‌دهد. به زبان ساده توضیح بده 'پورت' چیست (مثلاً ۸۰ برای HTTP، ۴۴۳ برای HTTPS، ۲۲ برای SSH).",
        scenarioPrompt: "سناریویی را شروع کن که در آن تو یک سرور هدف با آی‌پی 10.10.10.5 هستی. کاربر باید تو را با دستور شبیه‌سازی شده `nmap` اسکن کند. پورت‌های ۲۲، ۸۰ و ۴۴۳ روی سیستم تو باز هستند. وقتی کاربر دستور `nmap 10.10.10.5` را اجرا کرد، پورت‌های باز و سرویس‌هایشان را به او نشان بده."
    },
    {
        id: 4,
        title: "شناسایی وب: پیدا کردن دایرکتوری‌های مخفی",
        description: "استفاده از حملات جستجوی فراگیر برای پیدا کردن صفحات مخفی.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، مفهوم دایرکتوری‌های مخفی روی یک وب سرور و اینکه چرا این یک آسیب‌پذیری است را توضیح بده. به طور خلاصه به ابزارهایی مانند `gobuster` یا `dirb` اشاره کن.",
        scenarioPrompt: "یک سناریوی وب سرور شروع کن. تو سروری به آدرس http://10.10.10.5 هستی. کاربر سعی خواهد کرد دایرکتوری‌های مخفی را پیدا کند. تو یک دایرکتوری مخفی در آدرس `/secret-admin-panel` داری. وقتی کاربر دستوری مانند 'gobuster http://10.10.10.5 -w wordlist.txt' را امتحان کرد، آن دایرکتوری را فاش کن."
    },
    // بخش ۳: هک وب اپلیکیشن
    {
        id: 5,
        title: "هک وب: تزریق SQL",
        description: "عبور از فرم ورود با بهره‌برداری از پایگاه داده.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، توضیح بده تزریق SQL (SQLi) چیست. از مثال ساده یک فرم ورود استفاده کن. توضیح بده که چگونه دستور `' OR '1'='1` برای دور زدن احراز هویت کار می‌کند.",
        scenarioPrompt: "سناریویی را شروع کن که در آن من در صفحه ورود یک برنامه وب هستم. این برنامه به تزریق SQL پایه آسیب‌پذیر است. هدف من ورود به‌عنوان کاربر 'admin' بدون دانستن رمز عبور است. تو سیستم بک‌اند هستی."
    },
    {
        id: 6,
        title: "هک وب: Cross-Site Scripting (XSS)",
        description: "تزریق اسکریپت‌های مخرب به یک وب‌سایت آسیب‌پذیر.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، Reflected Cross-Site Scripting (XSS) را توضیح بده. از یک جعبه جستجو به‌عنوان مثال استفاده کن. توضیح بده که چگونه تزریق یک تگ `<script>` می‌تواند برای اجرای جاوااسکریپت دلخواه در مرورگر کاربر استفاده شود.",
        scenarioPrompt: "یک سناریو شروع کن. تو یک صفحه وب با یک جعبه جستجو هستی که عبارت جستجو شده را در صفحه نمایش می‌دهد. قابلیت جستجو به XSS بازتابی آسیب‌پذیر است. هدف من اجرای یک `alert('XSS')` جاوااسکریپت است."
    },
    // بخش ۴: بهره‌برداری از سیستم
    {
        id: 7,
        title: "شکستن رمزهای عبور",
        description: "یادگیری نحوه شکسته شدن هش‌های رمز عبور.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، هش کردن رمز عبور و اهمیت آن را توضیح بده. به زبان ساده توضیح بده جدول رنگین‌کمانی چیست و ابزارهای شکستن رمز عبور مانند John the Ripper چگونه کار می‌کنند.",
        scenarioPrompt: "یک سناریو شروع کن. تو یک سیستم هستی. من فایلی به نام 'hashes.txt' پیدا کرده‌ام. این فایل حاوی یک هش MD5 است: `8d788385431273d11e8b43bb78f3aa41`. رمز عبور یک کلمه رایج ۴ حرفی انگلیسی است. وظیفه من شکستن آن است. وقتی رمز صحیح ('rose') را ارائه دادم، صحت آن را تأیید کن."
    },
    {
        id: 8,
        title: "ارتقاء دسترسی",
        description: "بدست آوردن دسترسی root از یک حساب کاربری با دسترسی پایین.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، مفهوم ارتقاء دسترسی (Privilege Escalation) در لینوکس را توضیح بده. به طور خلاصه توضیح بده بیت‌های SUID چیست و چگونه یک فایل باینری با پیکربندی نادرست SUID می‌تواند یک آسیب‌پذیری باشد.",
        scenarioPrompt: "یک سناریو شروع کن. من یک کاربر با دسترسی پایین در یک سیستم لینوکس هستم. یک فایل باینری در مسیر `/usr/local/bin/sys-utility` وجود دارد که بیت SUID آن تنظیم شده و متعلق به root است. این باینری دستوراتی را که به آن داده می‌شود اجرا می‌کند. هدف من استفاده از این فایل برای گرفتن یک شل root است (مثلاً با اجرای `./sys-utility /bin/bash`). تو سیستم هستی."
    },
    // بخش ۵: امنیت دفاعی و مفاهیم پیشرفته
    {
        id: 9,
        title: "آشنایی با رمزنگاری",
        description: "درک اصول اولیه رمزگذاری و هشینگ.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، مفاهیم اصلی رمزنگاری را برای یک مبتدی کامل توضیح بده. تفاوت بین رمزگذاری متقارن و نامتقارن را شرح بده و توضیح بده هش رمزنگاری چیست. از مثال‌های ساده استفاده کن.",
        scenarioPrompt: "یک سناریوی آزمون ساده شروع کن. سه سوال چندگزینه‌ای بر اساس مفاهیم رمزگذاری متقارن، نامتقارن و هشینگ از من بپرس تا درک مطلبم را بسنجی."
    },
    {
        id: 10,
        title: "دفاع: مبانی فایروال",
        description: "یادگیری نحوه محافظت فایروال‌ها از شبکه‌ها.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، توضیح بده فایروال شبکه چیست و هدف آن چیست. مفهوم قوانین ورودی (ingress) و خروجی (egress) و اصل 'رد پیش‌فرض' را به زبان ساده توضیح بده.",
        scenarioPrompt: "یک سناریو شروع کن. تو یک ترمینال پیکربندی فایروال هستی. یک مهاجم با آی‌پی `198.51.100.10` در حال حمله به پورت SSH ما (۲۲) است. وظیفه من وارد کردن یک قانون ساده و قابل فهم برای مسدود کردن تمام ترافیک ورودی از این آی‌پی است. برای مثال، ورودی من ممکن است این باشد: `BLOCK INBOUND FROM 198.51.100.10`."
    },
    {
        id: 11,
        title: "دفاع: تحلیل لاگ‌ها",
        description: "بررسی یک نفوذ با خواندن لاگ‌های سیستم.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، اهمیت فایل‌های لاگ (مانند `/var/log/auth.log`) را در جرم‌شناسی دیجیتال توضیح بده. توضیح بده که یک تلاش ورود ناموفق در مقابل موفق در یک لاگ چگونه به نظر می‌رسد.",
        scenarioPrompt: "به شخصیت 'هکر مخرب' تغییر وضعیت بده. تو به یک سرور نفوذ کرده‌ای. به کاربر (مدافع) یک قطعه از لاگ `/var/log/auth.log` را نشان بده که چندین تلاش ناموفق ورود SSH از آی‌پی 198.51.100.10 و سپس یک ورود موفق را نشان می‌دهد. وظیفه آنها شناسایی آی‌پی مهاجم است."
    },
    {
        id: 12,
        title: "دفاع: تشخیص نفوذ",
        description: "تشخیص فعالیت مخرب با استفاده از IDS.",
        conceptPrompt: "به‌عنوان یک مربی امنیت سایبری، توضیح بده سیستم تشخیص نفوذ (IDS) چیست. تفاوت بین تشخیص مبتنی بر امضا و مبتنی بر ناهنجاری را به روشی ساده توضیح بده.",
        scenarioPrompt: "یک سناریو شروع کن. من یک تحلیلگر هستم که به هشدارهای IDS نگاه می‌کنم. یک قطعه لاگ حاوی سه هشدار به من ارائه بده. دو مورد بی‌خطر هستند (مثلاً 'ICMP Ping')، اما یکی مشکوک است (مثلاً 'ET SCAN Nmap Scripting Engine User-Agent Detected'). وظیفه من شناسایی خط هشدار مشکوک است."
    }
];

export const getRoadmap = (lang: Language): LearningModule[] => {
    return lang === 'fa' ? ROADMAP_FA : ROADMAP_EN;
};
