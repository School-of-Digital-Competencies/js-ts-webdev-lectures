# Course Plan: JS & TS for Browser Applications
**Semester:** 2nd semester, 1st course  
**Lecture format:** 14 × 1.5-hour lectures  
**Main project:** Smart Task Manager (vanilla JS → TS)

---
## Week 1 — Professional JS Environment

**Lecture Goals:**
- Understand how JS runs in browser
- Use DevTools effectively
- Run modern JS projects
- Understand npm and the Node ecosystem

**Live Coding Focus:**
- Create Vite project
- Run dev server
- Explore DevTools
- Step-by-step guided counter demo

**Homework 1 (Guided DOM Interaction):**
- Setup Vite project with ESLint & Prettier
- Modify provided counter: change increment, add decrement, color change for negative
- Practice DevTools: inspect button, screenshot
- Estimated time: 1.5–3 hrs

---

## Week 2 — Event Loop & Call Stack

**Lecture Goals:**
- Call stack & execution order
- Event loop and the task (macro-task) queue
- `setTimeout` / `setInterval` timing model
- `Promise` constructor, `.then()`, `.catch()`, `.finally()`

**Live Coding Focus:**
- Predict console outputs with mixed sync/async code
- Visualise call stack and task queue step by step
- Build a simple `.then()` chain

**Homework 2:**
- Predict outputs for 5 provided snippets (sync/async mix)
- Build a `.then()` chain: fetch user → fetch that user's posts
- Estimated time: 2–3 hrs

---

## Week 3 — Async/Await & Advanced Promises

**Lecture Goals:**
- `async/await` syntax and semantics
- Microtasks vs macrotasks — why the order differs
- `Promise.all`, `Promise.race`, `Promise.allSettled`
- Error handling with `try/catch` in async functions

**Live Coding Focus:**
- Refactor a `.then()` chain to `async/await`
- Implement simple task scheduler (`runTasksInOrder`)
- Demo microtask queue behaviour vs `setTimeout`

**Homework 3:**
- Build async scheduler (`runTasksInOrder`)
- Convert provided `.then()` chains to `async/await`
- Estimated time: 2–4 hrs

---

## Week 4 — Closures, Scope & Context

**Lecture Goals:**
- Refresh nested scope
- Deep dive into closures
- Understand `this` in browser
- Arrow vs regular functions

**Live Coding Focus:**
- Counter with private state
- Loop closure bugs
- Extract method with `this` pitfalls

**Homework 4:**
- Implement debounce & throttle
- Fix broken closure examples
- Small private cache factory
- Estimated time: 3–5 hrs

---

## Week 5 — DOM Deep Dive

**Lecture Goals:**
- DOM tree model
- Event delegation
- Efficient querying
- Rendering basics

**Live Coding Focus:**
- Build interactive task list (add/delete/mark complete)
- Demonstrate event delegation

**Homework 5:**
- Task Manager v1: fully interactive list
- Event delegation required
- Estimated time: 4–6 hrs

---

## Week 6 — Fetch API & Async UI

**Lecture Goals:**
- Fetch API & promises
- Error handling
- Loading states
- Debounce in search

**Live Coding Focus:**
- Implement live search UI
- Show loading & error states

**Homework 6:**
- API search feature in Task Manager
- Debounce required
- Handle errors gracefully
- Estimated time: 4–6 hrs

---

## Week 7 — State Management & Persistence

**Lecture Goals:**
- Single source of truth
- State-driven rendering
- Derived state
- Avoid direct DOM mutations
- Store state in `localStorage`
- Serialization / deserialization with `JSON.stringify` / `JSON.parse`
- `storage` events for cross-tab sync

**Live Coding Focus:**
- Refactor Task Manager to use centralized state
- Persist state to `localStorage` and restore on page reload

**Homework 7:**
- Refactor Task Manager: state object manages all tasks and filters
- Add `localStorage` persistence: save on every state change, load on startup
- Estimated time: 5–8 hrs

---

## Week 8 — ES Modules & TypeScript Fundamentals

**Lecture Goals:**
- ES Modules — `import` / `export`, named vs default, tree-shaking
- `import` vs `require` (CommonJS vs ESM)
- Why TS exists and how it builds on ES Modules
- Type inference & annotations
- Strict mode
- Basic types & unions

**Live Coding Focus:**
- Walk through ESM named/default exports and `import` vs `require`
- Convert a plain JS module to TypeScript
- Show type errors introduced by strict mode

**Homework 8:**
- Add TS to Task Manager
- Annotate state & utility functions
- Estimated time: 3–5 hrs

---

## Week 9 — Objects & Prototypes

**Lecture Goals:**
- Prototype chain vs classes
- Object composition
- Method sharing patterns
- Memory considerations

**Live Coding Focus:**
- Manual prototype linking
- Method borrowing demo

**Homework 9:**
- Implement mini EventEmitter: `on`, `off`, `emit`, `once`
- Bonus: wildcard events
- Estimated time: 3–4 hrs

---

## Week 10 — Advanced TypeScript

**Lecture Goals:**
- Interfaces vs types
- Generics
- Utility types
- Typing async code & DOM events

**Live Coding Focus:**
- Generic API helper
- Strongly typed event handlers

**Homework 10:**
- Convert fetch helpers & event handlers to TS
- Use generics where applicable
- Estimated time: 4–6 hrs

---

## Week 11 — Frontend Architecture

**Lecture Goals:**
- Modularization & separation of concerns
- Clean project structure
- File organization

**Live Coding Focus:**
- Refactor Task Manager into modules

**Homework 11:**
- Restructure project into `/state /render /api /utils /types`
- No circular dependencies
- Estimated time: 3–4 hrs

---

## Week 12 — Performance Engineering

**Lecture Goals:**
- Minimize DOM updates
- Rendering cost
- Basic DevTools profiling
- `requestAnimationFrame` and frame budget

**Live Coding Focus:**
- Optimize slow list rendering

**Homework 12:**
- Performance audit of Task Manager
- Optimize search and render
- Add short report of improvements
- Estimated time: 3–5 hrs

---

## Week 13 — Testing Basics

**Lecture Goals:**
- Pure logic testing
- Vitest/Jest intro
- What to test / what not to test

**Live Coding Focus:**
- Write tests for debounce/throttle & state reducers

**Homework 13:**
- Test utility functions & state logic
- No DOM testing required
- Estimated time: 2–4 hrs

---

## Week 14 — Final Project Reviews

**Lecture Goals:**
- Present project architecture
- Discuss TypeScript usage
- Review performance & UX decisions

**Live Coding Focus:**
- Optional live demo
- Instructor feedback

**Homework 14 (Optional):**
- Finish final project
- Prepare presentation

---

# 📌 Notes for Instructor

- Scaffold early DOM interaction (Week 1)
- Emphasize mental models before patterns (closures, async)
- Use Task Manager as progressive semester project
- Midterm can be after Week 8, focusing on Event Loop & Async (Wks 2–3), Closures (Wk 4), DOM & Fetch (Wks 5–6), and State + Persistence (Wk 7)

---