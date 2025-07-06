# 🎙️ OraMind - AI Voice Agent

![OraMind Logo](public/icon.jpg)

> **Speak. Learn. Grow.**  
> A powerful voice-based AI assistant built with modern technologies to enhance your skills, learn deeply, and get instant feedback with real-time conversation.

---

## 🔥 Live Demo

🧠 Talk to AI, get feedback, and level up your communication!

---

## 🛠️ Tech Stack

| Technology | Logo | Description |
|------------|------|-------------|
| **Next.js** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="24"/> | React framework for full-stack web apps |
| **Convex.dev** | <img src="https://avatars.githubusercontent.com/u/87401465?s=24" width="24"/> | Backend & real-time database |
| **Tailwind CSS** | <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" width="24"/> | Utility-first CSS styling |
| **Google STT (Speech-to-Text)** | <img src="https://img.icons8.com/color/48/google-logo.png" width="24"/> | Converts voice to text in real-time |
| **Amazon Polly** | <img src="https://img.icons8.com/ios/50/aws.png" width="24"/> | Text-to-speech (TTS) voice playback |
| **OpenAI via OpenRouter** | <img src="https://avatars.githubusercontent.com/u/61843385?s=24" width="24"/> | Conversational AI responses |
| **Framer Motion** | <img src="https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png" width="24"/> | Animations & transitions |
| **Sonner Toast** | 🔔 | Modern toast notification system |
| **HTML/CSS/JS** | 🌐 | Core web development languages |

---

## 🚀 Features

### 🎧 Real-Time Voice Conversation
- Users can **speak to the AI**, and the app uses **Google Speech-to-Text** to transcribe it.
- AI replies using **OpenAI (via OpenRouter)** with intelligent conversation flow.
- Voice output is played back using **Amazon Polly** (Text-to-Speech).

### 🤖 AI Coaching & Chat
- Choose an **expert avatar** based on topic or style.
- Get real-time responses and **AI-generated coaching**.

### 📝 Summary & Feedback Generation
- After conversation ends, generate **smart summaries** and **personalized feedback**.
- Feedback includes chat review, suggestions, and learning tips.

### 👤 Profile Management
- Upload profile photo, view user info.
- Data is synced with **Convex.dev database**.

### 🔒 Authentication
- Secure sign-up/sign-in.
- Sessions are stored locally for persistent login.

---

## 🎯 Future Improvements

- 🎤 Multi-language support
- 🗓️ Schedule coaching sessions
- 📱 Mobile-first PWA

---

## ✨ Thank You

> OraMind is built with ❤️ to help you grow, communicate confidently, and reflect on your conversations.

Feel free to ⭐ the repo if you found this helpful!

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 🚦 How to Run Locally

### 🔧 1. Clone the Repository

git clone https://github.com/your-username/oramind-ai-app.git
cd oramind-ai-app

### 💻 2. Install Dependencies

npm install

### ▶️ 3. Run the Frontend

npm run dev

### 🧠 4. Run Convex (Backend)

npx convex dev

### ⚙️ 3. Set up Environment Variables

Create a .env.local file and add your keys:

NEXT_PUBLIC_CONVEX_URL=https://your-convex-instance.convex.cloud
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-key
NEXT_PUBLIC_POLLY_REGION=your-region
NEXT_PUBLIC_POLLY_ACCESS_KEY=your-access-key
NEXT_PUBLIC_POLLY_SECRET_KEY=your-secret
NEXT_PUBLIC_GOOGLE_STT_API_KEY=your-google-key
