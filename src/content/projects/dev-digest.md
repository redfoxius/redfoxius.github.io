---
title: Dev Digest
summary: A local-first studio for AI pull-request review. I took a course starter template and extended it with more than 150 commits of features, evals and CI.
group: open-source
status: Open source, course project
stack: [TypeScript, Fastify, Next.js 15, Drizzle, PostgreSQL, pgvector, LLM APIs, MCP]
links:
  - { label: My fork on GitHub, href: "https://github.com/redfoxius/dev-digest" }
  - { label: Original starter, href: "https://github.com/ai-agentic-engineering-neo/dev-digest" }
order: 5
---

## Where it started

Dev Digest began as the starter template of an AI agentic engineering course by Ivan Lapa. The
starter does one thing end to end: import a GitHub pull request, index the repository, and run an
LLM review that returns structured findings, with a "grounding gate" that drops findings pointing
at lines that are not in the diff.

Everything below is what I built on top of it in my fork, over about a month and more than 150
commits.

## What I added

- **Intent layer.** Classifies what a PR is trying to do and filters review findings to that
  scope.
- **Smart Diff.** A deterministic file classifier, pseudocode summaries of changes, and real
  suggestions for splitting oversized PRs.
- **PR Brief and Risk Brief.** A summary banner with the PR's intent, risk areas, and why the
  change was made, linked from findings straight to the code they refer to.
- **Blast Radius.** An impact map of the symbols a PR changes and what depends on them, built from
  the repository index, including Go projects with several modules in subdirectories.
- **MCP server.** A local stdio server that exposes PR review to other agents as five tools.
- **Conventions Extractor and agent skills.** Scans a repository for its own conventions,
  verifies them, lets you accept or reject each one and turns them into reusable review skills,
  with per-run usage stats for each skill.
- **Onboarding Generator.** Turns the repository index into a five-part tour: architecture
  overview, critical paths, how to run it locally, a guided reading path, and first tasks.
- **Eval pipeline.** Any finding can become an eval case; an eval dashboard and a compare view
  show how reviewer agents score against them.
- **Evals in CI.** Skill, agent and workflow evals run in GitHub Actions on a small, cheap model,
  with concurrency capped to stay within the provider's account-wide rate limits.

## How I worked

Most features went through the same pipeline, and the repository shows it: a written spec with
numbered acceptance criteria, an implementation plan, the implementation, a self-review pass by a
separate review agent, and fixes in rounds until critical findings were resolved. Some specs
were also reviewed by a different model before implementation, which caught real defects (an
unreachable acceptance criterion, a data-leak risk) before any code existed.

The point of the project for me was exactly that: building with AI agents in a way that stays
reviewable, testable and measurable, rather than accepting whatever the model produces.
