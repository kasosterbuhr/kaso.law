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
    <span class="brief-kicker">Server-Powered FIRAC</span>
    <h1>AI FIRAC Builder</h1>
    <p>
      Connect your OpenAI key once, let the trusted backend store it in an encrypted persistent cookie, and then drag in case-opinion PDFs whenever you want a clipboard-ready FIRAC brief.
    </p>
  </section>

  <section class="brief-panel">
    <form class="brief-form" id="brief-form">
      <div class="brief-field">
        <label for="trusted-api-base">Trusted API Backend</label>
        <input id="trusted-api-base" name="trusted-api-base" type="text" value="" readonly>
        <p class="brief-help">For safety, this public site only sends OpenAI keys to the trusted backend shown here. The key is never written into the GitHub repo.</p>
      </div>

      <div class="brief-field">
        <label for="api-key">Connect OpenAI</label>
        <div class="brief-connect-grid">
          <input id="api-key" name="api-key" type="password" placeholder="Paste your OpenAI API key once" autocomplete="off" spellcheck="false">
          <button class="brief-button" id="connect-button" type="button">Connect OpenAI</button>
          <button class="brief-button-secondary" id="disconnect-button" type="button">Forget Key</button>
        </div>
        <div class="brief-connection" id="connection-status" aria-live="polite">Checking connection status...</div>
        <p class="brief-help">The raw key is sent only to the trusted backend. The backend encrypts it into an <code>HttpOnly</code> cookie so future FIRAC requests can use it without keeping the key in page JavaScript.</p>
      </div>

      <div class="brief-field">
        <label for="opinion-file">Opinion PDF</label>
        <input id="opinion-file" name="opinion-file" type="file" accept="application/pdf" hidden>
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
        This still requires your backend to be running. GitHub Pages serves the page, but the encrypted cookie and OpenAI request handling happen on the backend domain.
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
    const trustedApiBaseInput = document.getElementById("trusted-api-base");
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

    trustedApiBaseInput.value = getApiBase() || "No trusted backend configured yet.";
    syncState();
    refreshConnectionStatus();

    connectButton.addEventListener("click", async function () {
      const apiKey = apiKeyInput.value.trim();
      const endpoint = buildEndpoint("/api/connect-key");

      if (!endpoint) {
        setStatus("This deployment does not have a trusted backend configured yet.", true);
        return;
      }

      if (!apiKey) {
        setStatus("Paste an OpenAI API key first.", true);
        return;
      }

      if (
        typeof window.kasoConfirmProviderStorage === "function" &&
        !window.kasoConfirmProviderStorage("OpenAI")
      ) {
        return;
      }

      connectButton.disabled = true;
      setStatus("Connecting your OpenAI key...");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ apiKey: apiKey }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data && data.error ? data.error : "Could not connect the API key.");
        }

        apiKeyInput.value = "";
        setStatus("OpenAI connected. Future FIRAC requests will use your encrypted cookie.");
        await refreshConnectionStatus();
      } catch (error) {
        setStatus(error && error.message ? error.message : "Could not connect the API key.", true);
      } finally {
        connectButton.disabled = false;
        syncState();
      }
    });

    disconnectButton.addEventListener("click", async function () {
      const endpoint = buildEndpoint("/api/disconnect-key");

      if (!endpoint) {
        setStatus("This deployment does not have a trusted backend configured yet.", true);
        return;
      }

      disconnectButton.disabled = true;
      setStatus("Removing the stored key...");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data && data.error ? data.error : "Could not remove the stored key.");
        }

        setStatus("Stored OpenAI key removed.");
        await refreshConnectionStatus();
      } catch (error) {
        setStatus(error && error.message ? error.message : "Could not remove the stored key.", true);
      } finally {
        disconnectButton.disabled = false;
        syncState();
      }
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

      const endpoint = buildEndpoint("/api/firac");

      if (!endpoint) {
        setStatus("This deployment does not have a trusted backend configured yet.", true);
        return;
      }

      if (!isConnected) {
        setStatus("Connect your OpenAI key first.", true);
        return;
      }

      generateButton.disabled = true;
      copyButton.disabled = true;
      setStatus("Uploading the opinion and building your FIRAC brief...");

      try {
        const fileDataBase64 = await fileToBase64(selectedFile);
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            filename: selectedFile.name,
            mimeType: selectedFile.type || "application/pdf",
            fileDataBase64: fileDataBase64,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data || typeof data.text !== "string") {
          throw new Error(data && data.error ? data.error : "The FIRAC request failed.");
        }

        output.textContent = data.text;
        copyButton.disabled = false;
        await copyText(data.text);
        setStatus("FIRAC generated and copied to your clipboard.");
      } catch (error) {
        setStatus(error && error.message ? error.message : "Something went wrong.", true);
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

    function setFile(file) {
      if (!file) {
        selectedFile = null;
        fileName.textContent = "No file selected yet.";
        syncState();
        return;
      }

      if (file.type !== "application/pdf") {
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

    async function refreshConnectionStatus() {
      const endpoint = buildEndpoint("/api/key-status");

      if (!endpoint) {
        isConnected = false;
        connectionStatus.textContent = "This deployment does not have a trusted backend configured yet.";
        connectionStatus.className = "brief-connection disconnected";
        syncState();
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data && data.error ? data.error : "Could not read connection status.");
        }

        isConnected = Boolean(data.connected);
        connectionStatus.textContent = data.connected
          ? "OpenAI key connected for this browser."
          : "No connected OpenAI key found yet.";
        connectionStatus.className = isConnected
          ? "brief-connection connected"
          : "brief-connection disconnected";
      } catch (error) {
        isConnected = false;
        connectionStatus.textContent = "Could not reach the backend to check connection status.";
        connectionStatus.className = "brief-connection disconnected";
      }

      syncState();
    }

    function syncState() {
      const hasApiBase = Boolean(getApiBase());
      generateButton.disabled = !(selectedFile && hasApiBase && isConnected);
      disconnectButton.disabled = !hasApiBase;
      connectButton.disabled = !hasApiBase;
    }

    function setStatus(message, isError) {
      status.textContent = message;
      status.classList.toggle("error", Boolean(isError));
    }

    function buildEndpoint(path) {
      const base = getApiBase();

      if (!base) {
        return "";
      }

      return base + path;
    }

    function getApiBase() {
      if (typeof window.kasoGetApiBase !== "function") {
        return "";
      }

      return window.kasoGetApiBase();
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
