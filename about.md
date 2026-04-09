---
layout: default
title: About
description: The mission, values, and design philosophy behind AI pro se.
---

<style>
  .about-page {
    --ink: #10243a;
    --muted: #4c6175;
    --line: #d3deea;
    --panel: #ffffff;
    --panel-soft: #f4f9ff;
    --accent: #0d5ea6;
    --accent-soft: #dcedff;
    --gold: #a86e00;
    display: grid;
    gap: 28px;
  }

  .about-page p {
    margin: 0;
  }

  .about-hero {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
    gap: 24px;
    align-items: stretch;
    padding: 28px;
    border: 1px solid var(--line);
    border-radius: 28px;
    background:
      radial-gradient(circle at top right, rgba(13, 94, 166, 0.16), transparent 34%),
      linear-gradient(135deg, #fbfdff 0%, #eef5fb 100%);
    box-shadow: 0 20px 48px rgba(16, 36, 58, 0.08);
  }

  .about-kicker {
    display: inline-flex;
    align-items: center;
    margin-bottom: 14px;
    padding: 7px 12px;
    border-radius: 999px;
    background: rgba(13, 94, 166, 0.1);
    color: var(--accent);
    font-size: 0.84rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .about-hero h1 {
    margin: 0 0 14px;
    color: var(--ink);
    font-size: clamp(2.3rem, 5vw, 3.7rem);
    line-height: 1.02;
  }

  .about-mission {
    margin-bottom: 16px;
    color: var(--ink);
    font-size: 1.18rem;
    line-height: 1.65;
  }

  .about-hero-copy {
    display: grid;
    gap: 14px;
    color: var(--muted);
  }

  .about-hero-copy strong {
    color: var(--ink);
  }

  .about-hero-figure {
    display: grid;
    gap: 10px;
    margin: 0;
  }

  .about-hero-figure img {
    width: 100%;
    height: 100%;
    min-height: 280px;
    object-fit: cover;
    border-radius: 22px;
    box-shadow: 0 18px 34px rgba(16, 36, 58, 0.16);
  }

  .about-hero-figure figcaption {
    color: var(--muted);
    font-size: 0.92rem;
  }

  .about-section {
    display: grid;
    gap: 18px;
    padding: 26px 28px;
    border: 1px solid var(--line);
    border-radius: 24px;
    background: var(--panel);
    box-shadow: 0 14px 30px rgba(16, 36, 58, 0.05);
  }

  .about-section h2 {
    margin: 0;
    color: var(--ink);
    font-size: 1.55rem;
  }

  .about-section h3 {
    margin: 0;
    color: var(--accent);
    font-size: 1.05rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .about-section p {
    color: var(--muted);
    line-height: 1.85;
  }

  .about-section p strong {
    color: var(--ink);
  }

  .about-split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
    gap: 22px;
    align-items: start;
  }

  .about-split figure,
  .about-gallery figure {
    margin: 0;
  }

  .about-split img,
  .about-gallery img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 18px 32px rgba(16, 36, 58, 0.12);
  }

  .about-split figcaption,
  .about-gallery figcaption {
    margin-top: 10px;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .about-manifesto {
    display: grid;
    gap: 12px;
    margin: 0;
    padding: 18px 20px 18px 38px;
    border-radius: 20px;
    background: var(--panel-soft);
  }

  .about-manifesto li {
    color: var(--ink);
    line-height: 1.7;
  }

  .about-manifesto strong {
    color: var(--accent);
  }

  .about-promise {
    padding: 22px 24px;
    border-radius: 22px;
    background: linear-gradient(135deg, #fff7e8 0%, #fffdf8 100%);
    border: 1px solid rgba(168, 110, 0, 0.18);
  }

  .about-promise p {
    color: #5c430c;
  }

  .about-gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .about-close {
    padding: 30px 28px;
    border-radius: 26px;
    background: linear-gradient(135deg, #0f2237 0%, #133b63 100%);
    color: #f8fbff;
    box-shadow: 0 24px 44px rgba(16, 36, 58, 0.18);
  }

  .about-close h2 {
    margin: 0 0 12px;
    color: #ffffff;
  }

  .about-close p {
    color: rgba(248, 251, 255, 0.9);
    line-height: 1.85;
  }

  @media (max-width: 760px) {
    .about-hero,
    .about-split,
    .about-gallery {
      grid-template-columns: 1fr;
    }

    .about-hero,
    .about-section,
    .about-close {
      padding: 22px;
    }
  }
</style>

<div class="about-page">
  <section class="about-hero">
    <div>
      <span class="about-kicker">About AI pro se</span>
      <h1>Legal information should not be locked behind money, fluency, or insider access.</h1>
      <p class="about-mission">
        <strong>AI</strong> <em>pro se</em> is being built around one idea: giving people the ability to navigate AI tools in a modern era where simple "Google" searches are mere dead-ends when navigating their own personal legal matters.
      </p>
      <div class="about-hero-copy">
        <p>
          This is not a project about pretending law is easy. It is a project about refusing to accept that confusion is the natural price of needing help. The law is dense, procedural, expensive, and often hostile to people encountering it without a map. Too many people are left improvising in high-stakes situations where disorganized records, unfamiliar terminology, and fragmented information can do real damage.
        </p>
        <p>
          <strong>AI</strong> <em>pro se</em> exists to shrink that gap between panic and orientation. The aim is to give people a better way to organize what is happening, understand legal information at a general level, and prepare for more effective conversations with legal aid, clinics, or licensed counsel when legal advice is needed.
        </p>
      </div>
    </div>
    <figure class="about-hero-figure">
      <img src="/assets/images/AIProSe%20second%20image.png" alt="AI pro se visual showing transparent legal AI workflows across connected devices." />
      <figcaption>Built around transparency, practical workflows, and legal learning tools that ordinary people can actually use.</figcaption>
    </figure>
  </section>

  <section class="about-section">
    <h2>The Core Mission</h2>
    <p>
      The mission is simple to say and hard to execute: <strong>democratize legal understanding without trivializing law</strong>. That means building tools that help people learn, organize, and communicate legal information more coherently while staying honest about what technology can and cannot do.
    </p>
    <p>
      Current legal technology is optimized for repeat players, institutional buyers, and professionals with training already in place. That is understandable, but it leaves a great many people stranded in the middle. They can find fragments of information at best, sometimes they can find forms on certain court websites. What they often cannot find is a system that helps them understand some of the basic procedural and formal nuances of simple things like what it means when someone files a protective order agains you and you simply can't afford an attorney to defend yourself.
    </p>
  </section>

  <section class="about-section about-split">
    <div>
      <h2>Why This Matters</h2>
      <p>
        There is already an enormous amount of legal information available, but the problem is access to comprehension. People facing a housing problem, a court notice, a contract conflict, a benefits question, or a looming deadline are often facing expensive attorney fees, when the reality is that a few "crash course" videos on YouTube might really help them understand the situation - but what keywords help them find the videos that really narrow on their issue. What even IS their issue? 
      </p>
    </div>
    <figure>
      <img src="/assets/images/AIProSe%20detail%2001.png" alt="AI pro se workstation showing research, document organization, and prompt workflows across devices." />
      <figcaption>The point is not just to answer a question. The point is to help users move from scattered facts to organized materials and clearer questions.</figcaption>
    </figure>
  </section>

  <section class="about-section">
    <h3>Who We Are Building For</h3>
    <p>
      This project is for people dealing with real legal confusion. It is for the tenant trying to organize housing paperwork before speaking with legal aid or counsel. It is for the executor or family member trying to sort records and obligations without learning by disaster. It is for the co-owner in a property conflict, the small business owner facing a contract problem, and even the law student who wants to see how doctrine translates into real-world legal structure.  Those people do not merely need a prettier search box. They need tools that respect how disorienting legal problems can be for non-lawyers.
    </p>
    <div class="about-promise">
      <p>
        <strong>The promise here is modest on purpose:</strong> help people learn better, organize better, and prepare better for conversations with licensed counsel when the next steps really are high-stakes or complicated.
      </p>
    </div>
  </section>

  <section class="about-section">
    <h2>How The Project Thinks About AI</h2>
    <p>
      AI is not magic, and it is not neutral. It can be insightful, brittle, clarifying, misleading, efficient, or dangerously overconfident depending on how it is shaped. That is exactly why the surrounding context matters so much.
    </p>
    <p>
      We want systems that are useful because they are disciplined, not because they sound impressive. We want people to see the logic layer, not just the polish layer. And we want to keep building in a way that makes future collaboration possible, whether that means shared prompt libraries, browsable assets, classroom resources, or guided interfaces that help people explore how legal information is being organized and explained.
    </p>
  </section>

  <section class="about-section">
    <h2>What We Are Building Toward</h2>
    <div class="about-gallery">
      <figure>
        <img src="/assets/images/AIProSe%20second%20image.png" alt="AI pro se system illustration featuring public prompt workflows, AI model choices, and educational materials." />
        <figcaption>An open workflow layer where prompts, assets, and learning patterns can be inspected and improved.</figcaption>
      </figure>
      <figure>
        <img src="/assets/images/KasoLaw.png" alt="AI pro se interface concept showing document organization, legal research support, summaries, and educational templates in one workspace." />
        <figcaption>A practical product layer where users can move from questions and records to research support, summaries, and educational templates in one place.</figcaption>
      </figure>
    </div>
    <p>
      Over time, this can become more than a set of isolated tools. It can become a public learning library: prompts, workflows, explainers, discussions, classroom materials, and guided systems that let people not only use legal AI but understand the architecture behind it.
    </p>
  </section>

  <section class="about-close">
    <h2>The Long View</h2>
    <p>
      AI will change the legal landscape. The open question is whether that change will make the strong stronger, or if access to AI will narrow the gap and improve the public's ability to co-exist with legal professionals. <strong>AI</strong> <em>pro se</em> is built in favor of the second path. If legal information becomes cheaper to generate but remains hard to navigate, verify, and organize, then the access problem has not really moved. If it becomes more available, more legible, and more grounded in the needs of people handling real problems, then something genuinely useful becomes possible. That is the work this project is trying to do.
    </p>
  </section>
</div>