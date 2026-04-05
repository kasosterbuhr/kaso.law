---
layout: default
title: Tech Stack
---

# Tech Stack

## Built for Practical Legal Work

AIProSe is being built with a simple priority: make legal problem-solving more structured, more transparent, and more usable for real people.

This is not a black-box "AI lawyer" pitch. The stack is designed around clarity, iteration, and modularity. The goal is to create a system that can evolve quickly, remain understandable, and avoid locking itself into one model, one workflow, or one vendor.

At a high level, AIProSe rests on three pillars:

1. **GitHub** - for code, prompts, versioning, and public development  
2. **AI models** - for reasoning, drafting, synthesis, and workflow support  
3. **Human judgment** - for oversight, refinement, and real-world usefulness  

## GitHub: The Operational Backbone

GitHub is the backbone of the project.

It is where the site lives, where prompts and workflows can be refined over time, and where every meaningful change can be tracked instead of guessed at. That matters in a legal context, where wording changes can have real consequences.

### What GitHub does here

- Hosts the project and supports rapid iteration
- Tracks changes to prompts, content, and site structure
- Makes it easier to develop in public
- Creates a clean workflow for testing, rollback, and improvement

### Why that matters

Legal tools should not feel magical. They should feel inspectable. GitHub helps make the project more transparent, more portable, and easier to improve without breaking everything each time a change is made.

## AI Models: The Reasoning Layer

AIProSe is model-flexible by design.

The project is not being built around blind loyalty to one provider. Different models are better at different things: some are stronger at structured reasoning, some at long-context synthesis, some at document handling, and some at speed or cost control.

That flexibility matters because legal workflows are varied. A user may need issue spotting, procedural sequencing, document explanation, summarization, drafting support, or structured intake. No single model is automatically best at all of that.

### Current design approach

- Use major language models where they are strongest
- Build prompts and workflows that can transfer across providers
- Reduce dependence on any one company or API
- Preserve room for local or privacy-oriented model options later

### What the models are actually for

- Turning messy facts into organized legal issues
- Helping users think through procedure and next steps
- Drafting and revising legal-adjacent materials
- Summarizing doctrine, cases, and rules into usable structure
- Supporting guided workflows rather than one-shot guesswork

## Human Judgment: The Constraint That Matters

AIProSe is not based on the fantasy that model output is self-validating.

Human judgment remains essential - not as a marketing flourish, but as the actual constraint that keeps the system useful. Legal reasoning can be powerful without being final. The point is not to remove human review. The point is to make human review more efficient, more structured, and more informed.

### Human oversight shows up in three ways

- Prompt and workflow design
- Iterative review based on failure modes
- Clear boundaries around what the system should and should not do

That is a better foundation than pretending software alone can carry the full weight of legal judgment.

![Moderated feedback loop](/assets/images/AIProSe%20second%20image.png){: .inline-left }

## Technical Structure

The current stack is intentionally lean.

### Site layer

- **Jekyll** for static site generation
- **Markdown** for fast, editable content
- **GitHub Pages** for simple deployment and low-friction hosting
- **Custom HTML/CSS/JS** where interactivity actually helps

### Development layer

- Git-based version control
- Local editing in standard developer tools
- Public repository workflow for transparent iteration
- A structure that can later support more advanced tooling without forcing it too early

### AI layer

- API-accessible large language models
- Reusable prompt patterns for legal workflows
- Modular architecture so workflows can be upgraded as models improve

## Why This Stack Fits the Project

This stack works because it matches the stage and purpose of the project.

A legal access tool does not need inflated infrastructure on day one. It needs a clean foundation, honest design choices, and the ability to improve without collapsing under its own complexity.

### The advantages are straightforward

- **Transparent**: prompts, content, and changes can be examined
- **Modular**: models and workflows can change without rebuilding the whole project
- **Lean**: low overhead keeps the focus on function, not technical theater
- **Portable**: the project is not trapped inside one closed ecosystem

## Development Direction

AIProSe is being built in layers.

The first layer is a solid public-facing foundation: site structure, content, prompts, and workflows.

The next layer is deeper usability: guided tools, better intake structure, cleaner legal workflows, and more refined outputs.

After that comes selective expansion - only where it materially improves the user experience. Not every feature deserves to exist just because it sounds impressive on a roadmap.

## Final Note

The real stack is not just Jekyll, GitHub, and AI models.

The real stack is version control, disciplined prompting, careful iteration, and a refusal to fake certainty in a domain where precision matters.

That is the approach behind AIProSe.