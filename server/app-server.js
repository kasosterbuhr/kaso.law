const http = require("http");
const fs = require("fs");
const path = require("path");
const { createGoogleAudioManager } = require("./google-audio");

loadEnvFile(path.join(__dirname, ".env"));

const PORT = Number(process.env.PORT || 8787);
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
    });
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
