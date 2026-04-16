# DriveNets Design System — AI Toolkit Playground

Playground repository for evaluating AI-generated code quality when building UI from Figma designs using the DriveNets Design System.

Related Jira ticket: [AR-56575](https://drivenets.atlassian.net/browse/AR-56575)

## Goal

Measure and track how well AI (Cursor agent mode, Claude Opus) translates Figma designs into production-ready React code that correctly uses the DriveNets Design System components, tokens, and patterns.

The repo serves two purposes:

1. **Baseline (`*-before/`)** — capture first-shot results with the current AI workflow, before any improvements.
2. **After improvements (`*-after/`)** — re-run the same designs after AI toolkit enhancements (e.g. Cursor rules, Code Connect, improved prompts) and compare results against the baseline.

## Experiment Setup

| Parameter | Value |
|-----------|-------|
| IDE | Cursor (agent mode) |
| Model | claude-4.6-opus-high |
| Attempt | First shot |
| Stack | React + TypeScript + Vite |
| DS package | `@drivenets/design-system` (pre-installed) |

Each experiment lives in its own directory (separate Vite project) to prevent the AI from reusing previously generated code.

## Experiments

| # | Design | Figma Link | Baseline | After Improvements |
|---|--------|------------|----------|--------------------|
| 1 | Complex Form | [Figma](https://www.figma.com/design/6PzD1I7Xf9UaFkJArGyVAF/DAP-25?node-id=17013-242326&m=dev) | [ds-usage-form-before](ds-usage-form-before/README.md) | - |
| 2 | Page with Table | [Figma](https://www.figma.com/design/6PzD1I7Xf9UaFkJArGyVAF/DAP-25?node-id=23625-312777&m=dev) | [ds-usage-table-before](ds-usage-table-before/README.md) | - |
| 3 | Complex Modal | [Figma](https://www.figma.com/design/6PzD1I7Xf9UaFkJArGyVAF/DAP-25?node-id=23625-312423&m=dev) | [ds-usage-modal-before](ds-usage-modal-before/README.md) | - |
| 4 | Page with Cards | [Figma](https://www.figma.com/design/6PzD1I7Xf9UaFkJArGyVAF/DAP-25?node-id=23625-311964&m=dev) | [ds-usage-card-before](ds-usage-card-before/README.md) | - |

Each experiment directory contains its own `README.md` with a screenshot, the exact prompt used, and a detailed analysis of problems found. Comparing `*-before/` and `*-after/` for the same design shows the impact of AI toolkit improvements.

## Evaluation Criteria

Generated code is evaluated against these success criteria:

- **Component choice** — Does the AI pick the correct DS component (e.g. `DsButton` vs native `<button>`)?
- **Imports** — Are components imported from the DS package, not recreated?
- **Props & variants** — Are correct prop values used (e.g. `size="small"` vs `size="tiny"`)?
- **Composition** — Are compound components used properly (e.g. `DsFormControl` wrapping inputs)?
- **Tokens** — Are DS design tokens used instead of hardcoded CSS values?
- **Hallucinations** — Does the AI invent non-existent components or props?
- **Manual edits required** — How much manual work is needed to reach production quality?

## Naming Convention

```
ds-usage-{design}-before/   → baseline result (no AI improvements)
ds-usage-{design}-after/    → result after AI toolkit improvements
```