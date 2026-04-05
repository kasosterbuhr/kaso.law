const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const MAX_FILES = 5;
const MAX_TOTAL_FILE_BYTES = 30 * 1024 * 1024;
const DEFAULT_TTL_HOURS = 24;
const PODCAST_LENGTHS = new Set(["SHORT", "STANDARD"]);
const DELIVERY_MODES = new Set(["podcast", "notebook", "both"]);
const SUPPORTED_MIME_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "text/markdown",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
]);
const SHARE_ROLE_LABELS = {
  reader: "PROJECT_ROLE_READER",
  viewer: "PROJECT_ROLE_READER",
  writer: "PROJECT_ROLE_WRITER",
  editor: "PROJECT_ROLE_WRITER"
};

module.exports = {
  createGoogleAudioManager,
};

function createGoogleAudioManager(options) {
  const outputDir = path.join(
    (options && options.outputDir) || __dirname,
    "generated-audio"
  );
  const ttlHours = Math.max(
    1,
    Number(process.env.AUDIO_JOB_TTL_HOURS || DEFAULT_TTL_HOURS)
  );
  const jobTtlMs = ttlHours * 60 * 60 * 1000;
  const jobs = new Map();
  const config = buildGoogleAudioConfig();
  const tokenCache = {
    accessToken: "",
    expiresAt: 0,
  };

  fs.mkdirSync(outputDir, { recursive: true });

  return {
    getCapabilities,
    createJob,
    getJob,
    getDownload,
  };

  function getCapabilities() {
    const hasSharedCredentials = Boolean(
      config.clientEmail && config.privateKey && (config.projectId || config.projectNumber)
    );
    const podcastEnabled = Boolean(hasSharedCredentials && config.projectId);
    const notebookEnabled = Boolean(hasSharedCredentials && config.projectNumber);

    return {
      configured: podcastEnabled || notebookEnabled,
      podcastEnabled,
      notebookEnabled,
      location: config.location,
      notebookIdentityMode: config.notebookIdentityMode,
      maxFiles: MAX_FILES,
      supportedMimeTypes: Array.from(SUPPORTED_MIME_TYPES),
      maxTotalFileBytes: MAX_TOTAL_FILE_BYTES,
      notes: [
        "Podcast API can return a downloadable MP3, but Google currently keeps that API on an allowlist.",
        "NotebookLM notebook links work only for users in the same Google Cloud project or workforce pool who already have the required NotebookLM access and license.",
      ],
      credentialSource: config.credentialSource,
      missingFields: collectMissingFields(),
    };
  }

  async function createJob(payload) {
    cleanupExpiredJobs();

    const capabilities = getCapabilities();
    const request = normalizeAudioRequest(payload, capabilities);
    const jobId = createJobId();
    const slug = sanitizeSlug(request.title || deriveTitleFromFiles(request.files));
    const job = {
      id: jobId,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + jobTtlMs).toISOString(),
      title: request.title,
      description: request.description,
      focus: request.focus,
      languageCode: request.languageCode,
      length: request.length,
      deliveryMode: request.deliveryMode,
      status: "queued",
      note: "",
      error: "",
      warnings: [],
      files: request.files.map((file) => ({
        filename: file.filename,
        mimeType: file.mimeType,
        sizeBytes: file.sizeBytes,
      })),
      podcast:
        request.deliveryMode === "podcast" || request.deliveryMode === "both"
          ? {
              status: "queued",
              operationName: "",
              fileName: slug + ".mp3",
              filePath: "",
              sizeBytes: 0,
              error: "",
              lastCheckedAt: "",
            }
          : null,
      notebook:
        request.deliveryMode === "notebook" || request.deliveryMode === "both"
          ? {
              status: "queued",
              notebookId: "",
              notebookName: "",
              notebookUrl: "",
              shareEmails: request.shareEmails,
              shareRole: request.shareRole,
              audioOverviewStatus: "",
              sourceIds: [],
              error: "",
            }
          : null,
    };

    jobs.set(jobId, job);

    void kickOffJob(job, request.files, request).catch((error) => {
      handleJobFailure(job, normalizeError(error));
    });

    return serializeJob(job);
  }

  async function getJob(jobId) {
    cleanupExpiredJobs();
    const job = jobs.get(String(jobId || ""));

    if (!job) {
      return null;
    }

    await refreshJob(job);
    return serializeJob(job);
  }

  async function getDownload(jobId) {
    cleanupExpiredJobs();
    const job = jobs.get(String(jobId || ""));

    if (!job || !job.podcast || job.podcast.status !== "ready") {
      return null;
    }

    if (!job.podcast.filePath || !fs.existsSync(job.podcast.filePath)) {
      return null;
    }

    return {
      filePath: job.podcast.filePath,
      fileName: job.podcast.fileName || "class-audio.mp3",
    };
  }

  function cleanupExpiredJobs() {
    const now = Date.now();

    for (const [jobId, job] of jobs.entries()) {
      const expiresAt = Date.parse(job.expiresAt);

      if (!Number.isFinite(expiresAt) || expiresAt > now) {
        continue;
      }

      if (job.podcast && job.podcast.filePath && fs.existsSync(job.podcast.filePath)) {
        try {
          fs.unlinkSync(job.podcast.filePath);
        } catch (error) {
          // Ignore cleanup misses so the job map can still be trimmed.
        }
      }

      jobs.delete(jobId);
    }
  }

  function collectMissingFields() {
    const missing = [];

    if (!config.clientEmail) {
      missing.push("service account email");
    }

    if (!config.privateKey) {
      missing.push("service account private key");
    }

    if (!config.projectId) {
      missing.push("GOOGLE_CLOUD_PROJECT_ID");
    }

    if (!config.projectNumber) {
      missing.push("GOOGLE_CLOUD_PROJECT_NUMBER");
    }

    return missing;
  }

  function serializeJob(job) {
    return {
      id: job.id,
      title: job.title,
      description: job.description,
      focus: job.focus,
      languageCode: job.languageCode,
      length: job.length,
      deliveryMode: job.deliveryMode,
      status: job.status,
      ready: job.status === "ready",
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      expiresAt: job.expiresAt,
      files: job.files,
      note: job.note,
      error: job.error,
      warnings: job.warnings,
      podcast: job.podcast
        ? {
            status: job.podcast.status,
            operationName: job.podcast.operationName,
            fileName: job.podcast.fileName,
            sizeBytes: job.podcast.sizeBytes,
            error: job.podcast.error,
            lastCheckedAt: job.podcast.lastCheckedAt,
            downloadPath:
              job.podcast.status === "ready"
                ? `/api/classroom/audio-jobs/${job.id}/download`
                : "",
          }
        : null,
      notebook: job.notebook
        ? {
            status: job.notebook.status,
            notebookId: job.notebook.notebookId,
            notebookName: job.notebook.notebookName,
            notebookUrl: job.notebook.notebookUrl,
            shareEmails: job.notebook.shareEmails,
            shareRole: job.notebook.shareRole,
            audioOverviewStatus: job.notebook.audioOverviewStatus,
            sourceIds: job.notebook.sourceIds,
            error: job.notebook.error,
          }
        : null,
    };
  }

  async function kickOffJob(job, files, request) {
    updateJob(job, {
      status: "processing",
      note:
        request.deliveryMode === "podcast"
          ? "Sending your reading packet to Google for podcast generation."
          : request.deliveryMode === "notebook"
            ? "Creating your NotebookLM notebook and requesting the audio overview."
            : "Creating the notebook and the MP3 job in parallel.",
    });

    let deliveredSomething = false;

    if (job.notebook) {
      try {
        await kickOffNotebook(job, files, request);
        deliveredSomething = true;
      } catch (error) {
        job.notebook.status = "failed";
        job.notebook.error = normalizeError(error);
        pushWarning(job, "NotebookLM request failed: " + job.notebook.error);
      }
    }

    if (job.podcast) {
      try {
        await kickOffPodcast(job, files, request);
        deliveredSomething = true;
      } catch (error) {
        job.podcast.status = "failed";
        job.podcast.error = normalizeError(error);
        pushWarning(job, "Podcast request failed: " + job.podcast.error);
      }
    }

    if (!deliveredSomething) {
      handleJobFailure(job, job.warnings[job.warnings.length - 1] || "Google audio job failed.");
      return;
    }

    if (job.podcast && job.podcast.status === "processing") {
      updateJob(job, {
        status: "processing",
        note:
          job.notebook && job.notebook.notebookUrl
            ? "Notebook link is ready. The MP3 is still rendering."
            : "Google accepted the podcast job. The MP3 is still rendering.",
      });
      return;
    }

    updateJob(job, {
      status: "ready",
      note:
        job.notebook && job.notebook.notebookUrl
          ? "Notebook link is ready. Open it in NotebookLM and give Studio a moment to finish the audio overview."
          : "The audio job finished.",
    });
  }

  async function refreshJob(job) {
    if (!job || !job.podcast || job.podcast.status !== "processing") {
      return;
    }

    try {
      const operation = await getPodcastOperation(job.podcast.operationName);
      job.podcast.lastCheckedAt = new Date().toISOString();

      if (!operation || !operation.done) {
        touchJob(job);
        return;
      }

      if (operation.error) {
        const message = getGoogleOperationError(operation);
        job.podcast.status = "failed";
        job.podcast.error = message;
        pushWarning(job, "Podcast generation failed: " + message);

        if (job.notebook && job.notebook.status === "ready") {
          updateJob(job, {
            status: "ready",
            note:
              "Notebook link is still available, but Google did not finish the MP3 render.",
          });
          return;
        }

        handleJobFailure(job, "Podcast generation failed: " + message);
        return;
      }

      const audioBuffer = await downloadPodcast(job.podcast.operationName);
      const filePath = path.join(outputDir, job.id + ".mp3");

      fs.writeFileSync(filePath, audioBuffer);

      job.podcast.status = "ready";
      job.podcast.filePath = filePath;
      job.podcast.sizeBytes = audioBuffer.length;
      job.podcast.error = "";

      updateJob(job, {
        status: "ready",
        note:
          job.notebook && job.notebook.notebookUrl
            ? "MP3 ready. Your NotebookLM link is also ready."
            : "MP3 ready to download.",
      });
    } catch (error) {
      const message = normalizeError(error);
      job.podcast.status = "failed";
      job.podcast.error = message;

      if (job.notebook && job.notebook.status === "ready") {
        pushWarning(job, "Podcast refresh failed: " + message);
        updateJob(job, {
          status: "ready",
          note:
            "Notebook link is ready, but the MP3 could not be refreshed from Google.",
        });
        return;
      }

      handleJobFailure(job, message);
    }
  }

  async function kickOffPodcast(job, files, request) {
    if (!config.projectId) {
      throw new Error("GOOGLE_CLOUD_PROJECT_ID is required for podcast jobs.");
    }

    const contexts = files.map((file) => ({
      inlineData: {
        mimeType: file.mimeType,
        data: file.fileDataBase64,
      },
    }));

    if (request.contextNote) {
      contexts.unshift({ text: request.contextNote });
    }

    const response = await googleRequestJson({
      method: "POST",
      url:
        "https://discoveryengine.googleapis.com/v1/projects/" +
        encodeURIComponent(config.projectId) +
        "/locations/global/podcasts",
      body: {
        podcastConfig: buildPodcastConfig(request),
        contexts,
        title: job.title,
        description: job.description || "Generated from uploaded case materials.",
      },
    });

    if (!response || !response.name) {
      throw new Error("Google did not return a podcast operation name.");
    }

    job.podcast.status = "processing";
    job.podcast.operationName = response.name;
    job.podcast.error = "";
    touchJob(job);
  }

  async function kickOffNotebook(job, files, request) {
    if (!config.projectNumber) {
      throw new Error("GOOGLE_CLOUD_PROJECT_NUMBER is required for NotebookLM jobs.");
    }

    const notebook = await googleRequestJson({
      method: "POST",
      url: getNotebookApiBase() + "/notebooks",
      body: {
        title: job.title,
      },
    });

    if (!notebook || !notebook.notebookId) {
      throw new Error("Google did not return a notebook ID.");
    }

    job.notebook.status = "uploading_sources";
    job.notebook.notebookId = notebook.notebookId;
    job.notebook.notebookName = notebook.name || "";
    job.notebook.notebookUrl = buildNotebookUrl(notebook.notebookId);
    touchJob(job);

    const sourceIds = [];

    for (const file of files) {
      const upload = await googleUploadNotebookFile(notebook.notebookId, file);

      if (!upload || !upload.sourceId || !upload.sourceId.id) {
        throw new Error("Google accepted the notebook upload but did not return a source ID.");
      }

      sourceIds.push(upload.sourceId.id);
    }

    job.notebook.sourceIds = sourceIds;
    job.notebook.status = "creating_audio_overview";
    touchJob(job);

    if (request.shareEmails.length > 0) {
      await shareNotebook(notebook.notebookId, request.shareEmails, request.shareRole);
    }

    const audioOverview = await googleRequestJson({
      method: "POST",
      url:
        getNotebookApiBase() +
        "/notebooks/" +
        encodeURIComponent(notebook.notebookId) +
        "/audioOverviews",
      body: buildAudioOverviewBody(request, sourceIds),
    });

    job.notebook.status = "ready";
    job.notebook.audioOverviewStatus =
      audioOverview &&
      audioOverview.audioOverview &&
      audioOverview.audioOverview.status
        ? audioOverview.audioOverview.status
        : "AUDIO_OVERVIEW_STATUS_IN_PROGRESS";
    job.notebook.error = "";
    touchJob(job);
  }

  async function googleUploadNotebookFile(notebookId, file) {
    const accessToken = await getGoogleAccessToken();
    const response = await fetch(
      getNotebookUploadBase() +
        "/notebooks/" +
        encodeURIComponent(notebookId) +
        "/sources:uploadFile",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "X-Goog-Upload-File-Name": file.filename,
          "X-Goog-Upload-Protocol": "raw",
          "Content-Type": file.mimeType,
        },
        body: Buffer.from(file.fileDataBase64, "base64"),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      throw new Error(parseGoogleErrorText(text) || "Notebook source upload failed.");
    }

    return text ? JSON.parse(text) : {};
  }

  async function shareNotebook(notebookId, shareEmails, shareRole) {
    const accountAndRoles = shareEmails.map((email) => ({
      email,
      role: shareRole,
    }));

    await googleRequestJson({
      method: "POST",
      url:
        getNotebookApiBase() +
        "/notebooks/" +
        encodeURIComponent(notebookId) +
        ":share",
      body: {
        accountAndRoles,
      },
    });
  }

  async function getPodcastOperation(operationName) {
    return googleRequestJson({
      method: "GET",
      url:
        "https://discoveryengine.googleapis.com/v1/" +
        stripLeadingSlashes(operationName),
    });
  }

  async function downloadPodcast(operationName) {
    const accessToken = await getGoogleAccessToken();
    const response = await fetch(
      "https://discoveryengine.googleapis.com/v1/" +
        stripLeadingSlashes(operationName) +
        ":download?alt=media",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(parseGoogleErrorText(text) || "Podcast download failed.");
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async function googleRequestJson(options) {
    const accessToken = await getGoogleAccessToken();
    const requestHeaders = Object.assign(
      {
        Authorization: "Bearer " + accessToken,
      },
      options && options.body
        ? { "Content-Type": "application/json" }
        : {},
      (options && options.headers) || {}
    );
    const response = await fetch(options.url, {
      method: options.method,
      headers: requestHeaders,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const text = await response.text();

    if (!response.ok) {
      throw new Error(parseGoogleErrorText(text) || "Google request failed.");
    }

    return text ? JSON.parse(text) : {};
  }

  async function getGoogleAccessToken() {
    const now = Math.floor(Date.now() / 1000);

    if (tokenCache.accessToken && tokenCache.expiresAt - 60 > now) {
      return tokenCache.accessToken;
    }

    if (!config.clientEmail || !config.privateKey) {
      throw new Error(
        "Google credentials are missing. Set GOOGLE_SERVICE_ACCOUNT_JSON or the separate service account env vars."
      );
    }

    const assertion = createServiceAccountAssertion(config.clientEmail, config.privateKey, now);
    const body = new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    });
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(
        data && data.error_description
          ? data.error_description
          : data && data.error
            ? String(data.error)
            : "Unable to mint a Google access token."
      );
    }

    tokenCache.accessToken = data.access_token || "";
    tokenCache.expiresAt = now + Number(data.expires_in || 3600);

    if (!tokenCache.accessToken) {
      throw new Error("Google token exchange succeeded but no access token was returned.");
    }

    return tokenCache.accessToken;
  }

  function getNotebookApiBase() {
    return (
      "https://" +
      config.location +
      "-discoveryengine.googleapis.com/v1alpha/projects/" +
      encodeURIComponent(config.projectNumber) +
      "/locations/" +
      encodeURIComponent(config.location)
    );
  }

  function getNotebookUploadBase() {
    return (
      "https://" +
      config.location +
      "-discoveryengine.googleapis.com/upload/v1alpha/projects/" +
      encodeURIComponent(config.projectNumber) +
      "/locations/" +
      encodeURIComponent(config.location)
    );
  }

  function buildNotebookUrl(notebookId) {
    const baseHost =
      config.notebookIdentityMode === "third_party"
        ? "https://notebooklm.cloud.google"
        : "https://notebooklm.cloud.google.com";

    return (
      baseHost +
      "/" +
      encodeURIComponent(config.location) +
      "/notebook/" +
      encodeURIComponent(notebookId) +
      "?project=" +
      encodeURIComponent(config.projectNumber)
    );
  }
}

function buildGoogleAudioConfig() {
  const serviceAccount = readServiceAccountConfig();
  const location = String(process.env.GOOGLE_CLOUD_LOCATION || "global")
    .trim()
    .toLowerCase();
  const notebookIdentityMode = String(
    process.env.NOTEBOOKLM_UI_IDENTITY_MODE || "google"
  )
    .trim()
    .toLowerCase();

  return {
    clientEmail: serviceAccount.clientEmail,
    privateKey: serviceAccount.privateKey,
    projectId: String(
      process.env.GOOGLE_CLOUD_PROJECT_ID || serviceAccount.projectId || ""
    ).trim(),
    projectNumber: String(process.env.GOOGLE_CLOUD_PROJECT_NUMBER || "").trim(),
    location: location || "global",
    notebookIdentityMode:
      notebookIdentityMode === "third_party" ? "third_party" : "google",
    credentialSource: serviceAccount.source,
  };
}

function readServiceAccountConfig() {
  const jsonBase64 = String(process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 || "").trim();
  const jsonInline = String(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "").trim();

  if (jsonBase64 || jsonInline) {
    const raw = jsonBase64
      ? Buffer.from(jsonBase64, "base64").toString("utf8")
      : jsonInline;
    const parsed = JSON.parse(raw);

    return {
      clientEmail: String(parsed.client_email || "").trim(),
      privateKey: normalizePrivateKey(parsed.private_key || ""),
      projectId: String(parsed.project_id || "").trim(),
      source: jsonBase64
        ? "GOOGLE_SERVICE_ACCOUNT_JSON_BASE64"
        : "GOOGLE_SERVICE_ACCOUNT_JSON",
    };
  }

  return {
    clientEmail: String(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "").trim(),
    privateKey: normalizePrivateKey(
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || ""
    ),
    projectId: "",
    source:
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
        ? "separate service account env vars"
        : "not configured",
  };
}

function normalizePrivateKey(value) {
  return String(value || "").replace(/\\n/g, "\n").trim();
}

function normalizeAudioRequest(payload, capabilities) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Request body must be a JSON object.");
  }

  const deliveryMode = String(payload.deliveryMode || "podcast")
    .trim()
    .toLowerCase();

  if (!DELIVERY_MODES.has(deliveryMode)) {
    throw new Error("deliveryMode must be podcast, notebook, or both.");
  }

  if (
    (deliveryMode === "podcast" || deliveryMode === "both") &&
    !capabilities.podcastEnabled
  ) {
    throw new Error(
      "Podcast mode is not configured on the server yet. Add Google Cloud podcast credentials first."
    );
  }

  if (
    (deliveryMode === "notebook" || deliveryMode === "both") &&
    !capabilities.notebookEnabled
  ) {
    throw new Error(
      "Notebook mode is not configured on the server yet. Add NotebookLM Enterprise credentials first."
    );
  }

  const rawFiles = Array.isArray(payload.files) ? payload.files : [];

  if (rawFiles.length === 0) {
    throw new Error("Upload at least one file.");
  }

  if (rawFiles.length > MAX_FILES) {
    throw new Error("Upload no more than " + MAX_FILES + " files at a time.");
  }

  const files = rawFiles.map(normalizeIncomingFile);
  const totalBytes = files.reduce((sum, file) => sum + file.sizeBytes, 0);

  if (totalBytes > MAX_TOTAL_FILE_BYTES) {
    throw new Error(
      "The uploaded packet is too large for this lightweight endpoint. Keep the total under " +
        MAX_TOTAL_FILE_BYTES +
        " bytes."
    );
  }

  const title = sanitizeTitle(
    typeof payload.title === "string" && payload.title.trim()
      ? payload.title.trim()
      : deriveTitleFromFiles(files)
  );
  const description =
    typeof payload.description === "string" ? payload.description.trim().slice(0, 600) : "";
  const focus =
    typeof payload.focus === "string" ? payload.focus.trim().slice(0, 1000) : "";
  const languageCode =
    typeof payload.languageCode === "string"
      ? payload.languageCode.trim().slice(0, 32)
      : "";
  const length = String(payload.length || "STANDARD")
    .trim()
    .toUpperCase();
  const contextNote =
    typeof payload.contextNote === "string"
      ? payload.contextNote.trim().slice(0, 2000)
      : "";

  if (!PODCAST_LENGTHS.has(length)) {
    throw new Error("length must be SHORT or STANDARD.");
  }

  const shareEmails = normalizeShareEmails(payload.shareEmails);
  const shareRole = normalizeShareRole(payload.shareRole);

  return {
    title,
    description,
    focus,
    languageCode,
    length,
    contextNote,
    deliveryMode,
    shareEmails,
    shareRole,
    files,
  };
}

function normalizeIncomingFile(file) {
  if (!file || typeof file !== "object") {
    throw new Error("Each file must be a JSON object.");
  }

  const filename = sanitizeUploadFilename(file.filename);
  const mimeType = String(file.mimeType || "").trim().toLowerCase();
  const rawBase64 =
    typeof file.fileDataBase64 === "string" ? file.fileDataBase64.trim() : "";
  const fileDataBase64 = rawBase64.replace(/^data:[^,]+,/, "");

  if (!filename) {
    throw new Error("Every file needs a filename.");
  }

  if (!SUPPORTED_MIME_TYPES.has(mimeType)) {
    throw new Error(
      "Unsupported file type for " +
        filename +
        ". Supported MIME types are: " +
        Array.from(SUPPORTED_MIME_TYPES).join(", ")
    );
  }

  if (!fileDataBase64) {
    throw new Error("Every file needs base64 content.");
  }

  const sizeBytes = Buffer.byteLength(fileDataBase64, "base64");

  if (!sizeBytes) {
    throw new Error("The uploaded file " + filename + " appears to be empty.");
  }

  return {
    filename,
    mimeType,
    fileDataBase64,
    sizeBytes,
  };
}

function normalizeShareEmails(value) {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/[\s,;]+/)
      : [];

  const emails = rawValues
    .map((item) => String(item || "").trim().toLowerCase())
    .filter(Boolean);
  const deduped = Array.from(new Set(emails));

  deduped.forEach((email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid share email: " + email);
    }
  });

  return deduped.slice(0, 10);
}

function normalizeShareRole(value) {
  const raw = String(value || "reader")
    .trim()
    .toLowerCase();

  return SHARE_ROLE_LABELS[raw] || "PROJECT_ROLE_READER";
}

function buildPodcastConfig(request) {
  const config = {
    length: request.length,
  };

  if (request.focus) {
    config.focus = request.focus;
  }

  if (request.languageCode) {
    config.languageCode = request.languageCode;
  }

  return config;
}

function buildAudioOverviewBody(request, sourceIds) {
  const body = {};

  if (Array.isArray(sourceIds) && sourceIds.length > 0) {
    body.sourceIds = sourceIds.map((id) => ({ id }));
  }

  if (request.focus) {
    body.episodeFocus = request.focus;
  }

  if (request.languageCode) {
    body.languageCode = request.languageCode;
  }

  return body;
}

function createServiceAccountAssertion(clientEmail, privateKey, now) {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const payload = {
    iss: clientEmail,
    sub: clientEmail,
    aud: "https://oauth2.googleapis.com/token",
    scope: "https://www.googleapis.com/auth/cloud-platform",
    iat: now,
    exp: now + 3600,
  };
  const encodedHeader = toBase64Url(Buffer.from(JSON.stringify(header), "utf8"));
  const encodedPayload = toBase64Url(Buffer.from(JSON.stringify(payload), "utf8"));
  const signingInput = encodedHeader + "." + encodedPayload;
  const signer = crypto.createSign("RSA-SHA256");

  signer.update(signingInput);
  signer.end();

  const signature = signer.sign(privateKey);
  return signingInput + "." + toBase64Url(signature);
}

function sanitizeUploadFilename(value) {
  return String(value || "")
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

function sanitizeTitle(value) {
  return String(value || "Case Packet Audio")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function deriveTitleFromFiles(files) {
  if (!Array.isArray(files) || files.length === 0) {
    return "Case Packet Audio";
  }

  if (files.length === 1) {
    return files[0].filename.replace(/\.[^.]+$/g, "");
  }

  return files[0].filename.replace(/\.[^.]+$/g, "") + " and class packet";
}

function sanitizeSlug(value) {
  return (
    String(value || "class-audio")
      .toLowerCase()
      .replace(/[^a-z0-9\-_ ]+/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 80) || "class-audio"
  );
}

function updateJob(job, updates) {
  Object.assign(job, updates);
  touchJob(job);
}

function touchJob(job) {
  job.updatedAt = new Date().toISOString();
}

function handleJobFailure(job, message) {
  updateJob(job, {
    status: "failed",
    error: String(message || "Google audio job failed."),
    note: "",
  });
}

function pushWarning(job, message) {
  if (!job.warnings.includes(message)) {
    job.warnings.push(message);
  }

  touchJob(job);
}

function createJobId() {
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : crypto.randomBytes(16).toString("hex");
}

function getGoogleOperationError(operation) {
  if (
    operation &&
    operation.error &&
    typeof operation.error.message === "string" &&
    operation.error.message
  ) {
    return operation.error.message;
  }

  if (
    operation &&
    operation.error &&
    typeof operation.error.code !== "undefined"
  ) {
    return "Google operation failed with code " + String(operation.error.code) + ".";
  }

  return "Google operation failed.";
}

function parseGoogleErrorText(text) {
  if (!text) {
    return "";
  }

  try {
    const parsed = JSON.parse(text);

    if (parsed && parsed.error && typeof parsed.error.message === "string") {
      return parsed.error.message;
    }

    if (parsed && typeof parsed.message === "string") {
      return parsed.message;
    }
  } catch (error) {
    return String(text).trim();
  }

  return String(text).trim();
}

function stripLeadingSlashes(value) {
  return String(value || "").replace(/^\/+/, "");
}

function toBase64Url(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function normalizeError(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return String(error || "Unexpected server error.");
}
