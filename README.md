# AI *pro se* / kaso.law

`kaso.law` is a legal self-help website for the broader **AI** *pro se* project. It is built as a lightweight, GitHub Pages-compatible static site with an optional Node backend for the features that should not live entirely in the browser.

The repo now includes both the public-facing narrative pages and working product surfaces: a prompt library, an AI FIRAC builder, a browser-side account layer, a classroom/resource hub, and a backend for secure AI and Google audio workflows.

**AI** *pro se* is about democratizing law by giving ordinary people clearer access to legal reasoning, legal learning, and practical workflow tools that have historically been expensive, fragmented, or locked behind professional systems. The mission is not to replace lawyers or pretend legal judgment is easy; it is to make the structure of legal thinking more available, more legible, and more usable for people who need help understanding the terrain before they make high-stakes decisions.

## Current project surface

### Public pages

- `index.md` for the main project narrative and vision
- `about.md` for founder and project context
- `why.md` for the market and access-to-justice framing
- `tech-stack.md` for the architecture and operating philosophy

### Working tools

- `prompts.md` for reusable legal reasoning prompts
- `brief.md` for the AI FIRAC Builder
- `account.md` for browser-side profile and provider-key storage
- `classroom.md` for the classroom and course-material browser

### Shared site shell

- `_layouts/default.html` for the common layout, navigation, cookies, and global config bootstrapping
- `assets/css/main.css` for sitewide styling
- `assets/images/` for visual assets
- `assets/downloads/BriefTemplate.txt` for the FIRAC template used by the brief workflow

### Optional backend

- `server/app-server.js` as the current combined backend
- `server/google-audio.js` for Google podcast and NotebookLM job handling
- `server/firac-server.js` as an older narrower server still kept in the repo

## What the site can do now

### AI FIRAC Builder

The `/brief` page supports:

- FIRAC generation from an uploaded opinion PDF
- FIRAC generation from a reporter citation or case lookup
- copy-to-clipboard output
- Word-friendly and PDF export
- browser-saved key usage or a server-side fallback, depending on configuration

### Account layer

The `/account` page gives the site a lightweight personal layer without requiring a database-backed user system.

It currently supports:

- a saved display name in browser cookies
- optional browser-saved provider keys for OpenAI, Gemini, and Claude
- shared greeting and account state across the site shell

Important: browser-saved provider keys are convenient, but they are not secret from that browser. They should only be used on a trusted device.

### Classroom

The `/classroom` page uses GitHub-hosted course assets to present a browsable library of:

- PDFs
- videos
- podcasts

Course content lives under `assets/courses/`. The expected folder structure is documented in `assets/courses/README.md`.

### Optional backend workflows

The optional backend exists for the flows that should not rely on a public browser config value.

It currently supports:

- server-side OpenAI fallback for PDF briefing
- reporter-citation resolution and verified case briefing
- Google podcast generation for reading packets
- NotebookLM notebook creation and sharing

See `server/README.md` for backend setup and endpoint details.

## Architecture

The project is intentionally lean:

- Markdown-first content pages at the repo root
- a shared HTML layout in `_layouts/default.html`
- custom CSS and client-side JavaScript where interactivity helps
- `_config.yml` for site configuration
- an optional Node HTTP backend in `server/`

There is no heavy frontend build pipeline here. Most of the work is plain content, layout, styling, and hand-written JavaScript.

## Configuration

The main site config lives in `_config.yml`.

The key values are:

- `title`
- `description`
- `openai_public_api_key`
- `openai_client_model`
- `openai_reporter_model`
- `server_api_base_url`

Security notes:

- `openai_public_api_key` is exposed to the browser if you set it in `_config.yml`
- `server_api_base_url` is the safer path when you want site-owned AI functionality without exposing a shared key
- secrets should stay in `server/.env`, not in repo-tracked site config

## Repo layout

```text
kaso.law/
  README.md
  _config.yml
  index.md
  about.md
  why.md
  tech-stack.md
  prompts.md
  brief.md
  account.md
  classroom.md
  _layouts/
    default.html
  assets/
    css/
      main.css
    courses/
      README.md
    downloads/
      BriefTemplate.txt
    images/
  server/
    README.md
    .env.example
    app-server.js
    google-audio.js
    firac-server.js
    package.json
```

## Working on the project

### Frontend and content

Most site edits happen in:

- the Markdown pages in the repo root
- `_layouts/default.html`
- `assets/css/main.css`
- `assets/images/`
- `assets/courses/`

Because the site is lightweight, most changes are direct content and UI work rather than framework plumbing.

### Backend

To run the optional backend locally:

1. Copy `server/.env.example` to `server/.env`
2. Fill in the values you need
3. Run `npm start` from `server/`

`npm start` uses `server/app-server.js`, which is the current combined backend.

## Contributor notes

- Keep secrets out of the repo.
- Prefer the backend for any site-owned OpenAI key.
- Use `assets/courses/README.md` as the source of truth for classroom asset organization.
- Treat AI output as draft work that still needs human review.

## Disclaimer

This project is for legal self-help, education, and workflow support. It is not a law firm and does not provide legal representation or legal advice. Any AI-generated output should be reviewed carefully before use in a real legal setting.
