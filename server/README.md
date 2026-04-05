# Kaso Audio Server

This `server/` folder now contains the optional backend for the Classroom audio builder.

It does one job well:

- accept 1 to 5 uploaded opinions or class readings
- send them to Google's Podcast API for a downloadable MP3
- optionally create a NotebookLM Enterprise notebook and request an audio overview there too
- return a job URL that the frontend can poll until the MP3 is ready

## What this backend is for

The public GitHub Pages site is still static by default. That means server-side Google credentials cannot live safely in the page itself.

This backend keeps the Google Cloud service account on the server and exposes a thin JSON API to the Classroom page.

## Endpoints

- `GET /health`
- `GET /api/classroom/audio-capabilities`
- `POST /api/classroom/audio-jobs`
- `GET /api/classroom/audio-jobs/:id`
- `GET /api/classroom/audio-jobs/:id/download`

## Environment

Copy `.env.example` to `.env` and fill in the Google values.

Minimum configuration for MP3 podcast downloads:

- `GOOGLE_CLOUD_PROJECT_ID`
- `GOOGLE_SERVICE_ACCOUNT_JSON` or the split service-account env vars

Additional configuration for NotebookLM notebook creation:

- `GOOGLE_CLOUD_PROJECT_NUMBER`
- `GOOGLE_CLOUD_LOCATION`

## Google-side requirements

For the Podcast API path:

- Discovery Engine API enabled
- service account able to mint access tokens
- Podcast API access from Google, which is currently allowlisted

For the NotebookLM path:

- NotebookLM Enterprise enabled in the project
- users who open shared notebooks must already be in the same project or workforce pool and have the required NotebookLM access and license

## Local run

1. `cd server`
2. create `server/.env`
3. `npm start`

The classroom page can point at this backend through `server_api_base_url` in `_config.yml`.

## Notes

- Generated MP3 files are stored temporarily in `server/generated-audio/` and cleaned up after the TTL window.
- The backend does not currently fetch opinions by citation or Justia search. The shipped MVP is upload-first.
