# **AI** *pro se* — The Future of Distributed Legal Intelligence

> A practical, scalable, open-source platform bridging the $100B access-to-justice crisis.

**AI** *pro se* is a legal technology and self-help project designed to help unrepresented individuals navigate the legal system using structured AI-guided reasoning, high-quality educational resources, and practical legal workflows.

## The Problem

Justice is a right, yet competent legal representation is a luxury. Millions of individuals become *pro se* (self-represented) litigants annually—not by choice, but by financial necessity. They face a massive cognitive gap:

- **Identifying** which facts are legally material
- **Understanding** procedural requirements and deadlines
- **Strategizing** effective legal arguments
- **Generating** usable legal documents
- **Navigating** court-specific requirements

Current legal technology is built for professionals behind firm walls. The unrepresented are left piecing together fragments of outdated PDFs and guessing at procedure.

**AI** *pro se* closes this gap.

## What You Get Here

### 🎓 Free Classroom Resources
Access organized course materials across multiple legal domains:
- **PDFs**: Study guides, case briefs, procedural summaries
- **Videos**: Explainer videos breaking down complex concepts
- **Podcasts**: NotebookLM audio lectures for on-the-go learning

**Browse courses at:** [`/classroom`](https://kaso.law/classroom)

### 📚 Prompt Library
Copy-paste ready legal reasoning prompts for any AI tool (ChatGPT, Claude, Gemini, ROSS):
- **FIRAC case briefing templates**
- **Issue spotting workflows**
- **Fact organization frameworks**
- **Evidence rule analysis**
- **Procedural checklist generation**

**View prompts at:** [`/prompts`](https://kaso.law/prompts)

### 🤖 AI FIRAC Builder
Upload a case opinion PDF, send it to your private backend, and get a full clipboard-ready FIRAC brief back:
- **Drag-and-drop PDF upload**
- **Server-side OpenAI call**
- **Clipboard-ready Word-friendly output**
- **API key kept off the public website**

**Open the tool at:** [`/brief`](https://kaso.law/brief)

### 🏗️ Transparent Architecture
Every aspect of this project is open-source and inspectable:
- **GitHub as the operational backbone** — all code, prompts, and content tracked and versioned
- **AI models used transparently** — never hidden or proprietary
- **Human judgment as the constraint** — not removed, but made more efficient

**Read the tech stack:** [`/tech-stack`](https://kaso.law/tech-stack)

---

## Quick Start

### For Learners
1. Visit [**AI** *pro se* Classroom](https://kaso.law/classroom)
2. Select a course and date
3. Choose your format: PDF, video, or podcast
4. Download and learn at your own pace

### For Educators/Contributors
1. **Fork this repository**
2. **Add your course materials** to `/assets/courses/`:
   ```
   /assets/courses/
   ├── CourseName/
   │   └── YYYY.MM.DD/
   │       ├── pdfs/
   │       ├── videos/
   │       └── podcasts/
   ```
3. **Push changes** — the site updates automatically
4. **Create a pull request** to contribute to the main branch

[See course upload guide](./assets/courses/README.md)

---

## Repository Structure

```
kaso.law/
├── README.md                      # This file
├── CNAME                          # GitHub Pages custom domain
├── _config.yml                    # Jekyll site configuration
├── _layouts/
│   └── default.html              # Master page template
├── assets/
│   ├── css/
│   │   └── main.css              # Site styling
│   ├── images/
│   │   ├── banner.jpg            # Header banner
│   │   └── [course images]
│   └── courses/                  # 🎓 Course materials (PDFs, videos, podcasts)
│       ├── ExampleCourse/
│       │   └── 2026.04.04/
│       │       ├── pdfs/
│       │       ├── videos/
│       │       └── podcasts/
│       └── README.md             # Upload instructions
├── index.md                       # Homepage
├── about.md                       # About AI pro se & founder
├── why.md                         # Market analysis & why this exists
├── tech-stack.md                  # Technical architecture
├── prompts.md                     # Prompt library showcase
└── classroom.md                   # 🎓 Dynamic course browser
```

---

## Key Features

### 🔍 Dynamic Course Discovery
The **Classroom** page automatically scans GitHub and lists:
- All courses organized hierarchically
- Classes sorted by date (newest first)
- Materials grouped by type (PDF/Video/Podcast)
- Direct download links for each file

No manual updates needed. Just upload → commit → sites updates automatically.

### 📖 Reusable Legal Reasoning Prompts
Structured, copy-paste ready workflows for:
- Case briefing (FIRAC format)
- Issue spotting and legal theory application
- Procedural sequencing
- Evidence rule analysis
- Document generation

All prompts work across any LLM (OpenAI, Claude, Gemini, etc.).

### 🎯 Transparent, Open-Source Design
- **No hidden algorithms** — every workflow is inspectable
- **No vendor lock-in** — prompts transfer across AI platforms
- **No paywalls** — all resources free and publicly accessible
- **No proprietary models** — works with standard APIs

### 📱 Mobile-Responsive Design
- Full responsive layout (desktop, tablet, mobile)
- Hamburger navigation on smaller screens
- Optimized for reading and navigation

---

## How It Works

### For Learners

1. **Browse the Classroom** — visit `/classroom` to see available courses
2. **Select a course and date** — organized hierarchically (e.g., Civil Procedure → 2026.04.15)
3. **Choose your format** — download PDFs, watch videos, or listen to podcasts
4. **Use the prompts** — reference templates from `/prompts` to structure your legal thinking
5. **Get to work** — prepare your case like a lawyer would

### For Contributors

1. **Create a course folder** — e.g., `/assets/courses/CivilProcedure/`
2. **Add date subfolders** — use `YYYY.MM.DD` format (e.g., `2026.04.15`)
3. **Organize materials** — place files in `/pdfs`, `/videos`, or `/podcasts` subfolders
4. **Commit and push** — the site regenerates on deploy
5. **GitHub API does the rest** — course appears instantly in the Classroom browser

[See detailed instructions](./assets/courses/README.md)

---

## Technology Stack

### Site Layer
- **Jekyll** — Static site generation
- **Markdown** — Fast, editable content
- **GitHub Pages** — Simple deployment and hosting
- **Custom HTML/CSS/JavaScript** — Interactive elements

### AI Layer
- **GitHub API** — Dynamic course listing and file discovery
- **LLM-compatible prompts** — Works with OpenAI, Claude, Gemini, and other models
- **Optional FIRAC backend** — Separate Node service for secure PDF-to-FIRAC generation
- **Modular architecture** — Workflows upgrade as models improve

### Version Control
- **Git** — All prompts, content, and materials versioned
- **GitHub** — Transparent iteration and public development

---

## Site Navigation

| Page | Purpose |
|------|---------|
| [**Home**](https://kaso.law/) | Product overview and investment thesis |
| [**About**](https://kaso.law/about) | Founder's journey and why this matters |
| [**Why**](https://kaso.law/why) | Market analysis of legal tech and access-to-justice |
| [**Tech Stack**](https://kaso.law/tech-stack) | Technical architecture and operational design |
| [**Prompts**](https://kaso.law/prompts) | Library of legal reasoning templates (copy-paste ready) |
| [**Classroom**](https://kaso.law/classroom) | 🆕 Course materials hub (PDFs, videos, podcasts) |

---

## Supported File Formats

### PDFs
- `.pdf` — Study guides, case briefs, outlines, procedural summaries

### Videos
- `.mp4` — Explainer videos, recorded lectures
- `.webm` — Web-optimized video
- `.mov` — Support for Mac video formats

### Podcasts
- `.mp3` — Standard audio format
- `.m4a` — Apple audio format
- `.wav` — High-quality uncompressed audio

---

## Course Naming Convention

For consistency and discoverability:

```
Supported Courses (Examples):
├── CivPro (Civil Procedure)
├── AnimalLaw (Animal Law)
├── ConstitutionalLaw (or ConLaw)
├── ContractLaw
├── CriminalLaw
├── Evidence
├── FamilyLaw
├── IntellectualProperty
├── Torts
├── Admin
└── [Any other legal domain]

Class Naming:
YYYY.MM.DD (e.g., 2026.04.15)
```

---

## Contributing

### Ways to Contribute

1. **Submit course materials** — Create a PR with PDFs, videos, or podcasts
2. **Improve documentation** — Clarify existing guides or add new ones
3. **Suggest prompts** — Recommend new legal reasoning workflows
4. **Report issues** — Found a broken link or display issue? Let us know
5. **Share feedback** — What would make this more useful?

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-course`)
3. Add your materials following the directory structure
4. Commit with clear messages (`git commit -m "Add Civil Procedure materials for 2026.04.15"`)
5. Push to GitHub (`git push origin feature/add-course`)
6. Submit a pull request with description of what you added

---

## Legal Disclaimer

**AI** *pro se* is a legal technology and self-help project. We are **not a law firm** and do not provide legal representation. Our platform is designed to provide guided reasoning and clerical assistance.

**Important:**
- AI-generated outputs must be reviewed by a human professional before use
- This platform is for educational purposes and self-help guidance
- Consult a licensed attorney for specific legal advice
- Laws vary by jurisdiction; materials may not apply to your situation
- Do not rely solely on AI or this platform for high-stakes legal matters

---

## License

[Add your chosen license here — e.g., MIT, Apache 2.0, or CC BY-SA]

---

## Quick Links

- **Live Site:** https://kaso.law
- **GitHub:** https://github.com/ai-prose/kaso.law
- **Classroom:** https://kaso.law/classroom
- **Prompts Library:** https://kaso.law/prompts
- **Course Upload Guide:** ./assets/courses/README.md

---

## Questions?

- **How do I upload course materials?** See [./assets/courses/README.md](./assets/courses/README.md)
- **How do I use the prompts?** Visit [/prompts](https://kaso.law/prompts) and copy any template
- **Can I host my own version?** Yes! Fork this repo and deploy to your own GitHub Pages
- **Can I contribute materials?** Absolutely! Submit a pull request with your courses

---

## The Vision

**AI** *pro se* exists to democratize legal reasoning.

We are building infrastructure for a world where:
- Procedural justice is **not gated by a bank account**
- Legal reasoning is a **utility available to all**
- The unrepresented have tools **professionals use every day**
- Access to legal thinking **becomes as available as information access**

This is not about replacing lawyers. It's about empowering people to think clearly, prepare intelligently, and understand the legal terrain before they step on procedural landmines.

---

**Made with ❤️ for the 86% of low-income Americans without access to legal counsel.**

*Last Updated: 2026.04.04*
