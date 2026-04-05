const http = require("http");
const fs = require("fs");
const path = require("path");
const { createGoogleAudioManager } = require("./google-audio");

loadEnvFile(path.join(__dirname, ".env"));

const PORT = Number(process.env.PORT || 8787);
const OPENAI_SITE_API_KEY = String(
  process.env.OPENAI_SITE_API_KEY || process.env.OPENAI_API_KEY || ""
).trim();
const OPENAI_CLIENT_MODEL = String(
  process.env.OPENAI_CLIENT_MODEL || "gpt-5.4"
).trim();
const OPENAI_REPORTER_MODEL = String(
  process.env.OPENAI_REPORTER_MODEL || "gpt-5.2"
).trim();
const ALLOWED_ORIGINS = new Set(
  String(
    process.env.ALLOWED_ORIGINS ||
      "http://localhost:4000,http://127.0.0.1:4000,https://kaso.law,https://www.kaso.law"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);
const audioManager = createGoogleAudioManager({ outputDir: __dirname });

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || "";
  const requestUrl = new URL(req.url || "/", "http://localhost");
  const pathname = requestUrl.pathname;

  if (req.method === "OPTIONS") {
    if (!isAllowedOrigin(origin)) {
      res.writeHead(403);
      res.end();
      return;
    }

    applyCors(res, origin);
    res.writeHead(204);
    res.end();
    return;
  }

  if (!isAllowedOrigin(origin)) {
    writeJson(res, 403, {
      error: "This browser origin is not allowed to use the API.",
    });
    return;
  }

  applyCors(res, origin);

  if (req.method === "GET" && pathname === "/health") {
    writeJson(res, 200, {
      ok: true,
      service: "kaso-law-audio-server",
      googleAudio: audioManager.getCapabilities(),
      briefApi: getBriefCapabilities(),
    });
    return;
  }

  if (req.method === "GET" && pathname === "/api/brief/capabilities") {
    writeJson(res, 200, {
      ok: true,
      capabilities: getBriefCapabilities(),
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/brief/pdf") {
    if (!OPENAI_SITE_API_KEY) {
      writeJson(res, 503, {
        error: "The site OpenAI fallback key is not configured on the server.",
      });
      return;
    }

    try {
      const payload = await readJsonBody(req, 40 * 1024 * 1024);
      const validationError = validatePdfPayload(payload);

      if (validationError) {
        writeJson(res, 400, { error: validationError });
        return;
      }

      const text = await generatePdfFirac({
        apiKey: OPENAI_SITE_API_KEY,
        filename: payload.filename,
        mimeType: payload.mimeType,
        fileDataBase64: payload.fileDataBase64,
        template: payload.template,
        citation: payload.citation,
      });

      writeJson(res, 200, {
        ok: true,
        text,
        model: OPENAI_CLIENT_MODEL,
      });
    } catch (error) {
      writeJson(res, 500, {
        error: normalizeError(error),
      });
    }
    return;
  }

  if (req.method === "POST" && pathname === "/api/brief/citation/resolve") {
    if (!OPENAI_SITE_API_KEY) {
      writeJson(res, 503, {
        error: "The site OpenAI fallback key is not configured on the server.",
      });
      return;
    }

    try {
      const payload = await readJsonBody(req, 1024 * 1024);
      const query = payload && typeof payload.query === "string" ? payload.query.trim() : "";

      if (!query) {
        writeJson(res, 400, { error: "query is required." });
        return;
      }

      const resolution = await resolveCitationCandidates({
        apiKey: OPENAI_SITE_API_KEY,
        query,
        timezone: payload && typeof payload.timezone === "string" ? payload.timezone.trim() : "",
      });

      writeJson(res, 200, {
        ok: true,
        resolution,
        model: OPENAI_REPORTER_MODEL,
      });
    } catch (error) {
      writeJson(res, 500, {
        error: normalizeError(error),
      });
    }
    return;
  }

  if (req.method === "POST" && pathname === "/api/brief/citation/brief") {
    if (!OPENAI_SITE_API_KEY) {
      writeJson(res, 503, {
        error: "The site OpenAI fallback key is not configured on the server.",
      });
      return;
    }

    try {
      const payload = await readJsonBody(req, 2 * 1024 * 1024);
      const validationError = validateResolvedCasePayload(payload);

      if (validationError) {
        writeJson(res, 400, { error: validationError });
        return;
      }

      const result = await generateResolvedCaseBrief({
        apiKey: OPENAI_SITE_API_KEY,
        template: payload.template,
        originalQuery: payload.originalQuery,
        selectedCase: payload.selectedCase,
        timezone: payload.timezone,
      });

      writeJson(res, 200, {
        ok: true,
        result,
        model: OPENAI_REPORTER_MODEL,
      });
    } catch (error) {
      writeJson(res, 500, {
        error: normalizeError(error),
      });
    }
    return;
  }

  if (req.method === "GET" && pathname === "/api/classroom/audio-capabilities") {
    writeJson(res, 200, {
      ok: true,
      capabilities: audioManager.getCapabilities(),
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/classroom/audio-jobs") {
    try {
      const payload = await readJsonBody(req, 80 * 1024 * 1024);
      const job = await audioManager.createJob(payload);

      writeJson(res, 202, {
        ok: true,
        job,
      });
    } catch (error) {
      writeJson(res, 400, {
        error: normalizeError(error),
      });
    }
    return;
  }

  const jobStatusMatch = pathname.match(/^\/api\/classroom\/audio-jobs\/([^/]+)$/);

  if (req.method === "GET" && jobStatusMatch) {
    const jobId = decodeURIComponent(jobStatusMatch[1]);
    const job = await audioManager.getJob(jobId);

    if (!job) {
      writeJson(res, 404, { error: "Audio job not found." });
      return;
    }

    writeJson(res, 200, {
      ok: true,
      job,
    });
    return;
  }

  const jobDownloadMatch = pathname.match(/^\/api\/classroom\/audio-jobs\/([^/]+)\/download$/);

  if (req.method === "GET" && jobDownloadMatch) {
    const jobId = decodeURIComponent(jobDownloadMatch[1]);
    const file = await audioManager.getDownload(jobId);

    if (!file) {
      writeJson(res, 404, { error: "MP3 not ready yet." });
      return;
    }

    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `attachment; filename="${escapeHeaderFilename(file.fileName)}"`,
      "Cache-Control": "no-store",
    });

    const stream = fs.createReadStream(file.filePath);
    stream.pipe(res);
    stream.on("error", (error) => {
      if (!res.headersSent) {
        writeJson(res, 500, { error: normalizeError(error) });
        return;
      }

      res.destroy(error);
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Kaso audio server listening on http://localhost:${PORT}`);
});

function getBriefCapabilities() {
  return {
    configured: Boolean(OPENAI_SITE_API_KEY),
    clientModel: OPENAI_CLIENT_MODEL,
    reporterModel: OPENAI_REPORTER_MODEL,
  };
}

async function generatePdfFirac({ apiKey, filename, mimeType, fileDataBase64, template, citation }) {
  const systemPrompt =
    "You are a precise law-school case briefing assistant. " +
    "Create a full FIRAC brief using only the uploaded opinion. " +
    "Do not use external sources, do not invent facts, and do not include embedded citations or source callouts. " +
    "Return only the finished brief, with bold headings and bullets where appropriate, ready to paste into Microsoft Word.";
  const citationNote = citation ? "\n\nReporter citation supplied by user: " + citation : "";
  const userPrompt =
    "Use the uploaded opinion to complete the following briefing structure. " +
    "If a detail is genuinely unavailable from the opinion, say so briefly instead of guessing.\n\n" +
    "Formatting rules:\n" +
    "- Use bold section headings.\n" +
    "- Use bullets for Procedural History and Facts.\n" +
    "- Do not use horizontal rules.\n" +
    "- Leave a blank line between sections.\n" +
    "- Rely only on the uploaded opinion.\n\n" +
    citationNote +
    "\n\nBriefing template:\n" +
    template;

  const data = await openAiResponsesRequest(apiKey, {
    model: OPENAI_CLIENT_MODEL,
    store: false,
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
  });

  const text = extractOutputText(data).trim();

  if (!text) {
    throw new Error("OpenAI returned an empty response.");
  }

  return text;
}

async function resolveCitationCandidates({ apiKey, query, timezone }) {
  const data = await openAiResponsesRequest(apiKey, {
    model: OPENAI_REPORTER_MODEL,
    store: false,
    reasoning: { effort: "low" },
    tools: [{
      type: "web_search",
      user_location: {
        type: "approximate",
        country: "US",
        timezone: timezone || "America/Chicago",
      },
    }],
    include: ["web_search_call.action.sources"],
    input: [
      {
        role: "system",
        content: [{
          type: "input_text",
          text:
            "You are a precise legal case resolver with web-search access. " +
            "Resolve the user's case search into likely candidate cases. " +
            "Return valid JSON only with the keys resolved_confidently, explanation, and candidates. " +
            "Candidates must be an array of up to 5 objects with the keys case_name, reporter_citation, confidence, short_topic, court_year, and why_this_might_match. " +
            "short_topic must be no more than 10 words. confidence must be an integer from 0 to 100. " +
            "Set resolved_confidently to true only when you are essentially certain which exact case the user means. " +
            "If the user supplied a reporter citation, do not confuse it with nearby citations."
        }],
      },
      {
        role: "user",
        content: [{
          type: "input_text",
          text:
            "User case search: " + query + "\n\n" +
            "Return the best matching cases ranked from most likely to least likely."
        }],
      },
    ],
  });

  const parsed = parseCaseResolutionResult(extractOutputText(data));
  parsed.sources = extractCitationSources(data);
  return parsed;
}

async function generateResolvedCaseBrief({ apiKey, template, originalQuery, selectedCase, timezone }) {
  const selectedCitation = selectedCase && selectedCase.reporter_citation
    ? selectedCase.reporter_citation
    : "";
  const normalizedSelectedCitation = normalizeCitation(selectedCitation);
  const data = await openAiResponsesRequest(apiKey, {
    model: OPENAI_REPORTER_MODEL,
    store: false,
    reasoning: { effort: "low" },
    tools: [{
      type: "web_search",
      user_location: {
        type: "approximate",
        country: "US",
        timezone: timezone || "America/Chicago",
      },
    }],
    include: ["web_search_call.action.sources"],
    input: [
      {
        role: "system",
        content: [{
          type: "input_text",
          text:
            "You are a precise law-school case briefing assistant with web-search access. " +
            "Brief only the exact case selected by the user. " +
            "Use authoritative case text or reliable reproductions of the opinion. Do not guess. " +
            "Return valid JSON only with the keys verified, verified_citation, case_name, mismatch_reason, and brief. " +
            "Set verified to true only if the selected case name and reporter citation match the sources you found. " +
            "If they do not match, set verified to false, explain briefly in mismatch_reason, and leave brief empty. " +
            "The brief itself must have no embedded citations or source callouts."
        }],
      },
      {
        role: "user",
        content: [{
          type: "input_text",
          text:
            "Original user search: " + originalQuery + "\n" +
            "Selected case name: " + String(selectedCase.case_name || "") + "\n" +
            "Selected reporter citation: " + selectedCitation + "\n" +
            "Selected court/year: " + String(selectedCase.court_year || "") + "\n\n" +
            "Before briefing, verify the selected case exactly. Nearby citations or similar case names are not good enough.\n\n" +
            "Use my standard FIRAC instructions and template below.\n\n" +
            "Please use the FIRAC briefing template for this case. Use bold headings, bullets for the procedural history and facts, and plain paragraphs everywhere else. Do not use horizontal rules. Leave one blank line between sections so the result pastes cleanly into Microsoft Word.\n\n" +
            "Stick to the template and rely only on the uploaded opinion or assigned reading. Do not use external sources unless the task is citation-based and you need the opinion text itself. Do not embed citations or source callouts in the response. I already know where the material came from.\n\n" +
            "If the record is unclear on a detail, say so briefly rather than guessing.\n\n" +
            "Use the following briefing template exactly unless a section is genuinely not applicable.\n\n" +
            template
        }],
      },
    ],
  });

  const parsed = parseCitationResult(extractOutputText(data));
  const normalizedVerifiedCitation = normalizeCitation(parsed.verified_citation);

  if (!parsed.verified) {
    throw new Error(
      parsed.mismatch_reason ||
      "I could not verify that the selected case matched an exact case report."
    );
  }

  if (!normalizedSelectedCitation || !normalizedVerifiedCitation || normalizedSelectedCitation !== normalizedVerifiedCitation) {
    throw new Error(
      "Case mismatch: selected " +
      (selectedCitation || selectedCase.case_name || originalQuery) +
      " but the lookup verified " +
      (parsed.verified_citation || "a different citation") +
      "."
    );
  }

  const text = String(parsed.brief || "").trim();

  if (!text) {
    throw new Error("OpenAI verified the case but returned an empty FIRAC response.");
  }

  return {
    text,
    sources: extractCitationSources(data),
    caseName: parsed.case_name || selectedCase.case_name || originalQuery,
  };
}

async function openAiResponsesRequest(apiKey, body) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data && data.error && data.error.message
        ? data.error.message
        : "OpenAI request failed."
    );
  }

  return data;
}

function validatePdfPayload(payload) {
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

  if (!payload.template || typeof payload.template !== "string") {
    return "template is required.";
  }

  if (payload.fileDataBase64.length > 30000000) {
    return "The uploaded file is too large for this lightweight endpoint.";
  }

  return "";
}

function validateResolvedCasePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "Request body must be a JSON object.";
  }

  if (!payload.originalQuery || typeof payload.originalQuery !== "string") {
    return "originalQuery is required.";
  }

  if (!payload.template || typeof payload.template !== "string") {
    return "template is required.";
  }

  if (!payload.selectedCase || typeof payload.selectedCase !== "object") {
    return "selectedCase is required.";
  }

  return "";
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

function extractCitationSources(data) {
  if (!data || !Array.isArray(data.output)) {
    return [];
  }

  const seen = new Set();
  const sources = [];

  data.output.forEach((item) => {
    if (item && item.type === "web_search_call" && item.action && Array.isArray(item.action.sources)) {
      item.action.sources.forEach(pushSource);
    }

    if (!Array.isArray(item.content)) {
      return;
    }

    item.content.forEach((contentItem) => {
      if (!Array.isArray(contentItem.annotations)) {
        return;
      }

      contentItem.annotations.forEach((annotation) => {
        pushSource(annotation);
      });
    });
  });

  return sources;

  function pushSource(source) {
    const url = source && typeof source.url === "string" ? source.url.trim() : "";
    const title = source && typeof source.title === "string" ? source.title.trim() : "";

    if (!url || seen.has(url)) {
      return;
    }

    seen.add(url);
    sources.push({
      url,
      title: title || url,
    });
  }
}

function parseCaseResolutionResult(rawText) {
  const parsed = parseJsonBlock(rawText, "OpenAI returned a case-resolution result that was not valid JSON.");
  const candidates = Array.isArray(parsed.candidates) ? parsed.candidates : [];

  return {
    resolved_confidently: Boolean(parsed.resolved_confidently),
    explanation: String(parsed.explanation || "").trim(),
    candidates: candidates
      .map((candidate) => ({
        case_name: String(candidate.case_name || "").trim(),
        reporter_citation: String(candidate.reporter_citation || "").trim(),
        confidence: clampConfidence(candidate.confidence),
        short_topic: String(candidate.short_topic || "").trim().split(/\s+/).slice(0, 10).join(" "),
        court_year: String(candidate.court_year || "").trim(),
        why_this_might_match: String(candidate.why_this_might_match || "").trim(),
      }))
      .filter((candidate) => candidate.case_name || candidate.reporter_citation)
      .slice(0, 5),
  };
}

function parseCitationResult(rawText) {
  return parseJsonBlock(rawText, "OpenAI returned a citation result that was not valid JSON.");
}

function parseJsonBlock(rawText, invalidMessage) {
  const text = String(rawText || "").trim();

  if (!text) {
    throw new Error("OpenAI returned an empty citation verification response.");
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (innerError) {
      throw new Error(invalidMessage);
    }
  }
}

function normalizeCitation(value) {
  const raw = String(value || "").toUpperCase().trim();
  const match = raw.match(/(\d+)\s+([A-Z.]+)\s+(\d+)/);

  if (!match) {
    return raw.replace(/\s+/g, " ");
  }

  const volume = match[1];
  const reporter = match[2].replace(/\./g, "");
  const page = match[3];
  return [volume, reporter, page].join(" ");
}

function clampConfidence(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(numeric)));
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

function isAllowedOrigin(origin) {
  return !origin || ALLOWED_ORIGINS.has(origin);
}

function writeJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req, maxBytes) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (Buffer.byteLength(body) > maxBytes) {
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

function escapeHeaderFilename(value) {
  return String(value || "class-audio.mp3").replace(/["]+/g, "");
}

function normalizeError(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unexpected server error.";
}
