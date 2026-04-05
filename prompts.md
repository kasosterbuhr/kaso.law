---
layout: default
title: Prompt Library
---

# **AI** *pro se* Prompt Library

A collection of reusable legal reasoning prompts designed to help you think through legal problems like a lawyer, even without representation. Each prompt is open-source, free to use, and works with any AI platform—OpenAI, Claude, Gemini, or others.

## Why Prompts Matter

Legal reasoning isn't just about knowing rules; it's about asking the right questions in the right order. These prompts are structured workflows that guide you through the cognitive process lawyers use every day.

**All prompts are copy-paste ready.** Use them directly in your AI tool with minimal customization.

![Prompt engineering workflow](/assets/images/AIProSe%20detail%2001.png){: .inline-right }

---

## Core Legal Prompts

### Case Analysis & Learning (NotebookLM Compatible)

**Use this when:** You're studying case law and need structured analysis focused on key doctrinal concepts.

```
You have case opinions and the full reading assignment for our class today. I'm calling on you to prepare me for the big picture doctrinal concepts as well as the nuances teased in footnotes and "points of discussion" (or similar). You should focus your flow on a "start to finish" that follows the specified Discussion Order.

You should discuss these cases in the light of [LEGAL AREA], primarily, and recite facts heavily. Apply emphasis to the specified Legal Area.

I'm a [EDUCATION LEVEL: e.g., "rising 3L student"] and I will use this to augment my reading of the case opinions most notably in pre-class preparation, review afterwards, and my outline at the end of the semester. This should be information dense and should assume a baseline knowledge rather than bringing up basic concepts that a [EDUCATION LEVEL] should already know.
```

**Customize by replacing:**
- `[LEGAL AREA]` — e.g., "Constitutional Law", "Contract Law", "Criminal Procedure"
- `[EDUCATION LEVEL]` — e.g., "rising 2L", "rising 3L", "law student"

---

### FIRAC Case Briefing Template

**Use this when:** You need to brief a single case in the traditional FIRAC format for class preparation.

```
Please use the FIRAC briefing template for this case. Use bold on headings and bullets on procedural history and facts. Do not use horizontal lines to separate any of the sections. Add an empty line between sections to visually separate them.

Template structure:
- **Facts:** Use bullets for key facts. Recite procedurally relevant details.
- **Issue:** One clear legal question presented.
- **Rule:** The applicable law. Cite statutes, constitutional provisions, or case law.
- **Analysis:** Apply the rule to these facts. Address counterarguments.
- **Conclusion:** Your answer to the issue.

Do NOT embed any sources—I already know where the information comes from. Keep your answer copy-paste ready for Word.
```

---

### Class Reading & Case Synthesis

**Use this when:** You're responsible for synthesizing multiple case opinions from assigned reading.

```
You have case opinions and the full reading assignment for our class today. I'm calling on you to prepare me for the big picture doctrinal concepts as well as the nuances teased in footnotes and "points of discussion" (or similar). You should focus your flow on a "start to finish" that follows the textbook reading.

I'm a [EDUCATION LEVEL] student and I will use this for pre-class preparation, in-class note-taking, and my outline for test-taking. This should be information dense and assume baseline knowledge.

Please do not use "list brain"—provide substantive paragraphs, not just 2-word bullets. Your analysis should weave in both the doctrine and the textbook's nuanced framing.
```

---

### Judicial Opinion Analysis (Multi-Justice Perspective)

**Use this when:** You need to understand what each justice thinks, especially in split decisions.

```
Give me a [LENGTH: e.g., "1/3 page"] summary of what EACH JUSTICE said in [CASE NAME]. Focus on the content from the assigned reading material.

Structure your response as:
- Majority opinion(s): List each justice and their perspective (1 sentence each)
- Concurring opinion(s): Any separate reasoning
- Dissent(s): The opposing view

If you quote a justice, refer only to the page number—I already know the source. Use bold sparingly for emphasis. This should be copy-paste ready for Word.

Do NOT include embedded citations. Focus on each justice's unique reasoning and how they differ.
```

---

### Evidence Rule Problem-Solving

**Use this when:** You're working through evidence problems and need to apply specific FRE rules.

```
Analyze this evidence problem and provide a short (1 to 4 sentences) answer. In your response:

1. Identify the sources informing your answer—e.g., the particular FRE, ACN, cases, or textbook material.
2. Answer all questions posed in the problem.

Use a casual but intelligent tone, as if explaining to a peer. Reference the Federal Rules of Evidence when appropriate, as well as any relevant statutes, restatements, or case law.
```

---

### Quick Cheatsheet for Daily Quizzes

**Use this when:** You need a rapid-reference summary of cases and key concepts.

```
Given all of the cases we've covered, create a quick cheatsheet for 2-minute quiz questions. For each case, provide:

1. Case name
2. One-sentence TL;DR
3. Any numbered tests or elements (e.g., "3-part test for X")
4. Relevant statutes or constitutional provisions

Keep it scannable and easy to reference under time pressure.
```

---

## Specialty Prompts

### Doctrinal Deep Dive

**Use this when:** You want to understand a specific area of law in depth.

```
Provide a comprehensive outline of [LEGAL TOPIC] as it appears in [JURISDICTION/TEXT/CASEBOOK]. Cover:

1. The foundational rule or principle
2. Major exceptions and their justifications
3. How courts have interpreted this rule over time
4. Common fact patterns and how they're analyzed
5. Policy considerations underlying the rule

Assume I have baseline legal knowledge and want substance over basics.
```

---

### Hypo Analysis & Application

**Use this when:** You're working through hypothetical fact patterns.

```
Analyze this fact pattern and discuss how [LEGAL DOCTRINE] would apply. Structure your analysis as:

1. **Issue:** What legal question does this raise?
2. **Rule:** The controlling rule or test
3. **Application:** How does the rule apply to these facts? Consider competing arguments.
4. **Conclusion:** Most likely outcome and why

Flag any ambiguities in the facts and how they might affect the analysis.
```

---

### Case Law Research

**Use this when:** You need to understand the landscape of case law on a topic.

```
Create a matrix of cases addressing [LEGAL TOPIC]. For each case, include:

1. Citation and court
2. Key facts (1-2 sentences)
3. Holding (what did the court decide?)
4. Reasoning (why?)
5. Relationship to other cases (does it extend, limit, or overrule prior law?)

Organize chronologically or thematically, depending on the body of law.
```

---

## API / Embedding Guide

### How to Use These Prompts

1. **Copy the prompt** exactly as written
2. **Add your materials** (cases, facts, assignments)
3. **Customize placeholders** in `[BRACKETS]`
4. **Paste into your AI tool** of choice
5. **Iterate** — refine based on the output

### Recommended AI Platforms

- **Claude (Anthropic)** — Best for legal reasoning and nuance
- **GPT-4 (OpenAI)** — Strong at case analysis and synthesis
- **Gemini (Google)** — Good for document review
- **Local models (Ollama, etc.)** — For privacy-focused work

---

## GitHub Repository

These prompts live in an open-source repository. You can:

- **Browse and download** all prompts
- **Contribute improvements** via pull request
- **Customize for your jurisdiction** or practice area
- **Share with your study group** or legal team

**[View on GitHub](https://github.com/ai-prose/prompts)**

---

## Contributing

Have a prompt that works well for you? Share it. Have feedback on these prompts? Submit an issue or PR.

AIProSe is built by the community, for the community. Better prompts make better legal reasoning available to everyone.

---

## Disclaimer

These prompts are tools for legal reasoning and self-help preparation. They are **not** a substitute for licensed legal advice. Always have your work reviewed by a qualified attorney before filing, submitting, or relying on any legal documents generated with AI assistance.

AIProSe is not a law firm and does not provide legal representation.