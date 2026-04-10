---
layout: default
title: Tech Stack
---

# Tech Stack

## Open Source First

**AI** *pro se* is being built with a simple priority: make legal information easier to organize, inspect, and work with using open tools and familiar AI services.

This is not a black-box "AI lawyer" pitch. It is closer to an open-source helper layer - a more structured, more transparent workspace that can sit in front of mainstream AI systems people already use, such as ChatGPT, Gemini, and NotebookLM. The goal is not to replace those systems. The goal is to make them easier to use in a disciplined way for legal learning, record organization, summarization, and preparation for conversations with licensed counsel.

At a high level, **AI** *pro se* rests on three pillars:

1. **Open infrastructure** - for code, prompts, versioning, and public iteration  
2. **External AI services** - for summarization, synthesis, document handling, and language tasks  
3. **Human review** - for restraint, refinement, and clear boundaries  

## Open Infrastructure: The Backbone

Open infrastructure is the backbone of the project.

The site, prompts, and workflow patterns are designed to be inspectable rather than mysterious. That matters here because wording, sequence, and structure can materially change how useful a system feels to ordinary users.

### What the open layer does

- Hosts the site and public materials
- Tracks changes to prompts, content, and structure
- Makes iterative improvement easier
- Supports testing, rollback, and public refinement

### Why that matters

Legal-information tools should not feel magical. They should feel inspectable. An open repository makes it easier to see what changed, why it changed, and how the system is being shaped over time.

## AI Services: The Language Layer

**AI** *pro se* is provider-flexible by design.

The project is not built around blind loyalty to one model or one company. Different services are better at different things: some are stronger at long-context summarization, some at document explanation, some at structured extraction, and some at speed or cost control.

In practice, that means the platform can function as a lightweight organizational layer on top of established AI systems rather than pretending to be a foundation model itself.

### How that works in plain English

For ordinary users, the idea is simple: instead of opening a blank chat window and improvising from scratch, they get a more structured starting point. Prompts, workflows, and formatting can be shaped in advance so the interaction is cleaner, more repeatable, and easier to understand.

Depending on the feature, that may mean:

- using a prepared workflow that sends material through a mainstream AI service
- organizing documents before they are summarized
- breaking a large problem into smaller, understandable steps
- producing cleaner summaries, chronologies, and question lists than an ordinary one-shot chat usually gives

At the end of the day, the heavy language-model work is still performed by external AI services accessed through their normal interfaces, connected tools, or API-based workflows.

### Current design approach

- Use established AI services where they are strongest
- Keep prompts and workflows portable across providers
- Reduce dependence on any one platform
- Leave room for privacy-oriented or local options later, if they become practical

### What the AI layer is for

- Summarizing records and documents
- Organizing timelines and communications
- Explaining legal vocabulary and legal information at a general level
- Supporting educational use and study workflows
- Helping users prepare cleaner materials for their own review or for conversations with licensed counsel

## Human Review: The Necessary Constraint

**AI** *pro se* is not based on the fantasy that model output is self-validating.

Human review remains essential. Model output can be useful without being authoritative. The point is not to eliminate judgment. The point is to make organization, revision, and communication more structured and more legible.

### Human oversight matters in three ways

- workflow and prompt design
- revision based on visible failure modes
- clear limits on what the system should and should not claim to do

That is a better foundation than pretending software alone can carry the weight of legal judgment.

![Moderated feedback loop](/assets/images/AIProSe%20second%20image.png){: .inline-left }

## Technical Structure

The current stack is intentionally lean.

### Site layer

- **Jekyll** for static site generation
- **Markdown** for fast, editable content
- **GitHub Pages** for low-friction hosting
- **Custom HTML/CSS/JS** where interactivity actually helps

### Development layer

- Git-based version control
- Local editing in standard developer tools
- Public repository workflow for transparent iteration
- A structure that can grow without becoming bloated too early

### AI connectivity layer

- API-accessible language models and mainstream AI platforms
- Reusable prompt patterns for educational and organizational tasks
- Modular workflow design so tools can improve as models improve

## Why This Stack Fits the Project

This stack fits because it matches the actual purpose of the project.

A public-facing legal-information platform does not need inflated infrastructure on day one. It needs a clean foundation, transparent design choices, and the ability to improve without locking itself into one provider or one style of interaction.

### The advantages are straightforward

- **Transparent**: prompts, content, and revisions can be examined
- **Modular**: providers and workflows can change without rebuilding everything
- **Lean**: low overhead keeps the focus on utility rather than theater
- **Portable**: the project is not trapped inside one closed ecosystem
- **Understandable**: ordinary users can start from a structured workflow instead of a blank prompt box

## Development Direction

**AI** *pro se* is being built in layers.

The first layer is a solid public-facing foundation: site structure, open prompts, workflow patterns, and educational materials.

A later layer may include more polished helper tools that make it easier for users to move documents, notes, and questions through mainstream AI services in a more organized way.

Further ahead, there may be opportunities to build better bridges for people handling legal problems without counsel - especially people trying to learn vocabulary, organize records, and prepare for licensed legal help. That remains a forward-looking area of exploration, not a promise of representation, legal advice, or case-specific judgment.

## Final Note

The real stack is not just Jekyll, GitHub, and AI services.

The real stack is open development, disciplined prompting, careful iteration, and a refusal to fake certainty in a domain where clarity and precision matter.

That is the approach behind **AI** *pro se*.