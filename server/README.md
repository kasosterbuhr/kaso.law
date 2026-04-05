# FIRAC Server (Legacy Prototype)

This `server/` folder is a leftover prototype from an earlier backend-based FIRAC workflow.

The current `kaso.law` site does **not** require this server. The live account and FIRAC flow now run fully client-side:

1. Display name is stored in browser cookies.
2. Provider keys are stored in browser cookies on the user's device.
3. The AI FIRAC page uses the saved OpenAI key directly from the browser.
4. Nothing is written back into the GitHub repo when a user saves a name or API key.

If you want the current production behavior, you can ignore this folder.

## Current production model

- No backend required.
- No server-managed cookies.
- User stays in control of data on their own browser profile.
- If the user clears cookies or switches browsers, the saved values disappear there.

## Important security note

This fully client-side model is convenient, but browser-stored API keys are not secret from that browser. Users should only save provider keys on a device and browser profile they trust.
