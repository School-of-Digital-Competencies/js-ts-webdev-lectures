---
theme: nord
colorSchema: dark
title: "Week 1 — Professional JS Environment"
info: |
  ## JS & TS for Browser Applications
  Week 1: Professional JS Environment
class: text-left
drawings:
  persist: false
transition: slide-left
mdc: true
layout: default
---
# Professional JS Environment

## Agenda


1. How JS runs in the browser
2. HTML page structure & critical rendering path
3. Chrome DevTools — your daily driver
4. npm & the Node ecosystem
5. Vite — instant dev server
6. Live reload & running JS in the browser


---
layout: section
---

# How JavaScript Runs in the Browser

---

# The Browser Environment

The browser is not just a viewer — it runs your code

<div class="grid grid-cols-3 gap-6 mt-8 text-center">
  <div v-click class="border border-gray-500 rounded-lg p-5">
    <div class="text-3xl mb-3">🖥️</div>
    <strong>DOM</strong>
    <p class="text-sm mt-2 opacity-70">Document Object Model — the HTML tree your JS can read and modify</p>
  </div>
  <div v-click class="border border-gray-500 rounded-lg p-5">
    <div class="text-3xl mb-3">⚙️</div>
    <strong>JS Engine (V8)</strong>
    <p class="text-sm mt-2 opacity-70">Parses, compiles and executes your JavaScript code</p>
  </div>
  <div v-click class="border border-gray-500 rounded-lg p-5">
    <div class="text-3xl mb-3">🌐</div>
    <strong>Web APIs</strong>
    <p class="text-sm mt-2 opacity-70">fetch, setTimeout, localStorage, History…</p>
  </div>
</div>

---

# JS Engine — From Source to Execution

```
Source code (.js)
       ↓  Parser
  AST (Abstract Syntax Tree)
       ↓  Compiler (Ignition → TurboFan)
  Bytecode / Optimised Machine Code
       ↓  Execution
     Result
```

<v-clicks>

- The engine **just-in-time compiles** your code — no separate build step for you
- V8 powers both Chrome **and** Node.js
- Other engines: SpiderMonkey (Firefox), JavaScriptCore (Safari)

</v-clicks>

---
layout: section
---

# HTML Page with JavaScript

---

# Anatomy of an HTML Page with JS

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
    <!-- Stylesheet loaded before JS — no FOUC -->
    <link rel="stylesheet" href="style.css" />
    <script src="some-library.js" defer></script>
    <script src="another-library.js" async></script>
  </head>
  <body>
    <h1 id="title">Hello</h1>

    <!-- Script at end of body: DOM is ready, no blocking -->
    <script src="main.js"></script>

    <!-- OR: modern module script anywhere in <head> -->
    <!-- <script type="module" src="main.js"></script> -->
  </body>
</html>
```

<v-click>

`type="module"` scripts are **deferred by default** — they never block HTML parsing.

</v-click>

---

# Three Ways to Run JS in the Browser

<v-clicks>

**1. Inline `<script>` in HTML**  
Simplest but no modules, no tooling — fine for tiny experiments
```html
<script>
  console.log('Hello from inline script')
</script>
```

**2. External `.js` file (ES Module)**  
Proper separation; must use `type="module"` for `import`/`export`
```html
<script type="module" src="./main.js"></script>
```

**3. DevTools Console**  
Live REPL — runs in the current page context, great for quick experiments
```js
document.title = 'Changed from Console!'
```

</v-clicks>

---

# Critical Rendering Path

The browser follows a fixed sequence before anything appears on screen:

```
HTML bytes → Tokens → DOM
CSS bytes  → Tokens → CSSOM   ┐
                               ├→ Render Tree → Layout → Paint → Composite
                          JS can block both DOM and CSSOM construction
```

<v-clicks>

- **Parser-blocking** — a `<script>` without `defer`/`async` pauses HTML parsing until it downloads and runs
- **`defer`** — script runs after HTML is parsed, in order; same behaviour as `type="module"`
- **`async`** — script runs as soon as it downloads, out of order — avoid for app code
- Rule of thumb: always use `type="module"` or `defer`; never put plain scripts in `<head>`

</v-clicks>

---
layout: section
---

# Chrome DevTools

---

# DevTools — Five Panels You Must Know

| Panel | What it does |
| --- | --- |
| **Elements** | Inspect & live-edit the DOM and CSS |
| **Console** | Run JS, read errors and `console.log` output |
| **Sources** | Debugger — breakpoints, step-by-step execution |
| **Network** | All HTTP requests, payloads, timing |
| **Performance** | Profile rendering and script bottlenecks |

<div class="mt-6 text-center opacity-70 text-sm">
  Open with <kbd>F12</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>
</div>

---

# Console — Your Best Friend

```js
console.log('value:', value)           // print anything
console.table([{ id: 1, name: 'A' }]) // tabular output
console.dir(element)                   // DOM node as JS object
console.time('label')
// ... code ...
console.timeEnd('label')               // measure elapsed time
```

The console is also a **live REPL** — run any JS in the page context:

```js
document.querySelector('h1').textContent = 'Patched!'
```

---

# Sources Panel — Breakpoints

1. Open **Sources** → navigate to your `.js` file
2. Click a line number → blue marker = breakpoint
3. Reload the page or trigger the code path
4. Use the controls to step through execution:

| Key | Action |
| --- | --- |
| `F8` | Resume / Pause |
| `F10` | Step Over (next line) |
| `F11` | Step Into (function call) |
| `Shift+F11` | Step Out |

> "A breakpoint is worth a thousand `console.log` calls."

---
layout: section
---

# The Node Ecosystem & npm

---

# What is npm?

<v-clicks>

- **Node Package Manager** — ships with Node.js
- Registry with 2 million+ open-source packages
- Also a CLI: `npm install`, `npm run`, `npm publish`

</v-clicks>

```bash
# First, install Node.js (includes npm)
node --version   # v22.x
npm --version    # 10.x
```

Every project starts with a `package.json`:

```json
{
  "name": "my-app",
  "scripts": { "dev": "vite", "build": "vite build" },
  "dependencies": {},
  "devDependencies": { "vite": "^6.0.0" }
}
```

---

# node_modules & the Lock File

```
project/
├── package.json        ← you edit this
├── package-lock.json   ← auto-generated, always commit it
└── node_modules/       ← never commit — add to .gitignore
    └── vite/
        └── ...
```

| Command | What it does |
| --- | --- |
| `npm install` | Install all deps from the lock file |
| `npm install vite` | Add a new runtime dependency |
| `npm install -D eslint` | Add a dev-only dependency |
| `npm run dev` | Run the `"dev"` script |

---
layout: section
---

# Vite — Instant Dev Server

---

# Why Vite?

| | Webpack (old school) | Vite (modern) |
| --- | --- | --- |
| Cold start | Bundle everything first | Serve files on demand |
| HMR speed | Re-bundle changed modules | Native ES module swap |
| Config size | Large | Minimal |
| DX | Complex | Just works |

<v-click>

Vite uses **esbuild** (written in Go) for dependency pre-bundling → near-instant startup even with large `node_modules`.

</v-click>

---

# Create a Vite Project — Live Demo

```bash
npm create vite@latest my-app
# ↑ Choose: Vanilla → JavaScript

cd my-app
npm install
npm run dev
```

Resulting project structure:

```
my-app/
├── index.html      ← entry point (Vite serves this directly)
├── main.js         ← your JS entry
├── style.css
└── package.json
```

---
layout: section
---

# Live Reload & Running JS in the Browser

---

# How Vite's Dev Server Works

When you run `npm run dev`, Vite starts a local HTTP server and watches your files:

```
You edit main.js  →  Vite detects the change
                  →  Sends a tiny HMR update over WebSocket
                  →  Browser swaps the module — no full page reload
```

<v-clicks>

- **HMR (Hot Module Replacement)** — only the changed module is replaced, state is preserved where possible
- **Full reload** happens only when the HTML or a non-HMR boundary changes
- The URL stays the same: `http://localhost:5173`

</v-clicks>

---

# Summary — Week 1

<v-clicks>

- JS runs in the browser via the **V8 engine** alongside the DOM and Web APIs
- **DevTools** (Elements, Console, Sources) are your primary debugging tools
- **npm** manages packages; `package.json` + lock file are the source of truth
- **Vite** gives you an instant dev server with native ES module support
- ES Modules (`import` / `export`) will be covered alongside **TypeScript** in Week 9

</v-clicks>

---
layout: center
class: text-center
---

# Questions?

<div class="mt-6 text-xl opacity-70">
Next week: <strong>Event Loop & Call Stack</strong>
</div>

<div class="mt-8 opacity-40 text-sm">
Week 1 · Professional JS Environment · JS & TS for Browser Applications
</div>

