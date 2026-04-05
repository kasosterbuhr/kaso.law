# Kaso Server

This `server/` folder now contains the optional backend for two things:

- Classroom audio generation through Google's podcast and NotebookLM APIs
- a safe OpenAI fallback for `/brief` when a visitor has not saved their own key

## Why this backend exists

The public site is static by default. That means any OpenAI key placed in browser config or committed to the repo would be exposed.

This backend keeps secrets on the server and exposes only narrow JSON endpoints to the site.

## Endpoints

Audio:
- `GET /api/classroom/audio-capabilities`
- `POST /api/classroom/audio-jobs`
- `GET /api/classroom/audio-jobs/:id`
- `GET /api/classroom/audio-jobs/:id/download`

Brief fallback:
- `GET /api/brief/capabilities`
- `POST /api/brief/pdf`
- `POST /api/brief/citation/resolve`
- `POST /api/brief/citation/brief`

Shared:
- `GET /health`

## Environment

Copy `.env.example` to `.env` and fill in what you need.

For `/brief` fallback:
- `OPENAI_SITE_API_KEY`
- optional model overrides: `OPENAI_CLIENT_MODEL`, `OPENAI_REPORTER_MODEL`

For Classroom audio:
- `GOOGLE_CLOUD_PROJECT_ID`
- `GOOGLE_SERVICE_ACCOUNT_JSON` or the split service-account vars
- `GOOGLE_CLOUD_PROJECT_NUMBER` and `GOOGLE_CLOUD_LOCATION` for NotebookLM notebook creation

## Local run

1. `cd server`
2. create `server/.env`
3. `npm start`

Then point the site at the backend with `server_api_base_url` in `_config.yml`.

## Important note

Do not commit `OPENAI_SITE_API_KEY` into the repo and do not expose it through browser-side config. The whole point of this backend is to let anonymous users use the site without revealing your key publicly.
