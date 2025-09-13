# ⚖️ LawMate – AI Powered Legal Assistant

Lawmate is a **chat-based AI legal assistant** specializing in **Indian law**.  
It combines a **Next.js (React) frontend** with a **Flask backend** that uses **RAG (Retrieval-Augmented Generation)** to provide context-aware answers with references.

---

## 📂 Project Structure

```
lawmate/
 ┣ 📂 lawmate-frontend   # Next.js + React + Tailwind + Framer Motion
 ┗ 📂 lawmate-backend    # Flask + RAG pipeline
```

---

## ✨ Features
- 💬 Modern **chat interface** with smooth animations  
- 📚 **Legal knowledge retrieval** with references (RAG)  
- 📑 Compact & expandable **source citations**  
- ⏳ **Streaming responses** for real-time chat feel  
- 📥 **Export chat history** as `.txt`  
- 🔄 **Clear conversation** option  

---

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) (React 18)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Lucide Icons](https://lucide.dev/)

### Backend
- [Flask](https://flask.palletsprojects.com/)
- [LangChain / RAG pipeline](https://www.langchain.com/) (for retrieval & generation)
- [OpenAI / LLMs](https://platform.openai.com/) (for responses)

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Vitiantanmay/lawmate.git
cd lawmate
```

---

### 2️⃣ Backend Setup (`lawmate-backend`)
```bash
cd lawmate-backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file and add:
```
OPENAI_API_KEY=your_api_key_here
```

Run the backend:
```bash
python app.py
```

---

### 3️⃣ Frontend Setup (`lawmate-frontend`)
```bash
cd lawmate-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:5000`

---

## 🌍 Deployment

- **Frontend** → Vercel / Netlify  
- **Backend** → Render / Railway / AWS / Heroku  
- Make sure to update frontend `fetch` URL to point to deployed backend.

---

## 📜 License
MIT License © 2025
