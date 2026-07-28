# PlayNest Game Studio Agent Rules & Standards

Welcome to PlayNest Game Studio! All AI Agent interactions and code changes in this workspace must adhere to the following standards, rules, and quality gates:

---

## 1. Studio Architecture & Monorepo Rules
- **Monorepo Directory Hierarchy:**
  - `apps/web/`: Next.js 15 App Router web application wrapper, HUD UI, Landing Page.
  - `packages/level-schema/`: Zod level specs, TS types for objects, rules, events, conditions.
  - `packages/puzzle-engine/`: Core Phaser 3 Game Engine runtime (`LevelLoader`, `ObjectFactory`, `InteractionEngine`, `RuleEngine`, `SaveManager`).
- **Dependency Direction:**
  - Engine & Schema MUST NEVER import React or Next.js components.
  - Web App imports `@playnest/level-schema` and `@playnest/puzzle-engine`.

---

## 2. Level Data Rules (`apps/web/public/levels/level-*.json`)
- All level files MUST be valid JSON conforming to `@playnest/level-schema`.
- Coordinates MUST use normalized screen coordinates (`x: 0.0 -> 1.0`, `y: 0.0 -> 1.0`) relative to 9:16 Canvas viewport.
- Object IDs must be unique per level file and use `camelCase` or `snake_case`.
- Objects with drag interactions that should NOT return to starting position MUST include `"snapBack": false`.
- Every level MUST contain at least one rule with action `completeLevel`.

---

## 3. Game Engine Code Rules (`packages/puzzle-engine/src/**`)
- ZERO memory allocations in hot paths (update loops, Phaser render step) — pre-allocate vectors and caches.
- Handle Phaser input plugin initialization safely (`if (!gameObject.input) scene.input.enable(gameObject)`).
- Ensure Phaser 3 and window-dependent imports are isolated to avoid Next.js SSR / prerender failures.

---

## 4. Quality Gates & Verification
- ALWAYS run `pnpm -r build` before declaring a task or feature complete.
- Verify browser gameplay using browser tools or subagent verification.
