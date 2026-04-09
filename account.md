---
layout: default
title: Account
---

<style>
  .account-shell {
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

  .account-hero,
  .account-panel,
  .provider-card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 22px;
    padding: 24px;
    box-shadow: 0 16px 36px rgba(16, 36, 58, 0.07);
  }

  .account-hero {
    background:
      radial-gradient(circle at top right, rgba(13, 94, 166, 0.18), transparent 32%),
      linear-gradient(135deg, #f9fcff 0%, #eef5fb 100%);
  }

  .account-kicker,
  .provider-pill {
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

  .account-warning {
    background: #fff3cd;
    border: 1px solid #f0d48a;
    color: #6a4a00;
    border-radius: 16px;
    padding: 16px 18px;
    font-weight: 600;
  }

  .account-hero h1,
  .account-panel h2,
  .provider-card h2 {
    margin: 14px 0 12px;
  }

  .account-help,
  .account-note,
  .provider-meta,
  .provider-status {
    color: var(--muted);
  }

  .account-form,
  .provider-grid {
    display: grid;
    gap: 18px;
  }

  .provider-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .account-field {
    display: grid;
    gap: 8px;
  }

  .account-field label {
    color: var(--ink);
    font-weight: 700;
  }

  .account-field input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border: 1px solid var(--line);
    border-radius: 14px;
    font: inherit;
    background: #ffffff;
  }

  .account-actions,
  .provider-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .account-button,
  .account-button-secondary,
  .account-button-danger {
    appearance: none;
    border: none;
    border-radius: 14px;
    padding: 12px 16px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.18s ease, opacity 0.18s ease, background-color 0.18s ease;
  }

  .account-button {
    background: var(--accent);
    color: #ffffff;
  }

  .account-button-secondary {
    background: var(--panel-soft);
    color: var(--ink);
    border: 1px solid var(--line);
  }

  .account-button-danger {
    background: #fff1f1;
    color: var(--danger);
    border: 1px solid rgba(180, 35, 24, 0.18);
  }

  .account-button:hover,
  .account-button:focus-visible,
  .account-button-secondary:hover,
  .account-button-secondary:focus-visible,
  .account-button-danger:hover,
  .account-button-danger:focus-visible {
    transform: translateY(-1px);
  }

  .account-button:hover,
  .account-button:focus-visible {
    background: var(--accent-dark);
  }

  .provider-status.connected {
    color: var(--success);
    font-weight: 700;
  }

  .provider-status.disconnected {
    color: var(--danger);
    font-weight: 700;
  }

  .account-status {
    min-height: 1.4rem;
    color: var(--accent-dark);
    font-weight: 600;
  }

  .account-status.error {
    color: var(--danger);
  }

  @media (max-width: 640px) {
    .account-hero,
    .account-panel,
    .provider-card {
      padding: 20px;
    }

    .account-actions,
    .provider-actions {
      flex-direction: column;
    }

    .account-button,
    .account-button-secondary,
    .account-button-danger {
      width: 100%;
    }
  }
</style>

<div class="account-shell">
  <section class="account-hero">
    <span class="account-kicker">Cookie Account</span>
    <h1>Account</h1>
    <p class="account-help">
      This account is fully browser-side. Your display name and any provider keys you save live in cookies on this device, not in the repo and not on a server you run.
    </p>
  </section>

  <div class="account-warning">
    Save provider keys only on a browser profile you trust. This keeps control client-side, but it also means scripts on this site can read those cookies in order to reuse them.
  </div>

  <section class="account-panel">
    <h2>Profile</h2>
    <form class="account-form" id="account-form">
      <div class="account-field">
        <label for="storage-mode">Storage Mode</label>
        <input id="storage-mode" type="text" value="Browser cookies on this device only" readonly>
        <p class="account-help">If you clear cookies or switch browsers, this account disappears there.</p>
      </div>

      <div class="account-field">
        <label for="display-name">Display Name</label>
        <input id="display-name" type="text" maxlength="80" placeholder="John Doe" autocomplete="off">
        <p class="account-help">Used for greetings like "Welcome in John Doe! Let's go get 'em."</p>
      </div>

      <div class="account-actions">
        <button class="account-button" id="save-profile" type="button">Save Name</button>
        <button class="account-button-danger" id="clear-all" type="button">Clear All Cookies</button>
      </div>

      <div class="account-status" id="account-status" aria-live="polite"></div>
      <p class="account-note">Provider keys are stored in browser cookies for this device only. Nothing is written back into GitHub Pages content.</p>
    </form>
  </section>

  <section class="account-panel">
    <h2>Providers</h2>
    <div class="provider-grid">
      <article class="provider-card" data-provider="openai">
        <span class="provider-pill">OpenAI</span>
        <h2>OpenAI</h2>
        <p class="provider-meta">Used by the AI FIRAC page when you want the site to generate a brief directly from this browser.</p>
        <div class="account-field">
          <label for="provider-openai">API Key</label>
          <input id="provider-openai" type="password" placeholder="Paste OpenAI API key" autocomplete="off" spellcheck="false">
        </div>
        <div class="provider-actions">
          <button class="account-button provider-save" data-provider="openai" type="button">Save Key</button>
          <button class="account-button-secondary provider-clear" data-provider="openai" type="button">Clear</button>
        </div>
        <div class="provider-status" id="status-openai">Checking status...</div>
      </article>

      <article class="provider-card" data-provider="gemini">
        <span class="provider-pill">Gemini</span>
        <h2>Google Gemini</h2>
        <p class="provider-meta">Saved locally now so future Gemini tools on this site can reuse it without asking again.</p>
        <div class="account-field">
          <label for="provider-gemini">API Key</label>
          <input id="provider-gemini" type="password" placeholder="Paste Gemini API key" autocomplete="off" spellcheck="false">
        </div>
        <div class="provider-actions">
          <button class="account-button provider-save" data-provider="gemini" type="button">Save Key</button>
          <button class="account-button-secondary provider-clear" data-provider="gemini" type="button">Clear</button>
        </div>
        <div class="provider-status" id="status-gemini">Checking status...</div>
      </article>

      <article class="provider-card" data-provider="claude">
        <span class="provider-pill">Claude</span>
        <h2>Anthropic Claude</h2>
        <p class="provider-meta">Saved locally now so Claude-specific tools can reuse it later from this same browser.</p>
        <div class="account-field">
          <label for="provider-claude">API Key</label>
          <input id="provider-claude" type="password" placeholder="Paste Claude API key" autocomplete="off" spellcheck="false">
        </div>
        <div class="provider-actions">
          <button class="account-button provider-save" data-provider="claude" type="button">Save Key</button>
          <button class="account-button-secondary provider-clear" data-provider="claude" type="button">Clear</button>
        </div>
        <div class="provider-status" id="status-claude">Checking status...</div>
      </article>
    </div>
  </section>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const cookies = window.kasoCookies;
    const displayNameInput = document.getElementById("display-name");
    const saveProfileButton = document.getElementById("save-profile");
    const clearAllButton = document.getElementById("clear-all");
    const status = document.getElementById("account-status");
    const providerMap = {
      openai: { label: "OpenAI", cookieName: "kaso_key_openai" },
      gemini: { label: "Google Gemini", cookieName: "kaso_key_gemini" },
      claude: { label: "Anthropic Claude", cookieName: "kaso_key_claude" }
    };
    const profileCookie = "kaso_profile_name";
    const defaultDisplayName = "John Doe";
    const providerKeys = Object.keys(providerMap);

    refreshAccount();

    saveProfileButton.addEventListener("click", function () {
      const displayName = displayNameInput.value.trim();

      if (displayName.length > 80) {
        setStatus("Keep the display name under 80 characters.", true);
        return;
      }

      if (displayName) {
        cookies.set(profileCookie, displayName);
        setStatus("Display name saved in this browser.");
      } else {
        cookies.remove(profileCookie);
        setStatus("Display name cleared from this browser.");
      }

      announceAccountUpdate();
      refreshAccount();
    });

    clearAllButton.addEventListener("click", function () {
      if (!window.confirm("Clear your saved display name and every provider cookie from this browser?")) {
        return;
      }

      cookies.remove(profileCookie);
      providerKeys.forEach(function (provider) {
        cookies.remove(providerMap[provider].cookieName);
        const input = document.getElementById("provider-" + provider);

        if (input) {
          input.value = "";
        }
      });

      displayNameInput.value = defaultDisplayName;
      setStatus("All saved cookies cleared from this browser.");
      announceAccountUpdate();
      refreshAccount();
    });

    document.querySelectorAll(".provider-save").forEach(function (button) {
      button.addEventListener("click", function () {
        const provider = button.getAttribute("data-provider");
        const providerData = providerMap[provider];
        const input = document.getElementById("provider-" + provider);
        const apiKey = input ? input.value.trim() : "";

        if (!providerData) {
          setStatus("Unknown provider.", true);
          return;
        }

        if (!apiKey) {
          setStatus("Paste a key for " + providerData.label + " first.", true);
          return;
        }

        if (!window.kasoConfirmProviderStorage(providerData.label)) {
          return;
        }

        cookies.set(providerData.cookieName, apiKey);
        if (input) {
          input.value = "";
        }

        setStatus(providerData.label + " key saved in this browser.");
        announceAccountUpdate();
        refreshAccount();
      });
    });

    document.querySelectorAll(".provider-clear").forEach(function (button) {
      button.addEventListener("click", function () {
        const provider = button.getAttribute("data-provider");
        const providerData = providerMap[provider];

        if (!providerData) {
          setStatus("Unknown provider.", true);
          return;
        }

        cookies.remove(providerData.cookieName);
        setStatus(providerData.label + " key cleared from this browser.");
        announceAccountUpdate();
        refreshAccount();
      });
    });

    function refreshAccount() {
      displayNameInput.value = cookies.get(profileCookie) || defaultDisplayName;

      providerKeys.forEach(function (provider) {
        const providerData = providerMap[provider];
        const connected = Boolean(cookies.get(providerData.cookieName));
        const node = document.getElementById("status-" + provider);

        if (!node) {
          return;
        }

        node.textContent = connected
          ? providerData.label + " key saved in this browser."
          : providerData.label + " is not saved yet.";
        node.className = connected
          ? "provider-status connected"
          : "provider-status disconnected";
      });
    }

    function setStatus(message, isError) {
      status.textContent = message;
      status.classList.toggle("error", Boolean(isError));
    }

    function announceAccountUpdate() {
      window.dispatchEvent(new CustomEvent("kaso-account-updated"));
    }
  });
</script>
