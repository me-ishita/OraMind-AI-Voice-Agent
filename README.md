<p align="center">
  <img src="public/icon.jpg" alt="OraMind Logo" width="60" style="border-radius: 12px; margin-right: 12px;" />
  <h1 align="center">#  **OraMind – AI Voice Agent** </h1>
</p>

> **Speak. Learn. Grow.**  
> A powerful voice-based AI assistant built with modern technologies to enhance your skills, learn deeply, and get instant feedback with real-time conversation.

---

## 🔥 Live Demo

🧠 Talk to AI, get feedback, and level up your communication!

---

## 🛠️ Tech Stack

| Technology                                  | Role/Usage                                      |
|--------------------------------------------|--------------------------------------------------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | Full-stack framework                         |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Styling and responsiveness                   |
| ![Convex](https://img.shields.io/badge/Convex.dev-2E2B4F?style=flat&logo=data&logoColor=white) | Serverless DB & Realtime Functions           |
| ![Google Cloud](https://img.shields.io/badge/Google_Cloud_STT-4285F4?style=flat&logo=google-cloud&logoColor=white) | Real-time Speech-to-Text                     |
| ![Amazon Polly](https://img.shields.io/badge/Amazon_Polly-FF9900?style=flat&logo=amazon-aws&logoColor=white) | AI-generated voice responses (Text-to-Speech)|
| ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white) | AI chat assistant using GPT models           |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF017C?style=flat&logo=framer&logoColor=white) | UI interactivity and animation              |
| ![Toast / Sonner](https://img.shields.io/badge/Toast_Notifications-000000?style=flat&logo=react&logoColor=white) | Feedback notifications                       |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Core front-end |


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
