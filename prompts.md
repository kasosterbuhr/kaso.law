---
layout: default
title: Prompt Library
---

<style>
  .prompt-hub {
    --ink: #10243a;
    --muted: #4b6176;
    --line: #cfd9e3;
    --panel: #ffffff;
    --panel-soft: #f6f8fb;
    --accent: #0d5ea6;
    --accent-dark: #0a4c85;
    --accent-soft: #dceefe;
    --gold: #c58a15;
    display: grid;
    gap: 24px;
  }

  .prompt-hub p {
    margin: 0;
  }

  .prompt-hero {
    background:
      radial-gradient(circle at top right, rgba(13, 94, 166, 0.18), transparent 34%),
      linear-gradient(135deg, #f9fcff 0%, #eef5fb 100%);
    border: 1px solid var(--line);
    border-radius: 22px;
    padding: 28px;
    box-shadow: 0 18px 44px rgba(16, 36, 58, 0.08);
  }

  .prompt-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(13, 94, 166, 0.1);
    color: var(--accent-dark);
    border-radius: 999px;
    padding: 7px 12px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .prompt-hero h1 {
    margin: 14px 0 12px;
  }

  .prompt-lead {
    color: var(--muted);
    max-width: 60ch;
  }

  .prompt-asset-link {
    display: inline-flex;
    align-items: center;
    margin-top: 14px;
    color: var(--accent-dark);
    font-size: 0.95rem;
    font-weight: 700;
    text-decoration: none;
  }

  .prompt-asset-link:hover,
  .prompt-asset-link:focus-visible {
    text-decoration: underline;
  }

  .prompt-actions {
    position: sticky;
    top: 46px;
    z-index: 20;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
    background: rgba(248, 250, 252, 0.92);
    border: 1px solid rgba(207, 217, 227, 0.95);
    border-radius: 18px;
    backdrop-filter: blur(10px);
    box-shadow: 0 14px 28px rgba(16, 36, 58, 0.08);
  }

  .prompt-action,
  .prompt-download {
    appearance: none;
    border: none;
    border-radius: 14px;
    padding: 12px 16px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
  }

  .prompt-action {
    background: var(--accent);
    color: #ffffff;
    box-shadow: 0 12px 20px rgba(13, 94, 166, 0.18);
  }

  .prompt-action:hover,
  .prompt-action:focus-visible,
  .prompt-download:hover,
  .prompt-download:focus-visible {
    transform: translateY(-1px);
  }

  .prompt-action:hover,
  .prompt-action:focus-visible {
    background: var(--accent-dark);
  }

  .prompt-download {
    background: #fff7e7;
    color: #6e4a00;
    border: 1px solid rgba(197, 138, 21, 0.25);
  }

  .prompt-status {
    min-height: 1.3rem;
    color: var(--accent-dark);
    font-size: 0.95rem;
    font-weight: 600;
  }

  .prompt-modal[hidden] {
    display: none;
  }

  .prompt-modal {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 24px;
  }

  .prompt-modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(16, 36, 58, 0.42);
    backdrop-filter: blur(6px);
  }

  .prompt-modal-panel {
    position: relative;
    width: min(760px, 100%);
    display: grid;
    gap: 18px;
    background: #ffffff;
    border: 1px solid rgba(207, 217, 227, 0.95);
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 22px 60px rgba(16, 36, 58, 0.18);
  }

  .prompt-modal-panel h2 {
    margin: 0;
    color: var(--ink);
  }

  .prompt-modal-panel p {
    color: var(--muted);
  }

  .prompt-choice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }

  .prompt-secondary.prompt-choice {
    display: grid;
    gap: 10px;
    width: 100%;
    min-height: 136px;
    padding: 16px 18px;
    justify-items: start;
    align-content: start;
    text-align: left;
    border-radius: 18px;
  }

  .prompt-choice-title {
    color: var(--ink);
    font-size: 1.05rem;
    font-weight: 800;
    line-height: 1.25;
    white-space: normal;
    word-break: normal;
    overflow-wrap: anywhere;
  }

  .prompt-choice-summary {
    color: var(--muted);
    font-size: 0.92rem;
    line-height: 1.45;
  }

  .prompt-choice:hover,
  .prompt-choice:focus-visible {
    background: #eef5fb;
    border-color: rgba(13, 94, 166, 0.32);
    box-shadow: 0 10px 20px rgba(13, 94, 166, 0.08);
  }

  .prompt-modal-actions {
    display: flex;
    justify-content: flex-end;
  }

  .prompt-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 18px;
  }

  .prompt-card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 22px;
    box-shadow: 0 12px 28px rgba(16, 36, 58, 0.06);
  }

  .prompt-card h2 {
    margin: 0 0 10px;
    color: var(--ink);
    font-size: 1.2rem;
  }

  .prompt-tag {
    display: inline-block;
    margin-bottom: 12px;
    padding: 5px 10px;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent-dark);
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .prompt-card p {
    color: var(--muted);
  }

  .prompt-card-footer {
    margin-top: 16px;
  }

  .prompt-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--panel-soft);
    color: var(--ink);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 10px 14px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
  }

  .prompt-previews {
    display: grid;
    gap: 16px;
  }

  .prompt-preview {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 12px 28px rgba(16, 36, 58, 0.06);
  }

  .prompt-preview-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
    padding: 18px 20px 0;
  }

  .prompt-preview-header h3 {
    margin: 0;
    color: var(--ink);
  }

  .prompt-preview pre {
    margin: 0;
    padding: 20px;
    background: transparent;
    color: #17324d;
    border-radius: 0;
    white-space: pre-wrap;
    word-break: normal;
  }

  .prompt-steps {
    background: var(--panel-soft);
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 22px;
  }

  .prompt-steps h2 {
    margin-top: 0;
  }

  .prompt-steps ol {
    margin: 12px 0 0;
    padding-left: 20px;
  }

  .prompt-steps li + li {
    margin-top: 8px;
  }

  @media (max-width: 640px) {
    .prompt-hero,
    .prompt-card,
    .prompt-steps {
      padding: 20px;
    }

    .prompt-actions {
      top: 42px;
    }

    .prompt-action,
    .prompt-download,
    .prompt-secondary {
      width: 100%;
      justify-content: center;
      text-align: center;
    }

    .prompt-choice-grid {
      grid-template-columns: 1fr;
    }

    .prompt-secondary.prompt-choice {
      justify-content: stretch;
      justify-items: start;
      text-align: left;
    }

    .prompt-preview-header {
      padding-top: 20px;
    }
  }
</style>

<div class="prompt-hub">
  <section class="prompt-hero">
    <span class="prompt-kicker">Quick Copy Workflow</span>
    <h1>Prompt Library</h1>
    <p class="prompt-lead">
      Go to your favorite AI tool webpage. Drop in your case opinions, and use these prompts to either get a comprehensive time-tested FIRAC, to generate audio/video on NotebookLM, or do specific tasks like generate model answers to directed questions.
    </p>
    <a class="prompt-asset-link" href="/assets/library/prompt-library.json" target="_blank" rel="noreferrer">
      Browse the shared prompt asset
    </a>
  </section>

  <section class="prompt-actions" aria-label="Quick prompt actions">
    <button class="prompt-action" type="button" data-copy-key="firac">Copy FIRAC</button>
    <button class="prompt-action" type="button" data-copy-key="nlm">Copy NLM</button>
    <button class="prompt-action" type="button" data-copy-key="voice">DRQ MyVoice</button>
    <button class="prompt-action" type="button" data-copy-key="justiceDetail">Justice-detail</button>
    <button class="prompt-action" type="button" data-copy-key="evidenceExpert">Evidence Expert</button>
    <a class="prompt-action" href="/brief">AI FIRAC</a>
    <a class="prompt-download" href="/assets/downloads/BriefTemplate.txt" download>Download Brief Template</a>
  </section>

  <div class="prompt-status" id="prompt-status" aria-live="polite"></div>

  <div class="prompt-modal" id="firac-subject-modal" hidden>
    <div class="prompt-modal-backdrop" data-dismiss-modal="true"></div>
    <div class="prompt-modal-panel" role="dialog" aria-modal="true" aria-labelledby="firac-subject-title">
      <div>
        <h2 id="firac-subject-title">Choose a FIRAC class</h2>
        <p>
          Pick the course once, and the copied FIRAC prompt will drop in the right class language automatically.
        </p>
      </div>
      <div class="prompt-choice-grid" id="firac-subject-options"></div>
      <div class="prompt-modal-actions">
        <button class="prompt-secondary" type="button" data-dismiss-modal="true">Cancel</button>
      </div>
    </div>
  </div>

  <div class="prompt-modal" id="nlm-focus-modal" hidden>
    <div class="prompt-modal-backdrop" data-dismiss-modal="true"></div>
    <div class="prompt-modal-panel" role="dialog" aria-modal="true" aria-labelledby="nlm-focus-title">
      <div>
        <h2 id="nlm-focus-title">Choose a doctrinal focus</h2>
        <p>
          Pick the doctrinal lens you want before copying, so the NotebookLM prompt is ready to paste without editing.
        </p>
      </div>
      <div class="prompt-choice-grid" id="nlm-focus-options"></div>
      <div class="prompt-modal-actions">
        <button class="prompt-secondary" type="button" data-dismiss-modal="true">Cancel</button>
      </div>
    </div>
  </div>

  <div class="prompt-modal" id="voice-style-modal" hidden>
    <div class="prompt-modal-backdrop" data-dismiss-modal="true"></div>
    <div class="prompt-modal-panel" role="dialog" aria-modal="true" aria-labelledby="voice-style-title">
      <div>
        <h2 id="voice-style-title">Choose a DRQ style</h2>
        <p>
          Pick the prompt style you want before copying, so your directed-question workflow is already shaped for the class moment you are in.
        </p>
      </div>
      <div class="prompt-choice-grid" id="voice-style-options"></div>
      <div class="prompt-modal-actions">
        <button class="prompt-secondary" type="button" data-dismiss-modal="true">Cancel</button>
      </div>
    </div>
  </div>

  <section class="prompt-grid">
    <article class="prompt-card">
      <span class="prompt-tag">FIRAC</span>
      <h2>Brief One Opinion</h2>
      <p>
        Use this when you want one clean case brief from a single uploaded opinion, with no embedded citations and a format that pastes cleanly into Word.
      </p>
      <div class="prompt-card-footer">
        <button class="prompt-secondary" type="button" data-copy-key="firac">Copy Prompt</button>
      </div>
    </article>

    <article class="prompt-card">
      <span class="prompt-tag">NotebookLM</span>
      <h2>Generic NLM</h2>
      <p>
        Use this when you drop in a whole reading packet and want a start-to-finish doctrinal walkthrough that follows the casebook's order and surfaces facts, doctrine, and classroom nuance.
      </p>
      <div class="prompt-card-footer">
        <button class="prompt-secondary" type="button" data-copy-key="nlm">Copy Prompt</button>
      </div>
    </article>

    <article class="prompt-card">
      <span class="prompt-tag">Directed Qs</span>
      <h2>Your Voice</h2>
      <p>
        Use this when you need answers to directed reading questions in a casual but intelligent tone that sounds like you, while still grounding the response in the assigned rules and materials.
      </p>
      <div class="prompt-card-footer">
        <button class="prompt-secondary" type="button" data-copy-key="voice">Copy Prompt</button>
      </div>
    </article>

    <article class="prompt-card">
      <span class="prompt-tag">Justice Detail</span>
      <h2>Justice-by-Justice Colloquy</h2>
      <p>
        Use this when you want a compact justice-by-justice read on one assigned case, with the key colloquy heavily emphasized and the output trimmed for fast class-prep review.
      </p>
      <div class="prompt-card-footer">
        <button class="prompt-secondary" type="button" data-copy-key="justiceDetail">Copy Prompt</button>
      </div>
    </article>

    <article class="prompt-card">
      <span class="prompt-tag">Evidence</span>
      <h2>Evidence Class Analysis</h2>
      <p>
        Use this when you want a concise but fully responsive Evidence answer that directly addresses every sub-issue and grounds the analysis in the Federal Rules of Evidence, Advisory Committee Notes, cases, and class principles.
      </p>
      <div class="prompt-card-footer">
        <button class="prompt-secondary" type="button" data-copy-key="evidenceExpert">Copy Prompt</button>
      </div>
    </article>

    <article class="prompt-card">
      <span class="prompt-tag">Live Tool</span>
      <h2>AI FIRAC Builder</h2>
      <p>
        Want the site to do the FIRAC itself instead of just copying a prompt? Open the upload tool, save your OpenAI key in a browser cookie on your device, and let it return a full clipboard-ready brief.
      </p>
      <div class="prompt-card-footer">
        <a class="prompt-secondary" href="/brief">Open Tool</a>
      </div>
    </article>
  </section>

  <section class="prompt-previews">
    <article class="prompt-preview">
      <div class="prompt-preview-header">
        <h3>FIRAC This Opinion</h3>
        <button class="prompt-secondary" type="button" data-copy-key="firac">Copy Prompt</button>
      </div>
      <pre id="preview-firac"></pre>
    </article>

    <article class="prompt-preview">
      <div class="prompt-preview-header">
        <h3>NLM Generic</h3>
        <button class="prompt-secondary" type="button" data-copy-key="nlm">Copy Prompt</button>
      </div>
      <pre id="preview-nlm"></pre>
    </article>

    <article class="prompt-preview">
      <div class="prompt-preview-header">
        <h3>Answer Directed Questions In My Voice</h3>
        <button class="prompt-secondary" type="button" data-copy-key="voice">Copy Prompt</button>
      </div>
      <pre id="preview-voice"></pre>
    </article>

    <article class="prompt-preview">
      <div class="prompt-preview-header">
        <h3>Justice-detail for 44 Liquormart</h3>
        <button class="prompt-secondary" type="button" data-copy-key="justiceDetail">Copy Prompt</button>
      </div>
      <pre id="preview-justiceDetail"></pre>
    </article>

    <article class="prompt-preview">
      <div class="prompt-preview-header">
        <h3>Evidence Class Analysis</h3>
        <button class="prompt-secondary" type="button" data-copy-key="evidenceExpert">Copy Prompt</button>
      </div>
      <pre id="preview-evidenceExpert"></pre>
    </article>
  </section>

  <section class="prompt-steps">
    <h2>How To Use It</h2>
    <ol>
      <li>Drop your opinion, textbook pages, or reading packet into the AI tool you want to use.</li>
      <li>Click the matching button on this page to copy the prompt.</li>
      <li>Paste it into your chat window and run it as-is or lightly customize the bracketed placeholders.</li>
      <li>Download the brief template when you want the fuller case-brief structure on hand outside the page.</li>
    </ol>
  </section>
</div>

<script>
  document.addEventListener("DOMContentLoaded", async function () {
    const promptLibraryUrl = "/assets/library/prompt-library.json";

    const status = document.getElementById("prompt-status");
    const firacModal = document.getElementById("firac-subject-modal");
    const firacSubjectOptions = document.getElementById("firac-subject-options");
    const nlmModal = document.getElementById("nlm-focus-modal");
    const nlmFocusOptions = document.getElementById("nlm-focus-options");
    const voiceModal = document.getElementById("voice-style-modal");
    const voiceStyleOptions = document.getElementById("voice-style-options");
    const previewIds = {
      firac: "preview-firac",
      nlm: "preview-nlm",
      voice: "preview-voice",
      justiceDetail: "preview-justiceDetail",
      evidenceExpert: "preview-evidenceExpert",
    };
    const prompts = {
      firac: "",
      nlm: "",
      voice: "",
      justiceDetail: "",
      evidenceExpert: "",
    };
    let activeFiracButton = null;
    let activeNlmButton = null;
    let activeVoiceButton = null;
    let firacSubjects = [];
    let nlmFocuses = [];
    let voiceStyles = [];
    let firacBasePrompt = "";
    let nlmBasePrompt = "";

    function assertString(value) {
      return typeof value === "string" ? value : "";
    }

    async function loadPromptLibrary() {
      const response = await fetch(promptLibraryUrl, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Prompt library request failed.");
      }

      return response.json();
    }

    function buildFiracPrompt(subject) {
      return firacBasePrompt
        .replace("__COURSE_NAME__", subject.label)
        .replace("__COURSE_FOCUS__", subject.focus);
    }

    function buildNlmPrompt(focus) {
      return nlmBasePrompt.replace("__DOCTRINAL_FOCUS__", focus.focus);
    }

    function setFiracPreview(subject) {
      prompts.firac = buildFiracPrompt(subject);
      const target = document.getElementById(previewIds.firac);
      if (target) {
        target.textContent = prompts.firac;
      }
    }

    function setNlmPreview(focus) {
      prompts.nlm = buildNlmPrompt(focus);
      const target = document.getElementById(previewIds.nlm);
      if (target) {
        target.textContent = prompts.nlm;
      }
    }

    function setVoicePreview(style) {
      prompts.voice = style && style.prompt ? style.prompt : "";
      const target = document.getElementById(previewIds.voice);
      if (target) {
        target.textContent = prompts.voice;
      }
    }

    function openFiracModal(button) {
      activeFiracButton = button;

      if (firacModal) {
        firacModal.hidden = false;
      }

      if (status) {
        status.textContent = "Choose a class for the FIRAC prompt.";
      }
    }

    function closeFiracModal() {
      if (firacModal) {
        firacModal.hidden = true;
      }

      activeFiracButton = null;
    }

    function openNlmModal(button) {
      activeNlmButton = button;

      if (nlmModal) {
        nlmModal.hidden = false;
      }

      if (status) {
        status.textContent = "Choose a doctrinal focus for the NotebookLM prompt.";
      }
    }

    function closeNlmModal() {
      if (nlmModal) {
        nlmModal.hidden = true;
      }

      activeNlmButton = null;
    }

    function openVoiceModal(button) {
      activeVoiceButton = button;

      if (voiceModal) {
        voiceModal.hidden = false;
      }

      if (status) {
        status.textContent = "Choose a DRQ prompt style.";
      }
    }

    function closeVoiceModal() {
      if (voiceModal) {
        voiceModal.hidden = true;
      }

      activeVoiceButton = null;
    }

    async function copyPromptText(prompt, button, statusLabel) {
      if (!prompt) {
        return;
      }

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(prompt);
        } else {
          const helper = document.createElement("textarea");
          helper.value = prompt;
          helper.setAttribute("readonly", "");
          helper.style.position = "absolute";
          helper.style.left = "-9999px";
          document.body.appendChild(helper);
          helper.select();
          document.execCommand("copy");
          document.body.removeChild(helper);
        }

        if (status) {
          status.textContent = statusLabel + " copied to clipboard.";
        }

        const originalText = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(function () {
          button.textContent = originalText;
        }, 1400);
      } catch (error) {
        if (status) {
          status.textContent = "Clipboard copy failed in this browser. You can still copy from the prompt preview below.";
        }
      }
    }

    async function copyPrompt(key, button) {
      if (key === "firac") {
        if (!firacSubjects.length) {
          if (status) {
            status.textContent = "The shared prompt library is not available right now.";
          }
          return;
        }
        openFiracModal(button);
        return;
      }

      if (key === "nlm") {
        if (!nlmFocuses.length) {
          if (status) {
            status.textContent = "The shared prompt library is not available right now.";
          }
          return;
        }
        openNlmModal(button);
        return;
      }

      if (key === "voice") {
        if (!voiceStyles.length) {
          if (status) {
            status.textContent = "The shared prompt library is not available right now.";
          }
          return;
        }
        openVoiceModal(button);
        return;
      }

      await copyPromptText(prompts[key], button, button.textContent.replace("Copy ", ""));
    }

    function buildChoiceOption(title, summary) {
      return (
        '<span class="prompt-choice-title">' +
        title +
        '</span><span class="prompt-choice-summary">' +
        summary +
        "</span>"
      );
    }

    try {
      if (status) {
        status.textContent = "Loading shared prompt library...";
      }

      const library = await loadPromptLibrary();
      const courses = Array.isArray(library.courses) ? library.courses : [];
      const generalFocus = library.notebooklm && library.notebooklm.generalFocus ? library.notebooklm.generalFocus : null;
      const voiceLibrary = library.voice || {};
      const voiceStyleList = Array.isArray(voiceLibrary.styles) ? voiceLibrary.styles : [];
      const defaultVoiceStyleId = assertString(voiceLibrary.defaultStyleId);

      firacBasePrompt = assertString(library.firac && library.firac.basePrompt);
      nlmBasePrompt = assertString(library.notebooklm && library.notebooklm.basePrompt);
      prompts.justiceDetail = assertString(library.justiceDetail && library.justiceDetail.prompt);
      prompts.evidenceExpert = assertString(library.evidenceExpert && library.evidenceExpert.prompt);

      firacSubjects = courses.map((course) => ({
        id: course.id,
        label: course.label,
        summary: course.firacSummary,
        focus: course.firacFocus,
      }));

      nlmFocuses = [];
      if (generalFocus) {
        nlmFocuses.push({
          id: generalFocus.id,
          label: generalFocus.label,
          summary: generalFocus.summary,
          focus: generalFocus.focus,
        });
      }
      courses.forEach((course) => {
        nlmFocuses.push({
          id: course.id,
          label: course.label,
          summary: course.nlmSummary,
          focus: course.nlmFocus,
        });
      });

      voiceStyles = voiceStyleList
        .map((style) => ({
          id: style.id,
          label: style.label,
          summary: style.summary,
          prompt: assertString(style.prompt),
        }))
        .filter((style) => style.id && style.label && style.summary && style.prompt);

      if (!firacBasePrompt || !nlmBasePrompt || !prompts.justiceDetail || !prompts.evidenceExpert || !firacSubjects.length || !nlmFocuses.length || !voiceStyles.length) {
        throw new Error("Prompt library is missing required content.");
      }

      setFiracPreview(firacSubjects[0]);
      setNlmPreview(nlmFocuses[0]);
      setVoicePreview(
        voiceStyles.find((style) => style.id === defaultVoiceStyleId) || voiceStyles[0]
      );

      Object.entries(previewIds).forEach(([key, id]) => {
        if (key === "firac" || key === "nlm") {
          return;
        }

        const target = document.getElementById(id);
        if (target) {
          target.textContent = prompts[key];
        }
      });

      if (firacSubjectOptions) {
        firacSubjects.forEach((subject) => {
          const option = document.createElement("button");
          option.type = "button";
          option.className = "prompt-secondary prompt-choice";
          option.innerHTML = buildChoiceOption(subject.label, subject.summary);
          option.addEventListener("click", async function () {
            const sourceButton = activeFiracButton || option;
            setFiracPreview(subject);
            closeFiracModal();
            await copyPromptText(buildFiracPrompt(subject), sourceButton, subject.label + " FIRAC");
          });
          firacSubjectOptions.appendChild(option);
        });
      }

      if (nlmFocusOptions) {
        nlmFocuses.forEach((focus) => {
          const option = document.createElement("button");
          option.type = "button";
          option.className = "prompt-secondary prompt-choice";
          option.innerHTML = buildChoiceOption(focus.label, focus.summary);
          option.addEventListener("click", async function () {
            const sourceButton = activeNlmButton || option;
            setNlmPreview(focus);
            closeNlmModal();
            await copyPromptText(buildNlmPrompt(focus), sourceButton, focus.label + " NLM");
          });
          nlmFocusOptions.appendChild(option);
        });
      }

      if (voiceStyleOptions) {
        voiceStyles.forEach((style) => {
          const option = document.createElement("button");
          option.type = "button";
          option.className = "prompt-secondary prompt-choice";
          option.innerHTML = buildChoiceOption(style.label, style.summary);
          option.addEventListener("click", async function () {
            const sourceButton = activeVoiceButton || option;
            setVoicePreview(style);
            closeVoiceModal();
            await copyPromptText(style.prompt, sourceButton, style.label);
          });
          voiceStyleOptions.appendChild(option);
        });
      }

      if (status) {
        status.textContent = "Choose a prompt to copy.";
      }
    } catch (error) {
      if (status) {
        status.textContent = "The shared prompt library could not be loaded.";
      }
    }

    document.querySelectorAll("[data-dismiss-modal]").forEach((button) => {
      button.addEventListener("click", function () {
        closeFiracModal();
        closeNlmModal();
        closeVoiceModal();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && firacModal && !firacModal.hidden) {
        closeFiracModal();
      }

      if (event.key === "Escape" && nlmModal && !nlmModal.hidden) {
        closeNlmModal();
      }

      if (event.key === "Escape" && voiceModal && !voiceModal.hidden) {
        closeVoiceModal();
      }
    });

    document.querySelectorAll("[data-copy-key]").forEach((button) => {
      button.addEventListener("click", function () {
        copyPrompt(button.getAttribute("data-copy-key"), button);
      });
    });
  });
</script>
