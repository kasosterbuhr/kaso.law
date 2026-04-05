const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

loadEnvFile(path.join(__dirname, ".env"));

const PORT = Number(process.env.PORT || 8787);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const PROFILE_COOKIE_NAME = "kaso_profile_name";
const PROVIDERS = {
  openai: {
    label: "OpenAI",
    cookieName: "kaso_key_openai",
    fallbackValue: OPENAI_API_KEY,
  },
  gemini: {
    label: "Google Gemini",
    cookieName: "kaso_key_gemini",
    fallbackValue: GEMINI_API_KEY,
  },
  claude: {
    label: "Anthropic Claude",
    cookieName: "kaso_key_claude",
    fallbackValue: CLAUDE_API_KEY,
  },
};
const ALLOWED_ORIGINS = new Set(
  String(
    process.env.ALLOWED_ORIGINS ||
      "http://localhost:4000,http://127.0.0.1:4000,https://kaso.law"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);
const TEMPLATE_PATH = path.join(
  __dirname,
  "..",
  "assets",
  "downloads",
  "BriefTemplate.txt"
);

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || "";
  const requestCookies = parseCookies(req.headers.cookie || "");

  if (req.method === "OPTIONS") {
    applyCors(res, origin);
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    applyCors(res, origin);
    writeJson(res, 200, {
      ok: true,
      model: OPENAI_MODEL,
      accountConfigured: Boolean(getProfileName(requestCookies)),
      providers: getProviderStatuses(requestCookies),
    });
    return;
  }

  if (req.method === "GET" && req.url === "/api/account") {
    applyCors(res, origin);
    writeJson(res, 200, {
      ok: true,
      displayName: getProfileName(requestCookies),
      providers: getProviderStatuses(requestCookies),
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/account/profile") {
    applyCors(res, origin);

    try {
      const payload = await readJsonBody(req);
      const displayName =
        payload && typeof payload.displayName === "string"
          ? payload.displayName.trim()
          : "";

      if (displayName.length > 80) {
        writeJson(res, 400, {
          error: "Display name is too long. Keep it under 80 characters.",
        });
        return;
      }

      if (!displayName) {
        clearCookie(res, PROFILE_COOKIE_NAME, {
          httpOnly: true,
          sameSite: "Lax",
          secure: shouldUseSecureCookies(origin),
          path: "/",
        });
      } else {
        setCookie(res, PROFILE_COOKIE_NAME, displayName, {
          maxAge: COOKIE_MAX_AGE,
          httpOnly: true,
          sameSite: "Lax",
          secure: shouldUseSecureCookies(origin),
          path: "/",
        });
      }

      writeJson(res, 200, {
        ok: true,
        displayName: displayName,
      });
    } catch (error) {
      writeJson(res, 500, { error: normalizeError(error) });
    }

    return;
  }

  if (req.method === "POST" && req.url === "/api/account/provider") {
    applyCors(res, origin);

    if (!COOKIE_SECRET) {
      writeJson(res, 500, {
        error:
          "COOKIE_SECRET is missing on the server. Add it to server/.env or your hosting environment.",
      });
      return;
    }

    try {
      const payload = await readJsonBody(req);
      const providerKey =
        payload && typeof payload.provider === "string"
          ? payload.provider.trim().toLowerCase()
          : "";
      const provider = PROVIDERS[providerKey];
      const apiKey =
        payload && typeof payload.apiKey === "string" ? payload.apiKey.trim() : "";

      if (!provider) {
        writeJson(res, 400, { error: "Unknown provider." });
        return;
      }

      if (!apiKey) {
        writeJson(res, 400, { error: "apiKey is required." });
        return;
      }

      setCookie(res, provider.cookieName, encryptSecret(apiKey), {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
        sameSite: "Lax",
        secure: shouldUseSecureCookies(origin),
        path: "/",
      });

      writeJson(res, 200, {
        ok: true,
        provider: providerKey,
        status: getProviderStatus(providerKey, requestCookies, true),
      });
    } catch (error) {
      writeJson(res, 500, { error: normalizeError(error) });
    }

    return;
  }

  if (req.method === "POST" && req.url === "/api/account/provider/clear") {
    applyCors(res, origin);

    try {
      const payload = await readJsonBody(req);
      const providerKey =
        payload && typeof payload.provider === "string"
          ? payload.provider.trim().toLowerCase()
          : "";
      const provider = PROVIDERS[providerKey];

      if (!provider) {
        writeJson(res, 400, { error: "Unknown provider." });
        return;
      }

      clearCookie(res, provider.cookieName, {
        httpOnly: true,
        sameSite: "Lax",
        secure: shouldUseSecureCookies(origin),
        path: "/",
      });

      writeJson(res, 200, {
        ok: true,
        provider: providerKey,
        cleared: true,
      });
    } catch (error) {
      writeJson(res, 500, { error: normalizeError(error) });
    }

    return;
  }

  if (req.method === "POST" && req.url === "/api/account/clear-all") {
    applyCors(res, origin);

    for (const provider of Object.values(PROVIDERS)) {
      clearCookie(res, provider.cookieName, {
        httpOnly: true,
        sameSite: "Lax",
        secure: shouldUseSecureCookies(origin),
        path: "/",
      });
    }

    clearCookie(res, PROFILE_COOKIE_NAME, {
      httpOnly: true,
      sameSite: "Lax",
      secure: shouldUseSecureCookies(origin),
      path: "/",
    });

    writeJson(res, 200, {
      ok: true,
      cleared: true,
    });
    return;
  }

  if (req.method === "GET" && req.url === "/api/key-status") {
    applyCors(res, origin);
    writeJson(res, 200, {
      ok: true,
      connected: Boolean(getSecretFromCookie(PROVIDERS.openai.cookieName, requestCookies)),
      fallbackConfigured: Boolean(OPENAI_API_KEY),
      model: OPENAI_MODEL,
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/connect-key") {
    applyCors(res, origin);

    if (!COOKIE_SECRET) {
      writeJson(res, 500, {
        error:
          "COOKIE_SECRET is missing on the server. Add it to server/.env or your hosting environment.",
      });
      return;
    }

    try {
      const payload = await readJsonBody(req);
      const apiKey =
        payload && typeof payload.apiKey === "string" ? payload.apiKey.trim() : "";

      if (!apiKey) {
        writeJson(res, 400, { error: "apiKey is required." });
        return;
      }

      setCookie(res, PROVIDERS.openai.cookieName, encryptSecret(apiKey), {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
        sameSite: "Lax",
        secure: shouldUseSecureCookies(origin),
        path: "/",
      });

      writeJson(res, 200, {
        ok: true,
        connected: true,
      });
    } catch (error) {
      writeJson(res, 500, { error: normalizeError(error) });
    }

    return;
  }

  if (req.method === "POST" && req.url === "/api/disconnect-key") {
    applyCors(res, origin);
    clearCookie(res, PROVIDERS.openai.cookieName, {
      httpOnly: true,
      sameSite: "Lax",
      secure: shouldUseSecureCookies(origin),
      path: "/",
    });
    writeJson(res, 200, {
      ok: true,
      connected: false,
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/firac") {
    applyCors(res, origin);
    const apiKey = resolveProviderApiKey("openai", requestCookies);

    if (!apiKey) {
      writeJson(res, 500, {
        error:
          "No OpenAI key is connected. Use Connect OpenAI first, or add an OpenAI key on the Account page, or set OPENAI_API_KEY on the server as a fallback.",
      });
      return;
    }

    try {
      const payload = await readJsonBody(req);
      const validationError = validatePayload(payload);

      if (validationError) {
        writeJson(res, 400, { error: validationError });
        return;
      }

      const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
      const brief = await generateFirac({
        apiKey,
        filename: payload.filename,
        mimeType: payload.mimeType,
        fileDataBase64: payload.fileDataBase64,
        template,
      });

      writeJson(res, 200, {
        ok: true,
        text: brief,
        model: OPENAI_MODEL,
      });
    } catch (error) {
      writeJson(res, 500, {
        error: normalizeError(error),
      });
    }

    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`FIRAC server listening on http://localhost:${PORT}`);
});

async function generateFirac({ apiKey, filename, mimeType, fileDataBase64, template }) {
  const systemPrompt =
    "You are a precise law-school case briefing assistant. " +
    "Create a full FIRAC brief using only the uploaded opinion. " +
    "Do not use external sources, do not invent facts, and do not include embedded citations or source callouts. " +
    "Return only the finished brief, with bold headings and bullets where appropriate, ready to paste into Microsoft Word.";

  const userPrompt =
    "Use the uploaded opinion to complete the following briefing structure. " +
    "If a detail is genuinely unavailable from the opinion, say so briefly instead of guessing.\n\n" +
    "Formatting rules:\n" +
    "- Use bold section headings.\n" +
    "- Use bullets for Procedural History and Facts.\n" +
    "- Do not use horizontal rules.\n" +
    "- Leave a blank line between sections.\n" +
    "- Rely only on the uploaded opinion.\n\n" +
    "Briefing template:\n" +
    template;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: systemPrompt }],
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: userPrompt },
            {
              type: "input_file",
              filename,
              file_data: `data:${mimeType};base64,${fileDataBase64}`,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data && data.error && data.error.message
        ? data.error.message
        : "OpenAI request failed."
    );
  }

  const text = extractOutputText(data).trim();

  if (!text) {
    throw new Error("OpenAI returned an empty response.");
  }

  return text;
}

function extractOutputText(data) {
  if (typeof data.output_text === "string" && data.output_text) {
    return data.output_text;
  }

  if (!Array.isArray(data.output)) {
    return "";
  }

  const chunks = [];

  for (const item of data.output) {
    if (!Array.isArray(item.content)) {
      continue;
    }

    for (const contentItem of item.content) {
      if (typeof contentItem.text === "string") {
        chunks.push(contentItem.text);
      }
    }
  }

  return chunks.join("\n");
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "Request body must be a JSON object.";
  }

  if (!payload.filename || typeof payload.filename !== "string") {
    return "filename is required.";
  }

  if (!payload.mimeType || payload.mimeType !== "application/pdf") {
    return "Only PDF uploads are supported right now.";
  }

  if (!payload.fileDataBase64 || typeof payload.fileDataBase64 !== "string") {
    return "fileDataBase64 is required.";
  }

  if (payload.fileDataBase64.length > 30_000_000) {
    return "The uploaded file is too large for this lightweight endpoint.";
  }

  return "";
}

function applyCors(res, origin) {
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function writeJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > 35_000_000) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Request body must be valid JSON."));
      }
    });

    req.on("error", reject);
  });
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const file = fs.readFileSync(filePath, "utf8");
  const lines = file.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function normalizeError(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unexpected server error.";
}

function getProviderStatuses(cookies) {
  const result = {};

  for (const providerKey of Object.keys(PROVIDERS)) {
    result[providerKey] = getProviderStatus(providerKey, cookies, false);
  }

  return result;
}

function getProviderStatus(providerKey, cookies, assumeConnected) {
  const provider = PROVIDERS[providerKey];
  const userConnected = assumeConnected || Boolean(getSecretFromCookie(provider.cookieName, cookies));

  return {
    label: provider.label,
    connected: userConnected,
    fallbackConfigured: Boolean(provider.fallbackValue),
  };
}

function resolveProviderApiKey(providerKey, cookies) {
  const provider = PROVIDERS[providerKey];
  return getSecretFromCookie(provider.cookieName, cookies) || provider.fallbackValue;
}

function getProfileName(cookies) {
  const raw = cookies[PROFILE_COOKIE_NAME];
  return raw ? String(raw).trim() : "";
}

function getSecretFromCookie(cookieName, cookies) {
  if (!COOKIE_SECRET) {
    return "";
  }

  const raw = cookies[cookieName];

  if (!raw) {
    return "";
  }

  try {
    return decryptSecret(raw);
  } catch (error) {
    return "";
  }
}

function encryptSecret(secret) {
  const iv = crypto.randomBytes(12);
  const key = getCookieKey();
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(secret, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [toBase64Url(iv), toBase64Url(tag), toBase64Url(ciphertext)].join(".");
}

function decryptSecret(serializedValue) {
  const parts = String(serializedValue).split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid encrypted cookie format.");
  }

  const [ivPart, tagPart, dataPart] = parts;
  const iv = fromBase64Url(ivPart);
  const tag = fromBase64Url(tagPart);
  const ciphertext = fromBase64Url(dataPart);
  const decipher = crypto.createDecipheriv("aes-256-gcm", getCookieKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}

function getCookieKey() {
  return crypto.createHash("sha256").update(COOKIE_SECRET, "utf8").digest();
}

function parseCookies(headerValue) {
  const result = {};

  for (const part of String(headerValue).split(";")) {
    const trimmed = part.trim();

    if (!trimmed) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (key) {
      result[key] = decodeURIComponent(value);
    }
  }

  return result;
}

function setCookie(res, name, value, options) {
  const cookieParts = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${options.path || "/"}`,
    `Max-Age=${options.maxAge || COOKIE_MAX_AGE}`,
  ];

  if (options.httpOnly) {
    cookieParts.push("HttpOnly");
  }

  if (options.sameSite) {
    cookieParts.push(`SameSite=${options.sameSite}`);
  }

  if (options.secure) {
    cookieParts.push("Secure");
  }

  appendSetCookie(res, cookieParts.join("; "));
}

function clearCookie(res, name, options) {
  const cookieParts = [
    `${name}=`,
    `Path=${options.path || "/"}`,
    "Max-Age=0",
  ];

  if (options.httpOnly) {
    cookieParts.push("HttpOnly");
  }

  if (options.sameSite) {
    cookieParts.push(`SameSite=${options.sameSite}`);
  }

  if (options.secure) {
    cookieParts.push("Secure");
  }

  appendSetCookie(res, cookieParts.join("; "));
}

function appendSetCookie(res, cookieValue) {
  const existing = res.getHeader("Set-Cookie");

  if (!existing) {
    res.setHeader("Set-Cookie", [cookieValue]);
    return;
  }

  if (Array.isArray(existing)) {
    res.setHeader("Set-Cookie", existing.concat(cookieValue));
    return;
  }

  res.setHeader("Set-Cookie", [existing, cookieValue]);
}

function shouldUseSecureCookies(origin) {
  return String(origin || "").startsWith("https://");
}

function toBase64Url(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const normalized = String(value).replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? 0 : 4 - (normalized.length % 4);
  return Buffer.from(normalized + "=".repeat(padding), "base64");
}
