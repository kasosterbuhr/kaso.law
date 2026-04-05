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

  .account-button[disabled],
  .account-button-secondary[disabled],
  .account-button-danger[disabled] {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
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
      This is a lightweight account layer backed by browser cookies instead of real user accounts. You can save your display name, connect provider API keys, and clear everything whenever you want.
    </p>
  </section>

  <section class="account-panel">
    <h2>Connection</h2>
    <form class="account-form" id="account-form">
      <div class="account-field">
        <label for="api-base">API Base URL</label>
        <input id="api-base" type="text" placeholder="http://localhost:8787" autocomplete="off">
        <p class="account-help">This tells the site where your cookie-managing backend lives. Example: <code>http://localhost:8787</code> or <code>https://api.kaso.law</code>.</p>
      </div>

      <div class="account-field">
        <label for="display-name">Display Name</label>
        <input id="display-name" type="text" maxlength="80" placeholder="Kas" autocomplete="off">
        <p class="account-help">Used for personalized greetings like “Welcome in Kas! Let’s go get ’em.”</p>
      </div>

      <div class="account-actions">
        <button class="account-button" id="save-profile" type="button">Save Name</button>
        <button class="account-button-danger" id="clear-all" type="button">Clear All Account Data</button>
      </div>

      <div class="account-status" id="account-status" aria-live="polite"></div>
      <p class="account-note">Provider keys are stored as encrypted persistent cookies on the backend domain. Your display name is also stored there so the site can greet you on future visits.</p>
    </form>
  </section>

  <section class="account-panel">
    <h2>Providers</h2>
    <div class="provider-grid">
      <article class="provider-card" data-provider="openai">
        <span class="provider-pill">OpenAI</span>
        <h2>OpenAI</h2>
        <p class="provider-meta">Used now for the AI FIRAC builder and ready for future OpenAI-powered tools.</p>
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
        <p class="provider-meta">Stored now so we can wire Gemini-powered tools into the site later without asking again.</p>
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
        <p class="provider-meta">Stored now so Claude-specific workflows can reuse it later from this same browser account layer.</p>
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
    const storageKey = "kasoFiracApiBase";
    const apiBaseInput = document.getElementById("api-base");
    const displayNameInput = document.getElementById("display-name");
    const saveProfileButton = document.getElementById("save-profile");
    const clearAllButton = document.getElementById("clear-all");
    const status = document.getElementById("account-status");
    const providerKeys = ["openai", "gemini", "claude"];

    apiBaseInput.value = window.localStorage.getItem(storageKey) || "";
    refreshAccount();

    apiBaseInput.addEventListener("input", function () {
      window.localStorage.setItem(storageKey, apiBaseInput.value.trim());
      refreshAccount();
    });

    saveProfileButton.addEventListener("click", async function () {
      const endpoint = buildEndpoint("/api/account/profile");

      if (!endpoint) {
        setStatus("Enter your backend URL first.", true);
        return;
      }

      saveProfileButton.disabled = true;
      setStatus("Saving your display name...");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ displayName: displayNameInput.value.trim() }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data && data.error ? data.error : "Could not save your display name.");
        }

        setStatus(data.displayName ? "Display name saved." : "Display name cleared.");
        announceAccountUpdate();
        await refreshAccount();
      } catch (error) {
        setStatus(error && error.message ? error.message : "Could not save your display name.", true);
      } finally {
        saveProfileButton.disabled = false;
      }
    });

    clearAllButton.addEventListener("click", async function () {
      const endpoint = buildEndpoint("/api/account/clear-all");

      if (!endpoint) {
        setStatus("Enter your backend URL first.", true);
        return;
      }

      clearAllButton.disabled = true;
      setStatus("Clearing all saved account cookies...");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data && data.error ? data.error : "Could not clear account data.");
        }

        displayNameInput.value = "";
        providerKeys.forEach(function (provider) {
          const input = document.getElementById("provider-" + provider);
          if (input) {
            input.value = "";
          }
        });
        setStatus("All saved account cookies cleared.");
        announceAccountUpdate();
        await refreshAccount();
      } catch (error) {
        setStatus(error && error.message ? error.message : "Could not clear account data.", true);
      } finally {
        clearAllButton.disabled = false;
      }
    });

    document.querySelectorAll(".provider-save").forEach(function (button) {
      button.addEventListener("click", async function () {
        const provider = button.getAttribute("data-provider");
        const input = document.getElementById("provider-" + provider);
        const endpoint = buildEndpoint("/api/account/provider");
        const apiKey = input ? input.value.trim() : "";

        if (!endpoint) {
          setStatus("Enter your backend URL first.", true);
          return;
        }

        if (!apiKey) {
          setStatus("Paste a key for " + provider + " first.", true);
          return;
        }

        button.disabled = true;
        setStatus("Saving " + provider + " key...");

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ provider: provider, apiKey: apiKey }),
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data && data.error ? data.error : "Could not save the provider key.");
          }

          if (input) {
            input.value = "";
          }
          setStatus(data.status && data.status.label ? data.status.label + " key saved." : "Provider key saved.");
          await refreshAccount();
        } catch (error) {
          setStatus(error && error.message ? error.message : "Could not save the provider key.", true);
        } finally {
          button.disabled = false;
        }
      });
    });

    document.querySelectorAll(".provider-clear").forEach(function (button) {
      button.addEventListener("click", async function () {
        const provider = button.getAttribute("data-provider");
        const endpoint = buildEndpoint("/api/account/provider/clear");

        if (!endpoint) {
          setStatus("Enter your backend URL first.", true);
          return;
        }

        button.disabled = true;
        setStatus("Clearing " + provider + " key...");

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ provider: provider }),
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data && data.error ? data.error : "Could not clear the provider key.");
          }

          setStatus(provider + " key cleared.");
          await refreshAccount();
        } catch (error) {
          setStatus(error && error.message ? error.message : "Could not clear the provider key.", true);
        } finally {
          button.disabled = false;
        }
      });
    });

    async function refreshAccount() {
      const endpoint = buildEndpoint("/api/account");

      if (!endpoint) {
        displayNameInput.value = "";
        providerKeys.forEach(function (provider) {
          paintProviderStatus(provider, null);
        });
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data && data.error ? data.error : "Could not load account data.");
        }

        displayNameInput.value = data.displayName || "";
        providerKeys.forEach(function (provider) {
          paintProviderStatus(provider, data.providers && data.providers[provider] ? data.providers[provider] : null);
        });
      } catch (error) {
        providerKeys.forEach(function (provider) {
          paintProviderStatus(provider, null, true);
        });
      }
    }

    function paintProviderStatus(provider, providerData, unreachable) {
      const node = document.getElementById("status-" + provider);

      if (!node) {
        return;
      }

      if (unreachable) {
        node.textContent = "Could not reach the backend.";
        node.className = "provider-status disconnected";
        return;
      }

      if (!providerData) {
        node.textContent = "No status yet.";
        node.className = "provider-status";
        return;
      }

      if (providerData.connected) {
        node.textContent = providerData.label + " key connected for this browser.";
        node.className = "provider-status connected";
        return;
      }

      if (providerData.fallbackConfigured) {
        node.textContent = providerData.label + " is available through a server fallback key.";
        node.className = "provider-status connected";
        return;
      }

      node.textContent = providerData.label + " is not connected yet.";
      node.className = "provider-status disconnected";
    }

    function buildEndpoint(path) {
      const base = apiBaseInput.value.trim();

      if (!base) {
        return "";
      }

      return base.replace(/\/+$/, "") + path;
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
