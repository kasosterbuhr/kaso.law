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
    background: #fff3cd;
    border: 1px solid #f0d48a;
    color: #6a4a00;
    border-radius: 16px;
    padding: 16px 18px;
    font-weight: 600;
  }

  .brief-hero h1 {
    margin: 14px 0 12px;
  }

  .brief-hero p,
  .brief-help,
  .brief-note {
    color: var(--muted);
  }

  .brief-form {
    display: grid;
    gap: 18px;
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
    <span class="brief-kicker">Browser-Powered FIRAC</span>
    <h1>AI FIRAC Builder</h1>
    <p>
      Save your OpenAI key in a browser cookie on this device, drop in a case-opinion PDF, and generate a clipboard-ready FIRAC directly from the page.
    </p>
  </section>

  <div class="brief-warning">
    This page is fully client-side. Your OpenAI key stays under browser control on this device, but it is readable by scripts running on this site. Use it only on a browser profile you trust.
  </div>

  <section class="brief-panel">
    <form class="brief-form" id="brief-form">
      <div class="brief-field">
        <label for="storage-mode">Storage Mode</label>
        <input id="storage-mode" name="storage-mode" type="text" value="Browser cookies on this device only" readonly>
        <p class="brief-help">The page uses your saved key directly from this browser. Nothing is posted back into the repo.</p>
      </div>

      <div class="brief-field">
        <label for="api-key">Connect OpenAI</label>
        <div class="brief-connect-grid">
          <input id="api-key" name="api-key" type="password" placeholder="Paste your OpenAI API key once" autocomplete="off" spellcheck="false">
          <button class="brief-button" id="connect-button" type="button">Save Key</button>
          <button class="brief-button-secondary" id="disconnect-button" type="button">Forget Key</button>
        </div>
        <div class="brief-connection" id="connection-status" aria-live="polite">Checking connection status...</div>
        <p class="brief-help">When you generate a FIRAC, the browser sends your PDF and prompt directly to OpenAI with <code>store: false</code> using model <code id="openai-model-label"></code>.</p>
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

      <div class="brief-actions">
        <button class="brief-button" id="generate-button" type="submit" disabled>Generate FIRAC</button>
        <button class="brief-button-secondary" id="copy-button" type="button" disabled>Copy Brief</button>
      </div>

      <div class="brief-status" id="brief-status" aria-live="polite"></div>
      <p class="brief-note">
        If browser-side API access fails in your setup, the fallback is still the prompt-copy workflow on the Prompts page.
      </p>
    </form>
  </section>

  <section class="brief-output">
    <h2>Generated Brief</h2>
    <pre id="brief-output">Your FIRAC brief will appear here after the upload finishes.</pre>
  </section>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const cookies = window.kasoCookies;
    const openAiCookieName = "kaso_key_openai";
    const model = (window.KASO_CONFIG && window.KASO_CONFIG.openaiModel) || "gpt-4.1-mini";
    const templatePath = "/assets/downloads/BriefTemplate.txt";
    const fallbackTemplate =
      "**Facts**\n" +
      "- Summarize the legally material facts.\n\n" +
      "**Issue**\n" +
      "State the main legal issue.\n\n" +
      "**Rule**\n" +
      "State the controlling rule or rules.\n\n" +
      "**Application**\n" +
      "Explain how the court applied the rule to the facts.\n\n" +
      "**Conclusion**\n" +
      "State the holding and disposition.";

    const modelLabel = document.getElementById("openai-model-label");
    const apiKeyInput = document.getElementById("api-key");
    const connectButton = document.getElementById("connect-button");
    const disconnectButton = document.getElementById("disconnect-button");
    const connectionStatus = document.getElementById("connection-status");
    const fileInput = document.getElementById("opinion-file");
    const dropzone = document.getElementById("dropzone");
    const fileName = document.getElementById("file-name");
    const generateButton = document.getElementById("generate-button");
    const copyButton = document.getElementById("copy-button");
    const status = document.getElementById("brief-status");
    const output = document.getElementById("brief-output");

    let selectedFile = null;
    let isConnected = false;
    let templateCache = "";

    if (modelLabel) {
      modelLabel.textContent = model;
    }

    refreshConnectionStatus();

    connectButton.addEventListener("click", function () {
      const apiKey = apiKeyInput.value.trim();

      if (!apiKey) {
        setStatus("Paste an OpenAI API key first.", true);
        return;
      }

      if (!window.kasoConfirmProviderStorage("OpenAI")) {
        return;
      }

      cookies.set(openAiCookieName, apiKey);
      apiKeyInput.value = "";
      setStatus("OpenAI key saved in this browser.");
      refreshConnectionStatus();
    });

    disconnectButton.addEventListener("click", function () {
      cookies.remove(openAiCookieName);
      setStatus("Stored OpenAI key removed from this browser.");
      refreshConnectionStatus();
    });

    fileInput.addEventListener("change", function () {
      setFile(fileInput.files && fileInput.files[0] ? fileInput.files[0] : null);
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

      if (!selectedFile) {
        setStatus("Choose a PDF first.", true);
        return;
      }

      const apiKey = cookies.get(openAiCookieName);

      if (!apiKey) {
        setStatus("Save your OpenAI key first.", true);
        return;
      }

      generateButton.disabled = true;
      copyButton.disabled = true;
      setStatus("Uploading the opinion and building your FIRAC brief...");

      try {
        const [fileDataBase64, template] = await Promise.all([
          fileToBase64(selectedFile),
          getBriefTemplate()
        ]);

        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
          },
          body: JSON.stringify({
            model: model,
            store: false,
            input: [
              {
                role: "system",
                content: [
                  {
                    type: "input_text",
                    text:
                      "You are a precise law-school case briefing assistant. " +
                      "Create a full FIRAC brief using only the uploaded opinion. " +
                      "Do not use external sources, do not invent facts, and do not include embedded citations or source callouts. " +
                      "Return only the finished brief, with bold headings and bullets where appropriate, ready to paste into Microsoft Word."
                  }
                ]
              },
              {
                role: "user",
                content: [
                  {
                    type: "input_text",
                    text:
                      "Use the uploaded opinion to complete the following briefing structure. " +
                      "If a detail is genuinely unavailable from the opinion, say so briefly instead of guessing.\n\n" +
                      "Formatting rules:\n" +
                      "- Use bold section headings.\n" +
                      "- Use bullets for Procedural History and Facts.\n" +
                      "- Do not use horizontal rules.\n" +
                      "- Leave a blank line between sections.\n" +
                      "- Rely only on the uploaded opinion.\n\n" +
                      "Briefing template:\n" +
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

        output.textContent = text;
        copyButton.disabled = false;
        await copyText(text);
        setStatus("FIRAC generated and copied to your clipboard.");
      } catch (error) {
        setStatus(
          error && error.message
            ? error.message
            : "The browser-side FIRAC request did not complete.",
          true
        );
      } finally {
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

    function refreshConnectionStatus() {
      isConnected = Boolean(cookies.get(openAiCookieName));
      connectionStatus.textContent = isConnected
        ? "OpenAI key saved in this browser."
        : "No saved OpenAI key found yet.";
      connectionStatus.className = isConnected
        ? "brief-connection connected"
        : "brief-connection disconnected";
      syncState();
    }

    function syncState() {
      generateButton.disabled = !(selectedFile && isConnected);
      disconnectButton.disabled = !isConnected;
      connectButton.disabled = false;
    }

    function setFile(file) {
      if (!file) {
        selectedFile = null;
        fileName.textContent = "No file selected yet.";
        syncState();
        return;
      }

      const nameLooksLikePdf = /\.pdf$/i.test(file.name || "");

      if (file.type !== "application/pdf" && !nameLooksLikePdf) {
        selectedFile = null;
        fileInput.value = "";
        fileName.textContent = "No file selected yet.";
        setStatus("Only PDF uploads are supported right now.", true);
        syncState();
        return;
      }

      selectedFile = file;
      fileName.textContent = file.name;
      setStatus("");
      syncState();
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
      document.execCommand("copy");
      document.body.removeChild(helper);
    }
  });
</script>
