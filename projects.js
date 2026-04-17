/* ═══════════════════════════════════════════════════════
   projects.js  —  A.Studio Portfolio Project Data
═══════════════════════════════════════════════════════ */

window.PROJECTS = [

  /* ──────────────────────────────────────────
     01  SaaS Analytics Dashboard
  ────────────────────────────────────────── */
  {
    id:       "saas-dashboard",
    title:    "SaaS Analytics Dashboard",
    category: "Software Development",
    year:     "2024",
    tags:     ["React", "Next.js"],
    summary:  "A comprehensive analytics platform with real-time data visualisation.",
    description: `
      <p>A full-featured analytics platform built for a SaaS startup to track user engagement, revenue metrics, and operational KPIs across their product suite.</p>
    `,
    challenge:  "The client needed a single view that consolidated data from five separate APIs.",
    solution:   "Built a React/Next.js app with intelligent caching and a drag-and-drop dashboard builder.",
    result:     "Reduced time-to-insight from 3 hours to under 5 minutes.",
    stack: ["React", "Next.js", "MySQL"],
    images: [],
    liveUrl:   "",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     02  Startup Landing Page
  ────────────────────────────────────────── */
  {
    id:       "startup-landing",
    title:    "Startup Landing Page",
    category: "Frontend Development",
    year:     "2025",
    tags:     ["Landing Page", "Next.js"],
    summary:  "A high-converting startup landing page with fluid animations.",
    description: `<p>Designed and built a conversion-focused landing page for a B2B SaaS startup.</p>`,
    challenge:  "Achieve a sub-1s LCP on mobile while delivering rich scroll animations.",
    solution:   "Used Next.js Image optimisation and CSS-only fallback animations.",
    result:     "97 Lighthouse performance score. Page converted at 12.4%.",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    images: [],
    liveUrl:   "",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     03  AI Brand Generator
  ────────────────────────────────────────── */
  {
    id:       "ai-brand-generator",
    title:    "AI Brand Generator",
    category: "Generative AI",
    year:     "2025",
    tags:     ["Claude API", "n8n"],
    summary:  "An automated pipeline generating complete brand packages.",
    description: `<p>Built a fully automated brand identity pipeline that takes a client brief as input.</p>`,
    challenge:  "Clients were waiting 2 weeks for initial concepts.",
    solution:   "Designed a multi-stage prompt architecture using Claude and Midjourney.",
    result:     "Reduced initial concept delivery to 12 minutes.",
    stack: ["Claude API", "Midjourney API", "n8n"],
    images: [],
    liveUrl:   "",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     04  Brand Identity
  ────────────────────────────────────────── */
  {
    id:       "brand-identity",
    title:    "Full Brand Identity System",
    category: "Graphic Design",
    year:     "2024",
    tags:     ["Brand Identity", "Figma"],
    summary:  "A comprehensive visual identity for a boutique consultancy.",
    description: `<p>End-to-end brand identity project for a boutique management consultancy.</p>`,
    challenge:  "The client had operated for 8 years with an outdated identity.",
    solution:   "Conducted stakeholder interviews and created a distinctive, modern visual system.",
    result:     "Immediate uplift in proposal acceptance rates.",
    stack: ["Figma", "Illustrator", "Photoshop"],
    images: [],
    liveUrl:   "",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     05  Brand Reel
  ────────────────────────────────────────── */
  {
    id:       "brand-reel",
    title:    "Corporate Brand Reel",
    category: "Video Editing",
    year:     "2024",
    tags:     ["Video Production", "Motion Graphics"],
    summary:  "A 2-minute brand film blending live footage and motion graphics.",
    description: `<p>Produced a flagship brand film for a regional logistics company.</p>`,
    challenge:  "Source footage was shot across five countries under varying lighting.",
    solution:   "Built a custom LUT stack in DaVinci to neutralise camera differences.",
    result:     "Screened at the client's investor day successfully.",
    stack: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    images: [],
    liveUrl:   "",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     06  Automation Suite
  ────────────────────────────────────────── */
  {
    id:       "automation-suite",
    title:    "Social Media Automation Suite",
    category: "Workflow Automation",
    year:     "2025",
    tags:     ["n8n", "Make.com"],
    summary:  "An intelligent automation system managing content scheduling.",
    description: `<p>Built a comprehensive social media automation suite for an agency.</p>`,
    challenge:  "Agency team spent 60% of their time on mechanical tasks.",
    solution:   "Automated the bottom 80% of tasks using n8n and Claude.",
    result:     "847 tasks automated per week. Team reclaimed 22 hours per week.",
    stack: ["n8n", "Zapier", "Claude API"],
    images: [],
    liveUrl:   "",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     07  RAG Chatbot
  ────────────────────────────────────────── */
  {
    id:       "rag-chatbot",
    title:    "RAG Chatbot Pipeline",
    category: "Workflow Automation",
    year:     "2026",
    tags:     ["RAG", "OpenAI", "Pinecone", "n8n"],
    summary:  "Full RAG pipeline syncing knowledge from Google Drive to a Pinecone Vector Store.",
    description: `
      <p>Built a complete Retrieval-Augmented Generation (RAG) pipeline to provide highly accurate and context-aware AI responses. The system syncs document knowledge directly from Google Drive, processes and splits the text, and embeds it using OpenAI's models.</p>
    `,
    challenge:  "Standard LLMs lacked specific company knowledge and hallucinated answers.",
    solution:   "Designed a seamless n8n automation that watches Google Drive, generates vector embeddings, and upserts them into Pinecone.",
    result:     "Created a highly reliable internal chatbot with a 0% hallucination rate.",
    stack: ["n8n", "OpenAI", "Pinecone"],
    images: [{ src: "images/auto3.jpg", alt: "RAG Chatbot" }],
    liveUrl:   "https://github.com/mohamedsalah2-ws/n8nprojects",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     08  WhatsApp Multi-Agent
  ────────────────────────────────────────── */
  {
    id:       "whatsapp-multi-agent",
    title:    "WhatsApp Multi-Agent System",
    category: "Workflow Automation",
    year:     "2026",
    tags:     ["WhatsApp", "AI Agents"],
    summary:  "WhatsApp-powered AI system handling Text, Voice & Image.",
    description: `
      <p>Developed an intelligent multi-agent ecosystem operating entirely within WhatsApp utilizing a central Orchestrator Agent.</p>
    `,
    challenge:  "Handling diverse user inputs on WhatsApp without a visual interface.",
    solution:   "Built a master orchestrator node in n8n that categorizes payloads and routes them.",
    result:     "A unified, conversational AI assistant on WhatsApp.",
    stack: ["n8n", "WhatsApp API", "OpenAI"],
    images: [{ src: "images/auto2.jpg", alt: "WhatsApp Multi-Agent" }],
    liveUrl:   "https://github.com/mohamedsalah2-ws/n8nprojects",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     09  Telegram Multi-Agent
  ────────────────────────────────────────── */
  {
    id:       "telegram-multi-agent",
    title:    "Telegram Multi-Agent Bot",
    category: "Workflow Automation",
    year:     "2026",
    tags:     ["Telegram", "AI Agents"],
    summary:  "Telegram bot with Orchestrator Agent routing multi-format inputs.",
    description: `
      <p>A sophisticated Telegram bot designed as a central command hub powered by OpenAI with memory.</p>
    `,
    challenge:  "Creating a stateful bot that remembers context across media inputs.",
    solution:   "Implemented persistent memory nodes in n8n and a multi-branch workflow.",
    result:     "Streamlined social media management into a Telegram chat interface.",
    stack: ["n8n", "Telegram API", "OpenAI"],
    images: [{ src: "images/auto5.jpg", alt: "Telegram Multi-Agent" }],
    liveUrl:   "https://github.com/mohamedsalah2-ws/n8nprojects",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     10  HR Automation Agent
  ────────────────────────────────────────── */
  {
    id:       "hr-automation-agent",
    title:    "HR Automation Agent",
    category: "Workflow Automation",
    year:     "2026",
    tags:     ["HR Tech", "GPT-5"],
    summary:  "An AI-powered HR assistant handling emails, scheduling, and employee data.",
    description: `
      <p>Built a comprehensive HR automation tool designed to reduce administrative overhead triggered via Telegram.</p>
    `,
    challenge:  "HR teams spend hours manually cross-referencing spreadsheets.",
    solution:   "Chained Telegram commands to a GPT agent equipped with function-calling capabilities.",
    result:     "Automated routine HR tasks, cutting scheduling time by 80%.",
    stack: ["n8n", "GPT Models", "Workspace API"],
    images: [{ src: "images/auto8.jpg", alt: "HR Automation" }],
    liveUrl:   "https://github.com/mohamedsalah2-ws/n8nprojects",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     11  Grok Sheets Gmail
  ────────────────────────────────────────── */
  {
    id:       "grok-sheets-gmail",
    title:    "AI Agent — Grok + Sheets + Gmail",
    category: "Workflow Automation",
    year:     "2026",
    tags:     ["xAI Grok", "Sheets"],
    summary:  "A smart AI Agent powered by xAI Grok with memory.",
    description: `
      <p>Leveraged the high-speed reasoning of xAI's Grok model to build a highly responsive chat-triggered AI agent.</p>
    `,
    challenge:  "Integrating Grok into standard business workflows.",
    solution:   "Configured custom HTTP requests in n8n to connect with Grok's API.",
    result:     "Created a lightning-fast data retrieval and email drafting assistant.",
    stack: ["n8n", "xAI Grok", "Google Sheets"],
    images: [{ src: "images/auto6.jpg", alt: "Grok AI Agent" }],
    liveUrl:   "https://github.com/mohamedsalah2-ws/n8nprojects",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     12  Messenger Multi-Agent
  ────────────────────────────────────────── */
  {
    id:       "messenger-multi-agent",
    title:    "Messenger Multi-Agent System",
    category: "Workflow Automation",
    year:     "2026",
    tags:     ["Messenger", "Webhooks"],
    summary:  "A full-scale multi-agent system via Webhook for Messenger.",
    description: `
      <p>Deployed a comprehensive multi-agent architecture specifically tailored for Facebook Messenger.</p>
    `,
    challenge:  "Transforming a standard Facebook Messenger inbox into a business assistant.",
    solution:   "Utilized n8n webhooks to capture Messenger payloads instantly.",
    result:     "Provided users with a powerful, all-in-one assistant inside Messenger.",
    stack: ["n8n", "Messenger API", "OpenAI"],
    images: [{ src: "images/auto1.jpg", alt: "Messenger Multi-Agent" }],
    liveUrl:   "https://github.com/mohamedsalah2-ws/n8nprojects",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     13  Form AI Sheets
  ────────────────────────────────────────── */
  {
    id:       "form-ai-sheets",
    title:    "Form → AI → Google Sheets",
    category: "Workflow Automation",
    year:     "2026",
    tags:     ["Forms", "OpenAI"],
    summary:  "Automated pipeline capturing form submissions and processing via AI.",
    description: `
      <p>Designed a data enrichment pipeline that removes the manual work from lead processing.</p>
    `,
    challenge:  "Manual review of incoming form submissions was causing bottlenecks.",
    solution:   "Created an n8n workflow that intercepts form webhooks and formats a prompt for OpenAI.",
    result:     "Achieved 100% automated lead/data categorization.",
    stack: ["n8n", "OpenAI API", "Sheets API"],
    images: [{ src: "images/auto4.jpg", alt: "Form to Sheets" }],
    liveUrl:   "https://github.com/mohamedsalah2-ws/n8nprojects",
    sourceUrl: "",
  },

  /* ──────────────────────────────────────────
     14  Telegram Video Downloader
  ────────────────────────────────────────── */
  {
    id:       "telegram-video-downloader",
    title:    "Telegram Video Downloader Bot",
    category: "Workflow Automation",
    year:     "2026",
    tags:     ["Telegram", "Media"],
    summary:  "A bot detecting platforms and fetching videos from Instagram/Facebook.",
    description: `
      <p>Built a highly requested utility bot on Telegram that simplifies media downloading via a Switch node.</p>
    `,
    challenge:  "Users needed a fast way to download social media videos without leaving chat.",
    solution:   "Developed robust URL parsing logic in n8n combined with media fetching APIs.",
    result:     "Delivered a seamless media tool processing downloads in under 5 seconds.",
    stack: ["n8n", "Telegram API", "HTTP Requests"],
    images: [{ src: "images/auto7.jpg", alt: "Video Downloader" }],
    liveUrl:   "https://github.com/mohamedsalah2-ws/n8nprojects",
    sourceUrl: "",
  }
];