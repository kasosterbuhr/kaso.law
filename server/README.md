# Kaso Server

`server/` contains the optional backend for `kaso.law`.

The public site is mostly static, but some features are better handled on a server:

- a shared OpenAI fallback key for `/brief` without exposing it in browser config
- reporter-citation resolution and verified case briefing
- Google podcast generation for classroom packets
- NotebookLM notebook creation and sharing

## Current entrypoint

`npm start` runs:

```text
node app-server.js
```

That file is the current combined backend. `firac-server.js` is still in the repo as an older, narrower server centered on cookie-backed FIRAC flows.

## What this server does

### Brief endpoints

These endpoints support the AI FIRAC page when you want the site to use a server-owned OpenAI key instead of exposing one in `_config.yml`.

- `GET /api/brief/capabilities`
  Returns whether the server-side OpenAI fallback is configured and which models are in use.
- `POST /api/brief/pdf`
  Accepts an uploaded PDF payload plus the FIRAC template and returns a finished brief.
- `POST /api/brief/citation/resolve`
  Uses a search-capable OpenAI model to turn a reporter citation or case query into likely candidate cases.
- `POST /api/brief/citation/brief`
  Verifies the selected case and returns a FIRAC brief plus the lookup sources used.

### Classroom audio endpoints

These endpoints manage Google-backed audio jobs for reading packets and class materials.

- `GET /api/classroom/audio-capabilities`
  Returns whether podcast generation and NotebookLM creation are configured.
- `POST /api/classroom/audio-jobs`
  Creates a new audio job. The request can target podcast mode, notebook mode, or both.
- `GET /api/classroom/audio-jobs/:id`
  Returns the current status of a job.
- `GET /api/classroom/audio-jobs/:id/download`
  Downloads the rendered MP3 when the podcast job is ready.

### Shared endpoint

- `GET /health`
  Returns a compact health payload including brief and Google audio capability status.

## Request limits and behavior

The current implementation is intentionally lightweight:

- brief PDF uploads are limited to PDF files
- classroom audio jobs accept up to 5 files
- classroom audio jobs cap total upload size at 30 MB
- generated MP3 files are stored temporarily and cleaned up after the configured TTL
- CORS is restricted to `ALLOWED_ORIGINS`

## Environment variables

Copy `.env.example` to `.env` and fill in only what you need.

### Core

- `PORT`
- `ALLOWED_ORIGINS`

### OpenAI fallback for `/brief`

- `OPENAI_SITE_API_KEY`
- `OPENAI_CLIENT_MODEL`
- `OPENAI_REPORTER_MODEL`

If `OPENAI_SITE_API_KEY` is missing, the brief endpoints still exist but return a configuration error instead of processing requests.

### Google podcast and NotebookLM

- `GOOGLE_CLOUD_PROJECT_ID`
- `GOOGLE_CLOUD_PROJECT_NUMBER`
- `GOOGLE_CLOUD_LOCATION`
- `NOTEBOOKLM_UI_IDENTITY_MODE`

For credentials, provide one of these:

- `GOOGLE_SERVICE_ACCOUNT_JSON`
- `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`
- or the split variables:
  `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

### Cleanup

- `AUDIO_JOB_TTL_HOURS`

## Local run

1. `cd server`
2. copy `.env.example` to `.env`
3. add the OpenAI and/or Google values you need
4. run `npm start`

The server listens on `http://localhost:8787` unless `PORT` is overridden.

## Connecting the frontend

Set `server_api_base_url` in the repo-root `_config.yml` to the backend origin you want the site to call.

Example:

```yaml
server_api_base_url: "http://localhost:8787"
```

If `server_api_base_url` is left blank, the frontend can still operate in fully static mode, but any server-backed flows will be unavailable.

## Security notes

- Do not commit `OPENAI_SITE_API_KEY`.
- Do not place a shared secret key in `_config.yml` unless you accept that it will be public in the browser.
- Restrict `ALLOWED_ORIGINS` to the domains that should be allowed to call this API.
- Treat browser-side provider keys and server-side fallback keys as separate trust models.

## Runtime assumptions

This server uses the Node standard library plus built-in `fetch`, so use a recent Node version with native `fetch` support.
