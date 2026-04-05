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
  </section>

  <section class="prompt-actions" aria-label="Quick prompt actions">
    <button class="prompt-action" type="button" data-copy-key="firac">Copy FIRAC</button>
    <button class="prompt-action" type="button" data-copy-key="nlm">Copy NLM</button>
    <button class="prompt-action" type="button" data-copy-key="voice">DRQ MyVoice</button>
    <a class="prompt-download" href="/assets/downloads/BriefTemplate.txt" download>Download Brief Template</a>
  </section>

  <div class="prompt-status" id="prompt-status" aria-live="polite"></div>

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
  document.addEventListener("DOMContentLoaded", function () {
    const prompts = {
      firac: `Please use the FIRAC briefing template for this case. Use bold headings, bullets for the procedural history and facts, and plain paragraphs everywhere else. Do not use horizontal rules. Leave one blank line between sections so the result pastes cleanly into Microsoft Word.

Stick to the template and rely only on the uploaded opinion or assigned reading. Do not use external sources. Do not embed citations or source callouts in the response. I already know where the material came from.

If the record is unclear on a detail, say so briefly rather than guessing.`,
      nlm: `You have the case opinions and the full reading assignment for this class. Prepare me for the big-picture doctrinal concepts as well as the nuances surfaced in footnotes, notes, and points of discussion. Follow the reading in the exact textbook or casebook order.

Emphasize [LEGAL AREA] and recite the facts heavily when they matter to the doctrine. Assume I am a rising 3L using this for pre-class preparation, class discussion, and outline building, so keep it information-dense and do not spend time on basics a 3L already knows.

Avoid shallow list-brain. I want a start-to-finish synthesis that weaves together doctrine, facts, tensions between the cases, and the framing choices made by the reading.`,
      voice: `Attached is the full reading for class today. I need short answers to the directed reading questions below. Answer every question posed. When appropriate, reference the Federal Rules of Evidence and any other rules, cases, or class materials that matter.

Match my voice: casual, direct, and smart, like a capable law student talking through the material without sounding robotic or overly formal. Aim for about 1 to 4 sentences per answer unless a question clearly needs more.

Put the full text of each question in bold before its answer. Do not embed citations. If you mention a rule, work it naturally into the sentence instead of sounding like a treatise.`,
    };

    const status = document.getElementById("prompt-status");
    const previewIds = {
      firac: "preview-firac",
      nlm: "preview-nlm",
      voice: "preview-voice",
    };

    Object.entries(previewIds).forEach(([key, id]) => {
      const target = document.getElementById(id);
      if (target) {
        target.textContent = prompts[key];
      }
    });

    async function copyPrompt(key, button) {
      const prompt = prompts[key];
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
          status.textContent = button.textContent.replace("Copy ", "") + " copied to clipboard.";
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

    document.querySelectorAll("[data-copy-key]").forEach((button) => {
      button.addEventListener("click", function () {
        copyPrompt(button.getAttribute("data-copy-key"), button);
      });
    });
  });
</script>
