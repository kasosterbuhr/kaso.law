# FIRAC Server

This server keeps provider API keys off the public website and gives the static site a lightweight cookie-based account layer.

## What it does

`kaso.law` is a static GitHub Pages site. Static pages cannot keep secrets. If you place API keys in browser JavaScript, anyone visiting the page can extract and abuse them.

This backend solves that by letting the browser:

1. Send a provider key once to the backend.
2. Have the backend encrypt that key into a persistent `HttpOnly` cookie.
3. Reuse that cookie later for site tools such as FIRAC generation.
4. Store a display name in a cookie-backed profile so the site can greet the user.

## Local setup

1. Install Node.js 20 or newer.
2. Copy `server/.env.example` to `server/.env`.
3. Set a long random value in `COOKIE_SECRET`.
4. Optionally set fallback provider keys in `OPENAI_API_KEY`, `GEMINI_API_KEY`, or `CLAUDE_API_KEY`.
5. Run `node server/firac-server.js` from the repo root.
6. Open the site locally and point the Account or AI FIRAC page to `http://localhost:8787`.

## Environment variables

- `COOKIE_SECRET`: required for encrypted persistent cookies.
- `OPENAI_API_KEY`: optional fallback OpenAI key.
- `GEMINI_API_KEY`: optional fallback Gemini key.
- `CLAUDE_API_KEY`: optional fallback Claude key.
- `OPENAI_MODEL`: optional. Defaults to `gpt-4.1-mini`.
- `PORT`: optional. Defaults to `8787`.
- `ALLOWED_ORIGINS`: comma-separated list of browser origins allowed to call this server.

## Endpoints

- `GET /health`: health check and provider summary.
- `GET /api/account`: returns display name plus provider connection states.
- `POST /api/account/profile`: saves or clears the display name.
- `POST /api/account/provider`: saves a provider key cookie. Accepts `openai`, `gemini`, or `claude`.
- `POST /api/account/provider/clear`: clears one provider key cookie.
- `POST /api/account/clear-all`: clears all provider cookies plus the display name cookie.
- `GET /api/key-status`: legacy OpenAI-only status endpoint kept for the FIRAC page.
- `POST /api/connect-key`: legacy OpenAI-only connect endpoint kept for the FIRAC page.
- `POST /api/disconnect-key`: legacy OpenAI-only clear endpoint kept for the FIRAC page.
- `POST /api/firac`: generates the FIRAC using the connected OpenAI cookie or fallback server key.

## Cookie behavior

- Provider keys are stored in encrypted persistent `HttpOnly` cookies.
- The display name is stored in a persistent cookie managed by the backend.
- Cookies use `SameSite=Lax`.
- In production over HTTPS, cookies are marked `Secure`.
- In local HTTP development, cookies stay non-secure so the workflow still works.

## Production deployment

GitHub Pages cannot run this server for you. Deploy the `server/` app to a backend host such as Render, Railway, Fly.io, or another Node-friendly service, then point the site to that backend URL.

Suggested production setup:

1. Deploy this server on a subdomain such as `api.kaso.law`.
2. Store `COOKIE_SECRET` and any fallback provider keys in the host's secret manager.
3. Set `ALLOWED_ORIGINS=https://kaso.law`.
4. In the site, use `https://api.kaso.law` as the API base URL.
5. Let users manage their provider keys and display name from the Account page.
