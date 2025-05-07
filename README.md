# 🧊 Chill-o-Meter

Chill-o-Meter is a fun and intuitive AI-powered tool that helps you rephrase messages based on how “chill” or “formal” you want to sound. It uses a local large language model (Mistral via Ollama) to generate personalized rewrites.

---

## ✨ Features

- 🎛️ Tone control with a smooth slider  
- 🤖 Local AI using Ollama + Mistral  
- 🔄 History of inputs and responses  
- ⚡ Fast with local caching  
- 💻 Fully responsive UI  

---

## 📦 Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS, Radix UI  
- **Backend**: Node.js API routes  
- **AI**: Mistral (via [Ollama](https://ollama.com/))  
- **Utilities**: Streaming, Rate Limiting, Caching  

---

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chill-o-meter.git
cd chill-o-meter
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Install Ollama (Local LLM Runner)

#### macOS (Homebrew)

```bash
brew install ollama
```

#### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

#### Windows

Download installer from: https://ollama.com/download

---

### 4. Pull & Run Mistral Model

```bash
ollama pull mistral
ollama run mistral
```

> ✅ This starts a local AI server at `http://localhost:11434`

> ⚠️ **Minimum RAM required:** 6 GB. If you're getting memory errors,


---

### 5. Start the App

```bash
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Example

You can test the POST API using `curl`:

```bash
curl -X POST http://localhost:3000/api/post \
  -H "Content-Type: application/json" \
  -d '{"content": "Let\'s grab coffee tomorrow", "tone": 2}'
```

---

## 🧠 File Structure

```
/app
  /api/post/route.js      → POST handler (calls Mistral)
  /page.js                → Main UI
/components            → FormSlider, Loader, UI components
/utils/
  cache.js                → Response caching
  handleStreamChunk.js    → Streamed response processing
/public/                  → Assets
```

---

## 🐛 Troubleshooting

- **Error:** `model requires more system memory`  
  ➤ Use a lighter model like `llama2`.

- **No response in UI?**  
  ➤ Ensure `ollama run mistral` is active and terminal is running.

- **Still stuck?**  
  ➤ Add `console.log(error)` in `catch` blocks for debugging.

---

## 📜 License

MIT © 2025 Chill-o-Meter

---

## 🙌 Credits

Built with 💛 using [Ollama](https://ollama.com), [Radix UI](https://www.radix-ui.com/), and [Next.js](https://nextjs.org/)
