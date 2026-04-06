---
layout: default
title: AI FIRAC
---

<style>
  .brief-tool {
    --ink: #10243a;
    --muted: #55697d;
    --line: #cfdae4;
    --panel: #ffffff;
    --panel-soft: #f5f8fb;
    --accent: #0d5ea6;
    --accent-dark: #09487f;
    --danger: #b42318;
    --success: #18794e;
    --warn-bg: #fff3cd;
    --warn-line: #f0d48a;
    --warn-ink: #6a4a00;
    display: grid;
    gap: 22px;
  }

  .brief-hero,
  .brief-panel,
  .brief-output {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 22px;
    padding: 24px;
    box-shadow: 0 16px 36px rgba(16, 36, 58, 0.07);
  }

  .brief-hero {
    background:
      radial-gradient(circle at top right, rgba(13, 94, 166, 0.18), transparent 32%),
      linear-gradient(135deg, #f9fcff 0%, #eef5fb 100%);
  }

  .brief-kicker {
    display: inline-block;
    padding: 7px 11px;
    border-radius: 999px;
    background: rgba(13, 94, 166, 0.1);
    color: var(--accent-dark);
    font-size: 0.83rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .brief-warning {
    background: var(--warn-bg);
    border: 1px solid var(--warn-line);
    color: var(--warn-ink);
    border-radius: 16px;
    padding: 16px 18px;
    font-weight: 600;
  }

  .brief-hero h1,
  .brief-output h2 {
    margin: 14px 0 12px;
  }

  .brief-hero p,
  .brief-help,
  .brief-note,
  .brief-meta {
    color: var(--muted);
  }

  .brief-form,
  .brief-source-grid {
    display: grid;
    gap: 18px;
  }

  .brief-source-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .brief-connect-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 12px;
    align-items: end;
  }

  .brief-field {
    display: grid;
    gap: 8px;
  }

  .brief-field label {
    color: var(--ink);
    font-weight: 700;
  }

  .brief-field input[type="text"],
  .brief-field input[type="password"],
  .brief-field input[type="file"] {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border: 1px solid var(--line);
    border-radius: 14px;
    font: inherit;
    background: #ffffff;
  }

  .brief-field input.is-saved {
    background: #eef8f2;
    border-color: rgba(24, 121, 78, 0.35);
    color: var(--success);
    font-weight: 700;
  }

  .brief-pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .brief-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 11px;
    border-radius: 999px;
    background: rgba(13, 94, 166, 0.08);
    color: var(--accent-dark);
    font-size: 0.84rem;
    font-weight: 700;
  }

  .brief-connection {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 1.25rem;
    color: var(--muted);
    font-weight: 600;
  }

  .brief-connection.connected {
    color: var(--success);
  }

  .brief-connection.disconnected {
    color: var(--danger);
  }

  .brief-dropzone {
    display: grid;
    gap: 8px;
    place-items: center;
    min-height: 180px;
    padding: 22px;
    border: 2px dashed #8cb4da;
    border-radius: 20px;
    background: var(--panel-soft);
    text-align: center;
    cursor: pointer;
    transition: border-color 0.18s ease, background-color 0.18s ease, transform 0.18s ease;
  }

  .brief-dropzone:hover,
  .brief-dropzone.is-active {
    border-color: var(--accent);
    background: #edf5ff;
    transform: translateY(-1px);
  }

  .brief-file-name {
    color: var(--ink);
    font-weight: 700;
  }

  .brief-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .brief-button,
  .brief-button-secondary {
    appearance: none;
    border: none;
    border-radius: 14px;
    padding: 12px 16px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.18s ease, background-color 0.18s ease, opacity 0.18s ease;
  }

  .brief-button {
    background: var(--accent);
    color: #ffffff;
  }

  .brief-button:hover,
  .brief-button:focus-visible,
  .brief-button-secondary:hover,
  .brief-button-secondary:focus-visible {
    transform: translateY(-1px);
  }

  .brief-button:hover,
  .brief-button:focus-visible {
    background: var(--accent-dark);
  }

  .brief-button[disabled],
  .brief-button-secondary[disabled] {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  .brief-button-secondary {
    background: var(--panel-soft);
    color: var(--ink);
    border: 1px solid var(--line);
  }

  .brief-status {
    min-height: 1.4rem;
    font-weight: 600;
    color: var(--accent-dark);
  }

  .brief-status.error {
    color: var(--danger);
  }

  .brief-output pre {
    margin: 0;
    padding: 18px;
    border-radius: 16px;
    background: var(--panel-soft);
    white-space: pre-wrap;
    word-break: normal;
    color: #17324d;
  }

  .brief-sources {
    margin-top: 16px;
    padding: 18px;
    border-radius: 16px;
    border: 1px solid var(--line);
    background: var(--panel-soft);
  }

  .brief-sources h3 {
    margin: 0 0 10px;
    color: var(--ink);
    font-size: 1rem;
  }

  .brief-sources ul {
    margin: 0;
    padding-left: 18px;
  }

  .brief-sources a {
    color: var(--accent-dark);
  }

  .brief-modal[hidden] {
    display: none;
  }

  .brief-modal {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(16, 36, 58, 0.48);
  }

  .brief-modal-panel {
    width: min(920px, 100%);
    max-height: min(86vh, 900px);
    overflow: auto;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 24px 48px rgba(16, 36, 58, 0.22);
  }

  .brief-modal-panel h3 {
    margin: 0 0 10px;
  }

  .brief-case-list {
    display: grid;
    gap: 14px;
    margin-top: 18px;
  }

  .brief-case-card {
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 18px;
    background: var(--panel-soft);
  }

  .brief-case-head {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
  }

  .brief-case-name {
    color: var(--ink);
    font-weight: 800;
  }

  .brief-case-meta,
  .brief-case-note {
    margin-top: 8px;
    color: var(--muted);
  }

  .brief-case-actions {
    margin-top: 14px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 760px) {
    .brief-connect-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .brief-hero,
    .brief-panel,
    .brief-output {
      padding: 20px;
    }

    .brief-actions {
      flex-direction: column;
    }

    .brief-button,
    .brief-button-secondary {
      width: 100%;
    }
  }
</style>

<div class="brief-tool">
  <section class="brief-hero">
    <span class="brief-kicker">Function-First FIRAC</span>
    <h1>AI FIRAC Builder</h1>
    <p>
      Drop in a case opinion PDF or type a reporter citation, run your standard FIRAC packet, and copy or download the finished brief as text, Word, or PDF.
    </p>
  </section>

  <div class="brief-warning">
    This prototype can use a built-in site key if you add one in site config, or a browser-saved key if you prefer. A built-in browser key is inspectable, so keep your guardrails tight and treat this as a function-first prototype.
  </div>

  <section class="brief-panel">
    <form class="brief-form" id="brief-form">
      <div class="brief-field">
        <label for="access-mode">Access Mode</label>
        <input id="access-mode" name="access-mode" type="text" value="Checking key source..." readonly>
        <div class="brief-pill-row">
          <span class="brief-pill">PDF model: <span id="openai-model-label"></span></span>
          <span class="brief-pill">Citation model: <span id="reporter-model-label"></span></span>
        </div>
      </div>

      <div class="brief-field">
        <label for="api-key">Optional Browser Key</label>
        <div class="brief-connect-grid">
          <input id="api-key" name="api-key" type="password" placeholder="Paste an OpenAI API key once if you want a browser override" autocomplete="off" spellcheck="false">
          <button class="brief-button" id="connect-button" type="button">Save Key</button>
          <button class="brief-button-secondary" id="disconnect-button" type="button">Forget Key</button>
        </div>
        <div class="brief-connection" id="connection-status" aria-live="polite">Checking connection status...</div>
        <p class="brief-help">The PDF path sends your FIRAC packet to OpenAI with <code>store: false</code>. The citation path uses a search-capable OpenAI model so you can enter a reporter like <code>446 U.S. 620</code>.</p>
      </div>

      <div class="brief-source-grid">
        <div class="brief-field">
          <label for="reporter-citation">Reporter Citation</label>
          <input id="reporter-citation" name="reporter-citation" type="text" placeholder="478 U.S. 654" autocomplete="off" spellcheck="false">
          <p class="brief-help">Use this if you want the page to fetch and brief a case by citation instead of by uploaded PDF.</p>
        </div>

        <div class="brief-field">
          <label for="opinion-file">Opinion PDF</label>
          <input id="opinion-file" name="opinion-file" type="file" accept="application/pdf,.pdf" hidden>
          <div class="brief-dropzone" id="dropzone" role="button" tabindex="0" aria-controls="opinion-file">
            <strong>Drop a PDF here</strong>
            <span>or click to choose a case opinion from your computer</span>
            <span class="brief-file-name" id="file-name">No file selected yet.</span>
          </div>
        </div>
      </div>

      <div class="brief-meta" id="source-summary">Use either a PDF or a reporter citation. If you provide both, the uploaded PDF controls and the citation only helps anchor the prompt.</div>

      <div class="brief-actions">
        <button class="brief-button" id="generate-button" type="submit" disabled>Generate FIRAC</button>
        <button class="brief-button-secondary" id="copy-button" type="button" disabled>Copy Brief</button>
        <button class="brief-button-secondary" id="word-button" type="button" disabled>Download Word</button>
        <button class="brief-button-secondary" id="pdf-button" type="button" disabled>Download PDF</button>
      </div>

      <div class="brief-status" id="brief-status" aria-live="polite"></div>
      <p class="brief-note">
        The page uses your saved briefing template and standard FIRAC prompt. The case text comes from either the uploaded PDF or the reporter citation path.
      </p>
    </form>
  </section>

  <section class="brief-output">
    <h2>Generated Brief</h2>
    <pre id="brief-output">Your FIRAC brief will appear here after the request finishes.</pre>
    <div class="brief-sources" id="citation-sources-wrap" hidden>
      <h3>Lookup Sources</h3>
      <ul id="citation-sources"></ul>
    </div>
  </section>
</div>

<div class="brief-modal" id="case-picker-modal" hidden>
  <div class="brief-modal-panel" role="dialog" aria-modal="true" aria-labelledby="case-picker-title">
    <h3 id="case-picker-title">Pick The Right Case</h3>
    <p id="case-picker-copy" class="brief-help">
      The search found more than one plausible match. Pick the one you meant and the page will brief that exact case.
    </p>
    <div class="brief-case-list" id="case-picker-list"></div>
    <div class="brief-case-actions">
      <button class="brief-button-secondary" id="case-picker-cancel" type="button">Cancel</button>
    </div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const cookies = window.kasoCookies;
    const openAiCookieName = "kaso_key_openai";
    const siteOpenAiKey = ((window.KASO_CONFIG && window.KASO_CONFIG.openaiPublicApiKey) || "").trim();
    const directModel = (window.KASO_CONFIG && window.KASO_CONFIG.openaiModel) || "gpt-5.4";
    const reporterModel = (window.KASO_CONFIG && window.KASO_CONFIG.openaiReporterModel) || "gpt-5.2";
    const templatePath = "/assets/downloads/BriefTemplate.txt";
    const fallbackTemplate =
      "Short/Smart Case Name, State Abbrev. (Year): [Short caption plus jurisdiction and year.]\n" +
      "Venue & Date: [Court and decision date.]\n" +
      "Full Citation: [Full reporter citation.]\n" +
      "Judges: [Majority and dissent lineup.]\n" +
      "Verdict: [Vote count and result.]\n\n" +
      "TL;DR\n[1 to 2 sentence overview.]\n\n" +
      "Procedural History\n- [Bullets]\n\n" +
      "Facts\n- [Bullets]\n\n" +
      "Issue\n[State the legal question.]\n\n" +
      "Rule/Holding\n[State the rule and holding.]\n\n" +
      "Reasoning of the Majority\n[Explain the court's reasoning.]\n\n" +
      "Concurring Opinions\n[If any.]\n\n" +
      "Dissenting Opinions\n[If any.]\n\n" +
      "Conclusion\n[Outcome and significance.]";
    const firacPrompt =
      "Please use the FIRAC briefing template for this case. Use bold headings, bullets for the procedural history and facts, and plain paragraphs everywhere else. Do not use horizontal rules. Leave one blank line between sections so the result pastes cleanly into Microsoft Word.\n\n" +
      "Stick to the template and rely only on the uploaded opinion or assigned reading. Do not use external sources unless the task is citation-based and you need the opinion text itself. Do not embed citations or source callouts in the response. I already know where the material came from.\n\n" +
      "If the record is unclear on a detail, say so briefly rather than guessing.";
    const systemPrompt =
      "You are a precise law-school case briefing assistant. Create a full FIRAC brief using only the case text or reliable opinion text you are given. Do not invent facts, do not embed citations or source callouts, and return only the finished brief, ready to paste into Microsoft Word.";

    const accessMode = document.getElementById("access-mode");
    const modelLabel = document.getElementById("openai-model-label");
    const reporterModelLabel = document.getElementById("reporter-model-label");
    const apiKeyInput = document.getElementById("api-key");
    const connectButton = document.getElementById("connect-button");
    const disconnectButton = document.getElementById("disconnect-button");
    const connectionStatus = document.getElementById("connection-status");
    const citationInput = document.getElementById("reporter-citation");
    const fileInput = document.getElementById("opinion-file");
    const dropzone = document.getElementById("dropzone");
    const fileName = document.getElementById("file-name");
    const sourceSummary = document.getElementById("source-summary");
    const generateButton = document.getElementById("generate-button");
    const copyButton = document.getElementById("copy-button");
    const wordButton = document.getElementById("word-button");
    const pdfButton = document.getElementById("pdf-button");
    const status = document.getElementById("brief-status");
    const output = document.getElementById("brief-output");
    const citationSourcesWrap = document.getElementById("citation-sources-wrap");
    const citationSourcesList = document.getElementById("citation-sources");
    const casePickerModal = document.getElementById("case-picker-modal");
    const casePickerCopy = document.getElementById("case-picker-copy");
    const casePickerList = document.getElementById("case-picker-list");
    const casePickerCancel = document.getElementById("case-picker-cancel");

    let selectedFile = null;
    let templateCache = "";
    let lastResultTitle = "firac-brief";
    let lastCitationSources = [];
    let pendingCaseSelection = null;
    let isWorking = false;

    if (modelLabel) {
      modelLabel.textContent = directModel;
    }

    if (reporterModelLabel) {
      reporterModelLabel.textContent = reporterModel;
    }

    refreshConnectionStatus();
    updateSourceSummary();

    window.addEventListener("focus", refreshConnectionStatus);
    window.addEventListener("pageshow", refreshConnectionStatus);

    connectButton.addEventListener("click", function () {
      const apiKey = apiKeyInput.value.trim();

      if (!apiKey || isDisplayedKeyStatus(apiKey)) {
        setStatus("Paste a real OpenAI API key first.", true);
        return;
      }

      if (!window.kasoConfirmProviderStorage("OpenAI")) {
        return;
      }

      cookies.set(openAiCookieName, apiKey);
      apiKeyInput.value = "";
      setStatus(siteOpenAiKey ? "Browser override key saved. The site-wide key still exists too." : "OpenAI key saved in this browser.");
      refreshConnectionStatus();
    });

    disconnectButton.addEventListener("click", function () {
      if (!cookies.get(openAiCookieName)) {
        setStatus(siteOpenAiKey ? "No browser override key was saved. The site-wide key remains active." : "No saved browser key found.", !siteOpenAiKey);
        refreshConnectionStatus();
        return;
      }

      cookies.remove(openAiCookieName);
      setStatus(siteOpenAiKey ? "Browser override key removed. The site-wide key remains active." : "Stored OpenAI key removed from this browser.");
      refreshConnectionStatus();
    });

    ["input", "change", "keyup", "paste"].forEach(function (eventName) {
      citationInput.addEventListener(eventName, function () {
        updateSourceSummary();
        syncState();
      });
    });

    fileInput.addEventListener("change", function () {
      setFile(fileInput.files && fileInput.files[0] ? fileInput.files[0] : null);
    });

    casePickerCancel.addEventListener("click", function () {
      closeCasePicker();
      setStatus("Case search paused. Pick a more specific search or try again.", true);
    });

    dropzone.addEventListener("click", function () {
      fileInput.click();
    });

    dropzone.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        fileInput.click();
      }
    });

    ["dragenter", "dragover"].forEach(function (eventName) {
      dropzone.addEventListener(eventName, function (event) {
        event.preventDefault();
        dropzone.classList.add("is-active");
      });
    });

    ["dragleave", "drop"].forEach(function (eventName) {
      dropzone.addEventListener(eventName, function (event) {
        event.preventDefault();
        dropzone.classList.remove("is-active");
      });
    });

    dropzone.addEventListener("drop", function (event) {
      const files = event.dataTransfer && event.dataTransfer.files;
      setFile(files && files[0] ? files[0] : null);
    });

    document.getElementById("brief-form").addEventListener("submit", async function (event) {
      event.preventDefault();

      const apiKey = resolveApiKey();
      const citation = citationInput.value.trim();

      if (!apiKey) {
        setStatus("Add a built-in site key in _config.yml or save a browser key first.", true);
        return;
      }

      if (!selectedFile && !citation) {
        setStatus("Drop in a PDF or type a reporter citation first.", true);
        return;
      }

      lastCitationSources = [];
      renderCitationSources(lastCitationSources);
      isWorking = true;
      syncState();
      setStatus(selectedFile ? "Uploading the opinion and building your FIRAC brief..." : "Looking up that citation and building your FIRAC brief...");

      try {
        const template = await getBriefTemplate();
        let text = "";

        if (selectedFile) {
          text = await generateFromPdf(apiKey, template, citation);
          lastResultTitle = sanitizeFilename(selectedFile.name.replace(/\.pdf$/i, ""));
          lastCitationSources = [];
          renderCitationSources(lastCitationSources);
        } else {
          const citationResult = await resolveAndGenerateCitation(apiKey, template, citation);

          if (!citationResult) {
            return;
          }

          text = citationResult.text;
          lastCitationSources = citationResult.sources;
          lastResultTitle = sanitizeFilename(citationResult.caseName || citation);
          renderCitationSources(lastCitationSources);
        }

        output.textContent = text;

        if (await tryAutoCopyText(text)) {
          setStatus("FIRAC generated and copied to your clipboard.");
        } else {
          setStatus("FIRAC generated. Use Copy Brief to place it on your clipboard.", false);
        }
      } catch (error) {
        setStatus(error && error.message ? error.message : "The FIRAC request did not complete.", true);
      } finally {
        isWorking = false;
        syncState();
      }
    });

    copyButton.addEventListener("click", async function () {
      try {
        await copyText(output.textContent);
        setStatus("Brief copied to your clipboard.");
      } catch (error) {
        setStatus("Copy failed in this browser. You can still copy from the brief preview below.", true);
      }
    });

    wordButton.addEventListener("click", function () {
      if (!hasResultText()) {
        return;
      }

      downloadWordDoc(output.textContent, lastResultTitle || deriveSourceTitle());
      setStatus("Word-compatible document downloaded.");
    });

    pdfButton.addEventListener("click", function () {
      if (!hasResultText()) {
        return;
      }

      downloadPdfDoc(output.textContent, lastResultTitle || deriveSourceTitle());
      setStatus("PDF download started.");
    });

    async function generateFromPdf(apiKey, template, citation) {
      const fileDataBase64 = await fileToBase64(selectedFile);
      const citationNote = citation ? "\n\nReporter citation supplied by user: " + citation : "";
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          model: directModel,
          store: false,
          input: [
            {
              role: "system",
              content: [{ type: "input_text", text: systemPrompt }]
            },
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text:
                    firacPrompt +
                    citationNote +
                    "\n\nUse the following briefing template exactly unless a section is genuinely not applicable.\n\n" +
                    template
                },
                {
                  type: "input_file",
                  filename: selectedFile.name,
                  file_data: "data:application/pdf;base64," + fileDataBase64
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data && data.error && data.error.message ? data.error.message : "OpenAI PDF FIRAC request failed.");
      }

      const text = extractOutputText(data).trim();

      if (!text) {
        throw new Error("OpenAI returned an empty FIRAC response for the PDF.");
      }

      return text;
    }
    async function resolveAndGenerateCitation(apiKey, template, citation) {
      const resolution = await resolveCitationCandidates(apiKey, citation);
      const autoCandidate = chooseAutoCandidate(citation, resolution);

      if (!autoCandidate) {
        openCasePicker({
          apiKey: apiKey,
          template: template,
          query: citation,
          candidates: Array.isArray(resolution.candidates) ? resolution.candidates : [],
        });
        return null;
      }

      return generateBriefFromResolvedCase(apiKey, template, citation, autoCandidate);
    }

    async function resolveCitationCandidates(apiKey, citation) {
      const timezone =
        (window.Intl && Intl.DateTimeFormat().resolvedOptions().timeZone) ||
        "America/Chicago";
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          model: reporterModel,
          store: false,
          reasoning: {
            effort: "low"
          },
          tools: [{
            type: "web_search",
            user_location: {
              type: "approximate",
              country: "US",
              timezone: timezone
            }
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
              }]
            },
            {
              role: "user",
              content: [{
                type: "input_text",
                text:
                  "User case search: " + citation + "\n\n" +
                  "Return the best matching cases ranked from most likely to least likely."
              }]
            }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data && data.error && data.error.message ? data.error.message : "OpenAI citation resolver request failed.");
      }

      const parsed = parseCaseResolutionResult(extractOutputText(data));
      parsed.sources = extractCitationSources(data);
      return parsed;
    }


    async function generateBriefFromResolvedCase(apiKey, template, originalQuery, selectedCase) {
      const timezone =
        (window.Intl && Intl.DateTimeFormat().resolvedOptions().timeZone) ||
        "America/Chicago";
      const selectedCitation = selectedCase && selectedCase.reporter_citation
        ? selectedCase.reporter_citation
        : "";
      const normalizedSelectedCitation = normalizeCitation(selectedCitation);
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
          model: reporterModel,
          store: false,
          reasoning: {
            effort: "low"
          },
          tools: [{
            type: "web_search",
            user_location: {
              type: "approximate",
              country: "US",
              timezone: timezone
            }
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
              }]
            },
            {
              role: "user",
              content: [{
                type: "input_text",
                text:
                  "Original user search: " + originalQuery + "\n" +
                  "Selected case name: " + (selectedCase.case_name || "") + "\n" +
                  "Selected reporter citation: " + selectedCitation + "\n" +
                  "Selected court/year: " + (selectedCase.court_year || "") + "\n\n" +
                  "Before briefing, verify the selected case exactly. Nearby citations or similar case names are not good enough.\n\n" +
                  "Use my standard FIRAC instructions and template below.\n\n" +
                  firacPrompt +
                  "\n\nUse the following briefing template exactly unless a section is genuinely not applicable.\n\n" +
                  template
              }]
            }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data && data.error && data.error.message ? data.error.message : "OpenAI citation FIRAC request failed.");
      }

      const parsed = parseCitationResult(extractOutputText(data));
      const normalizedVerifiedCitation = normalizeCitation(parsed.verified_citation);

      if (!parsed.verified) {
        throw new Error(
          parsed.mismatch_reason ||
          "I could not verify that the citation matched an exact case report."
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
        throw new Error("OpenAI verified the citation but returned an empty FIRAC response.");
      }

      return {
        text: text,
        sources: extractCitationSources(data),
        caseName: parsed.case_name || selectedCase.case_name || originalQuery
      };
    }


    function refreshConnectionStatus() {
      const hasSiteKey = Boolean(siteOpenAiKey);
      const hasSavedBrowserKey = Boolean(cookies.get(openAiCookieName));

      if (hasSavedBrowserKey) {
        accessMode.value = hasSiteKey
          ? "Browser override key saved plus built-in site key"
          : "Browser cookie key only";
        connectionStatus.textContent = hasSiteKey
          ? "Browser override key saved. Site-wide key also configured."
          : "OpenAI key saved in this browser.";
        connectionStatus.className = "brief-connection connected";
        apiKeyInput.type = "text";
        apiKeyInput.value = "OpenAI key already saved in this browser";
        apiKeyInput.placeholder = "OpenAI key already saved in this browser";
        apiKeyInput.classList.add("is-saved");
      } else if (hasSiteKey) {
        accessMode.value = "Built-in site key active";
        connectionStatus.textContent = "A built-in site key is active for this page.";
        connectionStatus.className = "brief-connection connected";
        apiKeyInput.type = "text";
        apiKeyInput.value = "Site-wide OpenAI key active";
        apiKeyInput.placeholder = "Site-wide OpenAI key active";
        apiKeyInput.classList.add("is-saved");
      } else {
        accessMode.value = "No OpenAI key configured yet";
        connectionStatus.textContent = "No built-in site key or browser-saved key found yet.";
        connectionStatus.className = "brief-connection disconnected";
        apiKeyInput.type = "password";
        apiKeyInput.value = "";
        apiKeyInput.placeholder = "Paste an OpenAI API key once if you want a browser override";
        apiKeyInput.classList.remove("is-saved");
      }

      disconnectButton.disabled = !hasSavedBrowserKey;
      syncState();
    }

    function syncState() {
      const hasSource = Boolean(selectedFile || citationInput.value.trim());
      const hasResult = hasResultText();

      generateButton.disabled = !hasSource || isWorking;
      copyButton.disabled = !hasResult || isWorking;
      wordButton.disabled = !hasResult || isWorking;
      pdfButton.disabled = !hasResult || isWorking;
      connectButton.disabled = isWorking;
    }

    function updateSourceSummary() {
      const citation = citationInput.value.trim();

      if (selectedFile && citation) {
        sourceSummary.textContent = "PDF selected and citation supplied. The uploaded PDF will control, and the citation will be passed along as context.";
        return;
      }

      if (selectedFile) {
        sourceSummary.textContent = "PDF mode active. The uploaded opinion will be the source text for the FIRAC.";
        return;
      }

      if (citation) {
        sourceSummary.textContent = "Citation mode active. The page will try to find and brief the case identified by that reporter citation.";
        return;
      }

      sourceSummary.textContent = "Use either a PDF or a reporter citation. If you provide both, the uploaded PDF controls and the citation only helps anchor the prompt.";
    }

    function setFile(file) {
      if (!file) {
        selectedFile = null;
        fileInput.value = "";
        fileName.textContent = "No file selected yet.";
        updateSourceSummary();
        syncState();
        return;
      }

      const nameLooksLikePdf = /\.pdf$/i.test(file.name || "");

      if (file.type !== "application/pdf" && !nameLooksLikePdf) {
        selectedFile = null;
        fileInput.value = "";
        fileName.textContent = "No file selected yet.";
        setStatus("Only PDF uploads are supported right now.", true);
        updateSourceSummary();
        syncState();
        return;
      }

      selectedFile = file;
      fileName.textContent = file.name;
      setStatus("");
      updateSourceSummary();
      refreshConnectionStatus();
      syncState();
    }

    function isDisplayedKeyStatus(value) {
      return [
        "OpenAI key already saved in this browser",
        "Site-wide OpenAI key active"
      ].includes(String(value || "").trim());
    }

    function resolveApiKey() {
      return cookies.get(openAiCookieName).trim() || siteOpenAiKey;
    }

    function hasResultText() {
      return Boolean(output.textContent && output.textContent.trim() && output.textContent.indexOf("Your FIRAC brief will appear here") !== 0);
    }

    async function getBriefTemplate() {
      if (templateCache) {
        return templateCache;
      }

      try {
        const response = await fetch(templatePath, { method: "GET" });

        if (!response.ok) {
          throw new Error("Template not found.");
        }

        templateCache = await response.text();
      } catch (error) {
        templateCache = fallbackTemplate;
      }

      return templateCache;
    }

    function renderCitationSources(sources) {
      if (!citationSourcesWrap || !citationSourcesList) {
        return;
      }

      citationSourcesList.innerHTML = "";

      if (!Array.isArray(sources) || !sources.length) {
        citationSourcesWrap.hidden = true;
        return;
      }

      sources.forEach(function (source) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = source.title || source.url;
        listItem.appendChild(link);
        citationSourcesList.appendChild(listItem);
      });

      citationSourcesWrap.hidden = false;
    }

    function openCasePicker(selection) {
      pendingCaseSelection = selection;

      if (!casePickerModal || !casePickerList || !casePickerCopy) {
        return;
      }

      casePickerCopy.textContent =
        "The search is not certain enough to auto-brief \"" +
        selection.query +
        "\". Pick the right case below and the page will brief that exact one.";
      casePickerList.innerHTML = "";

      (selection.candidates || []).forEach(function (candidate, index) {
        const card = document.createElement("article");
        card.className = "brief-case-card";
        const confidence = formatConfidence(candidate.confidence);
        const topic = String(candidate.short_topic || "").trim();
        const note = String(candidate.why_this_might_match || "").trim();

        card.innerHTML =
          '<div class="brief-case-head">' +
            '<div class="brief-case-name">' + escapeHtml(candidate.case_name || "Unnamed case") + "</div>" +
            '<span class="brief-pill">' + confidence + "</span>" +
          "</div>" +
          '<div class="brief-case-meta">' +
            escapeHtml(candidate.reporter_citation || "Reporter unavailable") +
            (candidate.court_year ? " | " + escapeHtml(candidate.court_year) : "") +
          "</div>" +
          (topic ? '<div class="brief-case-meta">About: ' + escapeHtml(topic) + "</div>" : "") +
          (note ? '<div class="brief-case-note">' + escapeHtml(note) + "</div>" : "");

        const actions = document.createElement("div");
        actions.className = "brief-case-actions";

        const chooseButton = document.createElement("button");
        chooseButton.type = "button";
        chooseButton.className = "brief-button";
        chooseButton.textContent = index === 0 ? "Use This Case" : "Choose This Case";
        chooseButton.addEventListener("click", function () {
          chooseResolvedCase(candidate);
        });

        actions.appendChild(chooseButton);
        card.appendChild(actions);
        casePickerList.appendChild(card);
      });

      casePickerModal.hidden = false;
      setStatus("Pick the right case from the list to finish the brief.");
    }

    function closeCasePicker() {
      pendingCaseSelection = null;

      if (casePickerModal) {
        casePickerModal.hidden = true;
      }

      if (casePickerList) {
        casePickerList.innerHTML = "";
      }
    }

    async function chooseResolvedCase(candidate) {
      if (!pendingCaseSelection) {
        closeCasePicker();
        return;
      }

      const currentSelection = pendingCaseSelection;
      closeCasePicker();
      isWorking = true;
      syncState();
      setStatus("Briefing the case you selected...");

      try {
        const result = await generateBriefFromResolvedCase(
          currentSelection.apiKey,
          currentSelection.template,
          currentSelection.query,
          candidate
        );

        output.textContent = result.text;
        lastCitationSources = result.sources;
        renderCitationSources(lastCitationSources);
        lastResultTitle = sanitizeFilename(result.caseName || candidate.case_name || currentSelection.query);

        if (await tryAutoCopyText(result.text)) {
          setStatus("FIRAC generated and copied to your clipboard.");
        } else {
          setStatus("FIRAC generated. Use Copy Brief to place it on your clipboard.", false);
        }
      } catch (error) {
        setStatus(error && error.message ? error.message : "The FIRAC request did not complete.", true);
      } finally {
        isWorking = false;
        syncState();
      }
    }

    function extractCitationSources(data) {
      if (!data || !Array.isArray(data.output)) {
        return [];
      }

      const seen = new Set();
      const sources = [];

      data.output.forEach(function (item) {
        if (item && item.type === "web_search_call" && item.action && Array.isArray(item.action.sources)) {
          item.action.sources.forEach(pushSource);
        }

        if (!Array.isArray(item.content)) {
          return;
        }

        item.content.forEach(function (contentItem) {
          if (!Array.isArray(contentItem.annotations)) {
            return;
          }

          contentItem.annotations.forEach(function (annotation) {
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
          url: url,
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
          .map(function (candidate) {
            return {
              case_name: String(candidate.case_name || "").trim(),
              reporter_citation: String(candidate.reporter_citation || "").trim(),
              confidence: clampConfidence(candidate.confidence),
              short_topic: String(candidate.short_topic || "").trim().split(/\s+/).slice(0, 10).join(" "),
              court_year: String(candidate.court_year || "").trim(),
              why_this_might_match: String(candidate.why_this_might_match || "").trim(),
            };
          })
          .filter(function (candidate) {
            return candidate.case_name || candidate.reporter_citation;
          })
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

    function looksLikeReporterCitation(value) {
      return /(^|\s)\d+\s+[A-Za-z.]+\s+\d+($|\s)/.test(String(value || "").trim());
    }

    function chooseAutoCandidate(query, resolution) {
      const candidates = Array.isArray(resolution && resolution.candidates)
        ? resolution.candidates
        : [];

      if (!candidates.length) {
        throw new Error("I could not identify a likely case from that search.");
      }

      const top = candidates[0];
      const second = candidates[1];
      const exactCitationRequested = looksLikeReporterCitation(query);
      const normalizedRequested = normalizeCitation(query);
      const normalizedTop = normalizeCitation(top.reporter_citation);

      if (exactCitationRequested && normalizedRequested && normalizedTop && normalizedRequested === normalizedTop) {
        return top;
      }

      if (resolution && resolution.resolved_confidently && top.confidence >= 100) {
        return top;
      }

      if (top.confidence >= 98 && (!second || top.confidence - second.confidence >= 15)) {
        return top;
      }

      return null;
    }

    function clampConfidence(value) {
      const numeric = Number(value);

      if (!Number.isFinite(numeric)) {
        return 0;
      }

      return Math.max(0, Math.min(100, Math.round(numeric)));
    }

    function formatConfidence(value) {
      return clampConfidence(value) + "% confidence";
    }

    function escapeHtml(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function extractOutputText(data) {
      if (typeof data.output_text === "string" && data.output_text) {
        return data.output_text;
      }

      if (!Array.isArray(data.output)) {
        return "";
      }

      const chunks = [];

      data.output.forEach(function (item) {
        if (!Array.isArray(item.content)) {
          return;
        }

        item.content.forEach(function (contentItem) {
          if (typeof contentItem.text === "string") {
            chunks.push(contentItem.text);
          }
        });
      });

      return chunks.join("\n");
    }

    function fileToBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        reader.onload = function () {
          const result = String(reader.result || "");
          const commaIndex = result.indexOf(",");
          resolve(commaIndex === -1 ? result : result.slice(commaIndex + 1));
        };

        reader.onerror = function () {
          reject(new Error("Unable to read that file."));
        };

        reader.readAsDataURL(file);
      });
    }

    async function tryAutoCopyText(text) {
      if (!(navigator.clipboard && window.isSecureContext)) {
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        return false;
      }
    }

    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "");
      helper.style.position = "absolute";
      helper.style.left = "-9999px";
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(helper);

      if (!copied) {
        throw new Error("Clipboard copy was not permitted in this browser.");
      }
    }

    function downloadWordDoc(text, baseName) {
      const title = baseName || "firac-brief";
      const rtf = makeRtfDoc(text, title);
      const blob = new Blob([rtf], { type: "application/rtf;charset=utf-8" });
      downloadBlob(blob, title + ".rtf");
    }

    function downloadPdfDoc(text, baseName) {
      const title = baseName || "firac-brief";

      if (window.jspdf && window.jspdf.jsPDF) {
        const jsPDF = window.jspdf.jsPDF;
        const pdf = new jsPDF({ unit: "pt", format: "letter" });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 48;
        const usableWidth = pageWidth - margin * 2;
        let y = margin;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text(title, margin, y);
        y += 24;

        const lines = String(text || "").split(/\r?\n/);

        lines.forEach(function (line) {
          const trimmed = line.trim();
          let fontStyle = "normal";
          let fontSize = 11;
          let indent = 0;
          let lineText = line;

          if (!trimmed) {
            y += 10;
            return;
          }

          if (/^\*\*.+\*\*$/.test(trimmed)) {
            fontStyle = "bold";
            fontSize = 13;
            lineText = trimmed.replace(/^\*\*/, "").replace(/\*\*$/, "");
          } else if (/^-\s+/.test(trimmed)) {
            indent = 16;
          }

          pdf.setFont("helvetica", fontStyle);
          pdf.setFontSize(fontSize);
          const wrapped = pdf.splitTextToSize(lineText, usableWidth - indent);

          wrapped.forEach(function (wrappedLine) {
            if (y > pageHeight - margin) {
              pdf.addPage();
              y = margin;
            }

            pdf.text(wrappedLine, margin + indent, y);
            y += fontSize + 4;
          });
        });

        pdf.save(title + ".pdf");
        return;
      }

      const printWindow = window.open("", "_blank", "noopener,noreferrer");
      if (!printWindow) {
        setStatus("Popup blocked. Allow popups to print a PDF fallback.", true);
        return;
      }

      printWindow.document.write(makeWordHtml(text, title));
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }

    function makeRtfDoc(text, title) {
      const lines = String(text || "").split(/\r?\n/);
      const parts = [
        "{\\rtf1\\ansi\\deff0",
        "{\\fonttbl{\\f0 Georgia;}{\\f1 Helvetica;}}",
        "\\viewkind4\\uc1\\pard\\sa180\\sl276\\slmult1\\f0\\fs24 ",
        escapeRtf(title),
        "\\par\\par "
      ];

      lines.forEach(function (line) {
        const trimmed = line.trim();

        if (!trimmed) {
          parts.push("\\par ");
          return;
        }

        if (/^\*\*.+\*\*$/.test(trimmed)) {
          const heading = trimmed.replace(/^\*\*/, "").replace(/\*\*$/, "");
          parts.push("\\b\\f1\\fs28 " + escapeRtf(heading) + "\\b0\\f0\\fs24\\par ");
          return;
        }

        if (/^-\s+/.test(trimmed)) {
          parts.push("\\li360\\tx360\\bullet\\tab " + escapeRtf(trimmed.replace(/^-\s+/, "")) + "\\li0\\par ");
          return;
        }

        parts.push(escapeRtf(line) + "\\par ");
      });

      parts.push("}");
      return parts.join("");
    }

    function makeWordHtml(text, title) {
      const body = String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/^\*\*(.+?)\*\*$/gm, "<h2>$1</h2>")
        .replace(/\n\n/g, "</p><p>")
        .replace(/\n/g, "<br>");

      return (
        "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>" +
        title +
        "</title><style>body{font-family:Georgia,serif;padding:40px;line-height:1.55;color:#111;}h1{margin:0 0 24px;}h2{margin:22px 0 10px;font-size:1.1rem;}p{margin:0 0 14px;}br{line-height:1.55;}</style></head><body><h1>" +
        title +
        "</h1><p>" +
        body +
        "</p></body></html>"
      );
    }

    function escapeRtf(value) {
      return String(value || "")
        .replace(/\\/g, "\\\\")
        .replace(/{/g, "\\{")
        .replace(/}/g, "\\}")
        .replace(/\r?\n/g, "\\par ")
        .replace(/[^\x00-\x7F]/g, function (character) {
          return "\\u" + character.charCodeAt(0) + "?";
        });
    }

    function downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1000);
    }

    function deriveSourceTitle() {
      const citation = citationInput.value.trim();

      if (selectedFile && selectedFile.name) {
        return sanitizeFilename(selectedFile.name.replace(/\.pdf$/i, ""));
      }

      if (citation) {
        return sanitizeFilename(citation);
      }

      return "firac-brief";
    }

    function sanitizeFilename(value) {
      return String(value || "firac-brief")
        .replace(/\.[^.]+$/g, "")
        .replace(/[^a-zA-Z0-9\-_ ]+/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 80) || "firac-brief";
    }

    function setStatus(message, isError) {
      status.textContent = message;
      status.classList.toggle("error", Boolean(isError));
    }
  });
</script>
























