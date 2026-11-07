export const PROJECTS = [
    {
      name: 'repobrain',
      topic: 'ai',
      date: '2026-10-22',
      stack: 'Python, FastAPI, FalkorDB, MCP, Ollama, React, TypeScript, Vite',
      content: `# RepoBrain

> Evidence-backed codebase intelligence · Python, FastAPI, FalkorDB, MCP

RepoBrain ingests a public Python repository into a snapshot-scoped knowledge graph, then answers engineering questions with traceable evidence.

## What it does

- **Grounded codebase Q&A:** Routes questions through typed, read-only graph tools and returns evidence with source URLs and snapshot context.
- **Engineering workflows:** Trace file history, static dependency impact, reviewer activity, and design decisions from repository data.
- **Interactive exploration:** Pair answer summaries and source evidence with a graph explorer in a React and Vite interface.
- **Tenant-isolated memory:** Save findings and recall them with semantic and lexical search, including snapshot freshness details.

## Technical approach

- Stores repository snapshots, commits, files, contributors, and relationships in FalkorDB.
- Uses FastAPI and an MCP gateway to keep graph access typed, read-only, and inspectable.
- Uses local Ollama models for answer generation and memory embeddings, with deterministic evidence summaries when a model is unavailable.
- Separates graph-backed facts from model interpretation and surfaces missing evidence and uncertainty.

[GitHub repository](https://github.com/Vish212121/RepoBrain)`
    },
    {
      name: 'write-it-correct',
      topic: 'ai',
      date: '2026-10-22',
      stack: 'JavaScript, Manifest V3, Browser APIs, Groq',
      content: `# write it correct

> In-editor proofreading and rewriting · JavaScript, Manifest V3, Groq

A browser extension that helps people proofread and rewrite text directly in supported web editors, without moving it into a separate app.

## Writing tools

- **Check while typing:** Find spelling, grammar, punctuation, clarity, and style issues after a short pause.
- **Fix:** Apply minimal corrections while preserving unaffected text, spacing, and paragraph breaks.
- **Rewrite:** Improve, shorten, or shift selected text to a formal or casual tone while preserving its meaning.
- **Selection actions:** Use the selection toolbar or browser context menu to work on highlighted text.

## Safety and privacy

- Validates suggestions against the current source text and rejects stale, overlapping, malformed, or overly broad corrections.
- Stores the Groq API key in local browser extension storage; requests go directly from the extension background worker to Groq, without a project server.
- Sends text to Groq only when a live check or requested writing action runs. Live checks can be disabled in Settings.

## Browser support

Manifest V3 builds are provided for Chromium browsers and Firefox. The content script supports inputs, textareas, regular contenteditable editors, open shadow roots, and supported frames. Canvas editors, closed shadow roots, and protected browser pages are outside its access.

[GitHub repository](https://github.com/Vish212121/write-it-correct)`
    },
    {
      name: 'codecollab',
      topic: 'web',
      date: '2025-07-15',
      stack: 'React, Node.js, Express, Socket.io, Docker, Yjs',
      content: `# CodeCollab\n\n> Real-time collaborative coding environment · React, Node.js, Docker · 2025\n\nA real-time collaborative coding environment built for technical interviews, featuring shared code editing, live video, and server-side code execution.\n\n## Architecture & Features\n\n- **Real-time Sync:** Implemented shared code editing using Yjs for state synchronization, studying Operational Transformation (OT) and CRDT algorithms to resolve conflicting keystrokes.\n- **Scalable Backend:** Implemented Domain-Driven Design (DDD) architecture with Redis-backed WebSocket adapters for multi-instance scaling.\n- **Security:** Integrated JWT-based session protection for secure interview environments.\n- **Execution:** Server-side code execution pipeline for real-time testing.\n\n## Tech Stack\n\n- **Frontend:** React.js\n- **Backend:** Node.js, Express, Socket.io\n- **Infrastructure:** Docker, Redis`
    },
    {
      name: 'financial-news-sentiment',
      topic: 'ai',
      date: '2025-02-10',
      stack: 'Python, TensorFlow, Keras, NLTK, GloVe',
      content: `# Financial News Sentiment Classifier\n\n> NLP & Deep Learning · Python, TensorFlow, Keras, GloVe · 2025\n\nAn end-to-end NLP pipeline that processes large corpora of financial headlines to classify sentiment, correlating signals with real stock price trends.\n\n## Architecture\n\n\`\`\`python\n# Pipeline: headline -> regex clean -> tokenize -> GloVe (300d) embed -> CNN + BiLSTM -> sentiment\nmodel = Sequential([\n    Embedding(vocab_size, 300, weights=[glove_matrix], input_length=maxlen),\n    Conv1D(64, 5, activation='relu'),\n    Bidirectional(LSTM(64)),\n    Dense(3, activation='softmax')  # positive / neutral / negative\n])\n\`\`\`\n\n## Key Outcomes\n\n- **Data Processing:** Optimized regex-based text cleaning, stopword removal, tokenization, and sequence padding for high-throughput vectorization.\n- **Model Performance:** Achieved an AUC of 0.80 on held-out test data.\n- **EDA & Evaluation:** Conducted comprehensive EDA using n-gram analysis and text length distributions, leveraging confusion matrices and ROC curves to evaluate model performance.`
    },
    {
      name: 'real-estate-platform',
      topic: 'web',
      date: '2024-11-22',
      stack: 'Next.js, Python, GROQ, Sanity CMS, MySQL, OAuth',
      content: `# Real Estate Platform\n\n> End-to-End Web Application · Next.js, Python, GROQ · 2024\n\nA full-stack, multi-tiered web application with a React/Next.js frontend, headless Sanity CMS backend, and Python-based ML microservices for rent and sale price prediction.\n\n## Architecture\n\n\`\`\`\n┌──────────────┐    REST    ┌──────────────┐    GROQ    ┌─────────────┐\n│  Next.js UI  │ ─────────► │  API Routes  │ ────────►  │  Sanity CMS │\n└──────────────┘            └──────────────┘            └─────────────┘\n                                    │\n                                    ▼  REST\n                            ┌──────────────┐\n                            │  Python ML   │  ← price prediction\n                            │  microservice│\n                            └──────────────┘\n\`\`\`\n\n## Features\n\n- **Location-based property search** with relational database schemas backing filters.\n- **Google OAuth authentication** for secure user sessions.\n- **Dynamic listing management** at scale via headless CMS.\n- **ML price prediction** microservice for rent and sale estimates.`
    },
    {
      name: 'rag-predictive-maintenance',
      topic: 'ai',
      date: '2025-04-05',
      stack: 'Python, TensorFlow, Keras, FAISS, Streamlit',
      content: `# RAG-Enabled Predictive Maintenance\n\n> AI-driven troubleshooting assistant · Python, TensorFlow, FAISS, Streamlit · 2025\n\nAn AI-driven predictive maintenance pipeline that processes continuous OBD-II telemetry to forecast Remaining Useful Life (RUL) and uses RAG to eliminate LLM hallucinations.\n\n## How It Works\n\n\`\`\`python\n# 1. Process OBD-II telemetry with 2-layer LSTM\n# 2. Apply rolling window features to denoise volatile sensor data\n# 3. Chunk OEM service manuals using Hugging Face embeddings\n# 4. Store in FAISS vector database to enforce strict metadata citations\n\ndef diagnose(sensor_reading):\n    relevant = faiss_db.search(embed(sensor_reading), k=5)\n    prompt = build_prompt(sensor_reading, relevant)\n    return llm.complete(prompt) # No hallucinations!\n\`\`\`\n\n## Key Outcomes\n\n- **Dual-Interface Dashboard:** Developed a Streamlit dashboard featuring interactive Plotly degradation visualizations for fleet managers and an LLM-powered Q&A assistant for mechanics.\n- **Production Robustness:** Ensured compatibility with custom TensorFlow layers.\n- **Zero Hallucinations:** Enforced strict metadata citations via FAISS vector database.`
    },
  ];
