---
theme: nord
colorSchema: dark
title: "Week 5 — DOM Deep Dive"
info: |
  ## JS & TS for Browser Applications
  Week 5: DOM Deep Dive
class: text-left
drawings:
  persist: false
transition: slide-left
mdc: true
layout: default
---
# DOM Deep Dive

## Agenda

1. The DOM — what it is and how it maps to HTML
2. Querying the DOM — selectors and traversal
3. Manipulating elements — create, insert, remove
4. Events — listeners, the event object, bubbling
5. Event delegation — one listener to rule them all
6. Rendering basics — reflow, repaint, batching
7. Live coding — interactive task list

---
layout: section
---

# Part 1 — The DOM Tree

---

# What Is the DOM?

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

**Definition**

> The **Document Object Model** is a live, tree-shaped representation of an HTML page that the browser builds at parse time and exposes to JavaScript.

</div>
<div>

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Tasks</title>
  </head>
  <body>
    <h1>My Tasks</h1>
    <ul id="list">
      <li>Buy milk</li>
      <li>Write code</li>
    </ul>
  </body>
</html>
```

</div>
</div>

<v-clicks>

- The browser parses HTML top-to-bottom and builds a **node tree**
- Each tag, text string and comment becomes a **node**
- JavaScript can **read and modify** this tree at any time — changes are instantly reflected in the viewport
- `document` is the root entry point: `document.body`, `document.head`, `document.title`

</v-clicks>

---

# Node Types

```js
// Every node has a numeric nodeType
document.nodeType               // 9 — DOCUMENT_NODE
document.body.nodeType          // 1 — ELEMENT_NODE
document.body.firstChild        // 3 — TEXT_NODE  (whitespace between tags)
document.createComment('x').nodeType // 8 — COMMENT_NODE
```

<v-clicks>

| `nodeType` | Constant | What it represents |
|---|---|---|
| 1 | `ELEMENT_NODE` | `<div>`, `<ul>`, `<button>` … |
| 3 | `TEXT_NODE` | Text content between tags |
| 8 | `COMMENT_NODE` | `<!-- comment -->` |
| 9 | `DOCUMENT_NODE` | `document` itself |

- In practice you almost always work with **Element nodes** (type 1)
- `children` returns only elements; `childNodes` returns all node types including text
- `element.tagName` returns the tag in upper-case: `'UL'`, `'DIV'`, `'BUTTON'`

</v-clicks>

---

# DOM Traversal

<div class="grid grid-cols-[3fr_2fr] gap-2">
<div>

```js
const list = document.querySelector('#list')

list.parentElement        // <body>
list.children             // HTMLCollection of <li> elements
list.firstElementChild    // first <li>
list.lastElementChild     // last <li>

const item = list.firstElementChild
item.nextElementSibling   // second <li>
item.previousElementSibling // null — it's the first

// Walk UP to find the nearest ancestor matching a selector
const btn   = document.querySelector('.delete-btn')
const liRow = btn.closest('li')  // the <li> that contains the button
```

</div>
<div>

```html
<body>
  <ul id="list">
    <li>
      Buy milk
      <button class="delete-btn">✕</button>
    </li>
    <li>
      Write code
      <button class="delete-btn">✕</button>
    </li>
  </ul>
</body>
```

</div>
</div>

<v-clicks>

- Prefer `*Element*` variants (`children`, `firstElementChild`, etc.) — they skip text nodes
- `closest(selector)` walks **up** until it finds a match or returns `null` — very useful with event delegation
- Never rely on `childNodes[0]` — whitespace text nodes make the index fragile

</v-clicks>

<v-click>

> **Ways to get a reference to an element:** `querySelector`, `querySelectorAll`, `getElementById`, `getElementsByClassName`, `getElementsByTagName`, `closest`, `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `nextElementSibling`, `previousElementSibling`

</v-click>

---
layout: section
---

# Part 2 — Querying & Manipulating Elements

---

# Querying the DOM

```js
// Single element — returns the first match or null
const title = document.querySelector('h1')
const form  = document.querySelector('#task-form')
const first = document.querySelector('li.active')

// Multiple elements — returns a static NodeList (like an array)
const items    = document.querySelectorAll('li')
const actives  = document.querySelectorAll('.active')

// Scoped query — search only inside a container
const list = document.querySelector('#list')
const done = list.querySelectorAll('.done') // only inside #list
```

<v-clicks>

- `querySelector` / `querySelectorAll` accept **any valid CSS selector** — the most flexible option
- `querySelectorAll` returns a **static** `NodeList` — it doesn't update when the DOM changes
- `getElementsByClassName` / `getElementsByTagName` return **live** `HTMLCollection` — it updates automatically (usually a footgun)
- Scope queries to a container (`list.querySelectorAll(...)`) to avoid searching the whole document

</v-clicks>

---

# Creating & Inserting Elements

<div class="grid grid-cols-[3fr_2fr] gap-4">
<div>

```js {1-2|3-5|7-11}
// ✅ Preferred approach — createElement
const li = document.createElement('li')
li.textContent = 'Buy groceries'
li.className = 'task'
li.dataset.id = '42'          // sets data-id="42"

const list = document.querySelector('#list')
list.appendChild(li)           // insert at the END
clonedLi = li.cloneNode();     // clone node to prevent reference duplication
clonedLi.textContent = 'Buy milk';   // updated text content of li
list.prepend(clonedLi)               // insert at the START
```

<v-click at="0">

- **Step 1** — `createElement('li')` creates a detached node in memory — it is **not** in the DOM yet

</v-click>

<v-click at="1">

- **Step 2** — Set `textContent`, `className`, and `dataset` before inserting — mutations happen off-screen, no reflow yet

</v-click>

<v-click at="2">

- **Step 3** — Pick an insertion point: `appendChild` (end), `prepend` (start), `insertBefore` (before a specific sibling)

</v-click>

</div>
<div>

```html
<!-- Step 1: detached node, not in the DOM yet -->
<li></li>
```

<v-click at="1">

```html
<!-- Step 2: properties set, still detached -->
<li class="task" data-id="42">
  Buy groceries
</li>
```

</v-click>

<v-click at="2">

```html
<!-- Step 3: inserted at the end of the list -->
<ul id="list">
  <li>Buy milk</li>
  <li class="task" data-id="42">
    Buy groceries
  </li>
</ul>
```

</v-click>

</div>
</div>

---

# Inserting Elements — More Ways

```js
// insertAdjacentHTML — insert raw HTML relative to a reference element
// positions: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
list.insertAdjacentHTML('beforeend', '<li class="task">New item</li>')
```

<v-click>

```js
// DocumentFragment — batch-insert many nodes with a single reflow
const frag = document.createDocumentFragment()
tasks.forEach(t => {
  const li = document.createElement('li')
  li.textContent = t.title
  frag.appendChild(li)
})
list.appendChild(frag) // ONE DOM update for all tasks
```

</v-click>

---

# Modifying Content & Attributes

```js
const el = document.querySelector('.task')

// Content
el.textContent = 'Updated title'  // ✅ safe — treats value as plain text
el.innerHTML   = '<strong>Bold</strong>' // ⚠️ parses HTML — XSS risk if user-controlled

// Attributes
el.setAttribute('aria-label', 'Delete task')
el.getAttribute('data-id')        // '42'
el.removeAttribute('disabled')

// CSS classes
el.classList.add('done')
el.classList.remove('active')
el.classList.toggle('selected')   // add if absent, remove if present
el.classList.contains('done')     // true / false

// Inline styles (prefer classList over style for toggling)
el.style.display = 'none'
el.style.backgroundColor = '#e2e8f0'
```

<v-click>

**Rule:** always use `textContent` for user-supplied content to prevent XSS. Only use `innerHTML` for trusted, static template strings.

</v-click>

---

# Removing Elements

```js
const item = document.querySelector('.task')

// Modern — call .remove() directly on the element
item.remove()

// Old way — still works, needed in IE11 era
item.parentElement.removeChild(item)
```

<v-clicks>

```js
// Clear all children efficiently
const list = document.querySelector('#list')  
// Option 1 — reassign innerHTML (fast, but loses event listeners on children)  
list.innerHTML = ''  
// Option 2 — loop (explicit, keeps any references for cleanup)
while (list.firstChild) {
  list.removeChild(list.firstChild)
}  
// Option 3 — replaceChildren() — modern, clean
list.replaceChildren()
```

- Removing an element does **not** automatically remove event listeners attached to it — always clean up if you keep references
- `innerHTML = ''` is the fastest way to clear a container when listeners are managed via delegation

</v-clicks>

---
layout: section
---

# Part 3 — Events

---

# 3 Ways to Attach an Event Handler

<div class="grid grid-rows-3 gap-2 mt-2">

<div class="grid grid-cols-[1fr_2fr_2fr] gap-4 items-center">

**1. HTML attribute**

```html
<button onclick="handleClick()">Click me</button>
<script>function handleClick() { console.log('clicked!') }</script>
```

<span>❌ Mixes HTML and JS &nbsp; ❌ Only one handler &nbsp; ❌ Runs in global scope</span>

</div>

<div class="grid grid-cols-[1fr_2fr_2fr] gap-4 items-center">

**2. DOM property**

```js
const btn = document.querySelector('button')
btn.onclick = () => console.log('clicked!')
// assigning again silently overwrites the previous handler
```

<span>⚠️ Cleaner than attribute &nbsp; ❌ Still only one handler &nbsp; ✅ Clear via `btn.onclick = null`</span>

</div>

<div class="grid grid-cols-[1fr_2fr_2fr] gap-4 items-center">

**3. `addEventListener`**

```js
const btn = document.querySelector('button')
btn.addEventListener('click', () => console.log('clicked!'))
btn.addEventListener('click', logAnalytics) // multiple handlers ✅
```

<span>✅ Multiple listeners &nbsp; ✅ Removable precisely &nbsp; ✅ Options: `once`, `passive`, `capture`</span>

</div>

</div>

---

# addEventListener

```js
const btn = document.querySelector('#add-btn')

// Basic usage
btn.addEventListener('click', function (event) {
  console.log('clicked!', event)
})

// Arrow function handler (common for callbacks)
btn.addEventListener('click', (event) => {
  console.log(event.target) // the element that was clicked
})

// Named function — required if you need to removeEventListener later
function handleClick(event) { console.log('click') }
btn.addEventListener('click',    handleClick)
btn.removeEventListener('click', handleClick) // must be the exact same reference
```

---

# addEventListener — 3rd Argument Options

<!-- <div class="grid grid-cols-[3fr_2fr] gap-4 mt-2">
<div> -->

```js
// Boolean shorthand (legacy) — true = capture phase
btn.addEventListener('click', handler, true)

// Options object (modern, preferred)
btn.addEventListener('click', handler, {
  once: true,      // auto-removes after first invocation
  passive: true,   // promises not to call preventDefault()
  capture: false,  // listener runs in bubble phase (default)
})

```

<!-- </div>
<div> -->

| Option | Type | Effect |
|---|---|---|
| `once` | `boolean` | Listener fires once then auto-removes |
| `passive` | `boolean` | Tells browser `preventDefault` won't be called — enables scroll optimisations |
| `capture` | `boolean` | Run in capture (top→down) phase instead of bubble (bottom→up) |

<v-click>

> **Rule of thumb:** always add `{ passive: true }` to `scroll`, `touchstart`, and `touchmove` listeners — it unlocks 60 fps native scrolling on mobile.

</v-click>

<!-- </div>
</div> -->

---

# The Event Object

```js
document.querySelector('#task-form').addEventListener('submit', (event) => {
  event.preventDefault()  // stop the page from reloading
  console.log(event.type)          // 'submit'
  console.log(event.target)        // the <form> element
  console.log(event.currentTarget) // the element the listener is attached to
})
```

<v-clicks>

| Property / Method | What it does |
|---|---|
| `event.type` | Name of the event (`'click'`, `'input'`, …) |
| `event.target` | The element that **originated** the event |
| `event.currentTarget` | The element the **listener is attached to** |
| `event.preventDefault()` | Cancel default browser behaviour (form submit, link navigation) |
| `event.stopPropagation()` | Stop the event from bubbling further up the tree |

</v-clicks>

---

# Event Bubbling

<div class="grid grid-cols-[3fr_2fr] gap-6">
<div>

```js
document.querySelector('li').addEventListener('click', () => console.log('li'))
document.querySelector('ul').addEventListener('click', () => console.log('ul'))
document.querySelector('body').addEventListener('click', () => console.log('body'))
```

<v-click>

Clicking the `<li>` prints:
```
li
ul
body
```

</v-click>

<v-clicks>

- Events **bubble up** from the target element through every ancestor to `document`
- The same click event is dispatched to all three listeners — order: deepest → outermost
- `event.stopPropagation()` stops the bubble — use sparingly, it can break higher-level listeners
- There is also a **capture phase** (outermost → deepest), enabled with `{ capture: true }` — rarely needed

</v-clicks>

</div>
<div class="flex items-center justify-center h-full">

```
┌─ document ───────────────────────┐
│  ┌─ body ─────────────────────┐  │
│  │  ③ console.log('body')     │  │
│  │  ┌─ ul ────────────────┐   │  │
│  │  │  ② console.log('ul')│   │  │
│  │  │  ┌─ li ──────────┐  │   │  │
│  │  │  │ ① click origin│  │   │  │
│  │  │  │  console.log  │  │   │  │
│  │  │  └───────────────┘  │   │  │
│  │  └─────────────────────┘   │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

</div>
</div>

---

# Event Delegation

**Problem:** A list with 1000 items. Each item has a Delete button. Attaching one listener per button = 1000 listeners in memory.

```js
// ❌ One listener per element — expensive and must re-run on every render
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', handleDelete)
})
```

<v-click>

**Solution:** one listener on the **parent** — events bubble up from child to parent.

```js
// ✅ Event delegation — one listener handles all current AND future children
const list = document.querySelector('#list')

list.addEventListener('click', (event) => {
  const btn = event.target.closest('.delete-btn')
  if (!btn) return  // click was somewhere else inside the list

  const li = btn.closest('li')
  li.remove()
})
```

</v-click>

<v-click>

- `event.target` is the **actual element clicked** — could be a button, span inside a button, icon, etc.
- `closest()` walks up from `event.target` to find the element you care about — robust even with nested markup
- Delegation also works for **dynamically added** elements — no need to re-attach listeners after inserting new items

</v-click>

---

# 🔍 Quiz — Bubbling & Delegation

```html
<ul id="list">
  <li data-id="1"><span>Buy milk</span> <button class="del">✕</button></li>
  <li data-id="2"><span>Write code</span> <button class="del">✕</button></li>
</ul>
```

```js
document.querySelector('#list').addEventListener('click', (event) => {
  console.log('target:', event.target.tagName)
  const btn = event.target.closest('.del')
  console.log('btn:', btn)
})
```

The user clicks the **✕ text inside the button** on the first row. What is printed?

<v-click>

```
target: BUTTON     ← event.target is the <button> (the ✕ text is a text node, not an element)
btn: <button ...>  ← closest('.del') finds the button itself
```

If the button contained an `<span>` icon, `event.target` would be the `<span>` and `closest('.del')` would still find the parent `<button>`. That's why `closest` is more robust than `event.target.matches`.

</v-click>

---
layout: section
---

# Part 4 — Rendering Basics

---

# How the Browser Renders a Page

<v-clicks>

1. **Parse HTML** → builds the **DOM** tree
2. **Parse CSS** → builds the **CSSOM** tree
3. **Render Tree** = DOM + CSSOM (only visible nodes)
4. **Layout** (reflow) — calculates position and size of every element
5. **Paint** — fills in pixels: colors, borders, text
6. **Composite** — layers are assembled and sent to the GPU

</v-clicks>

<v-click>

```
Parse HTML ──► DOM ──┐
                     ├──► Render Tree ──► Layout ──► Paint ──► Composite
Parse CSS  ──► CSSOM─┘
```

</v-click>

<v-click>

JS can trigger parts of this pipeline on every DOM change. The key is knowing **which operations are cheap** and which are expensive.

</v-click>

---

# Reflow, Repaint & Composite

<div class="text-sm">
<v-clicks>

| Operation | Triggers | Cost |
|---|---|---|
| **Reflow** (Layout) | Geometry changes: `width`, `height`, `top`, `margin`, font size, adding/removing elements | ❗ Expensive — recalculates the whole subtree |
| **Repaint** | Visual changes: `color`, `background`, `visibility` | ⚠️ Moderate — repaints affected pixels |
| **Composite only** | `transform`, `opacity` | ✅ Cheap — GPU-accelerated, no layout or paint |

</v-clicks>

<v-click>
```js
// ❌ Layout thrashing — read then write then read then write...
for (const item of items) {
  const h = item.offsetHeight  // READ — forces browser to flush & calculate layout
  item.style.height = h + 10 + 'px'  // WRITE — invalidates layout again
}

// ✅ Batch reads first, then writes
const heights = items.map(item => item.offsetHeight) // all reads
items.forEach((item, i) => { item.style.height = heights[i] + 10 + 'px' }) // all writes
```
</v-click>
</div>

---

# Practical Performance Tips

<v-clicks>

**Prefer `classList` over inline `style`**
```js
// ❌ — modifies inline styles, may trigger multiple reflows
el.style.display = 'block'
el.style.opacity = '1'
el.style.transform = 'translateX(0)'

// ✅ — single class toggle, browser batches the changes
el.classList.add('visible')
```

**Use `DocumentFragment` for bulk inserts**
```js
const frag = document.createDocumentFragment()
items.forEach(item => frag.appendChild(buildRow(item)))
list.appendChild(frag) // single reflow
```

**Avoid reading layout properties inside loops**

Properties that trigger layout: `offsetWidth`, `offsetHeight`, `clientWidth`, `scrollTop`, `getBoundingClientRect()` — always read **before** writing.

</v-clicks>

---
layout: section
---

# Part 5 — Live Coding

---

# Live Coding — Interactive Task List

**Goals:**
- Render a list of tasks from a JS array
- Add a new task via an input field
- Delete a task using event delegation
- Toggle task `done` state

**Starting HTML:**

```html
<div id="app">
  <form id="task-form">
    <input id="task-input" type="text" placeholder="New task…" />
    <button type="submit">Add</button>
  </form>
  <ul id="task-list"></ul>
</div>
```

---

# Step 1 — Render Tasks from Data

```js
const tasks = [
  { id: 1, title: 'Buy groceries', done: false },
  { id: 2, title: 'Write tests',   done: true  },
]

function renderTask(task) {
  const li = document.createElement('li')
  li.dataset.id = task.id
  if (task.done) li.classList.add('done')

  li.innerHTML = `
    <span class="title">${task.title}</span>
    <button class="toggle-btn">✓</button>
    <button class="delete-btn">✕</button>
  `
  return li
}

function renderAll() {
  const list = document.querySelector('#task-list')
  list.replaceChildren(...tasks.map(renderTask))
}

renderAll()
```

---

# Step 2 — Add a New Task

```js
const form  = document.querySelector('#task-form')
const input = document.querySelector('#task-input')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const title = input.value.trim()
  if (!title) return  // ignore empty input

  const newTask = {
    id: Date.now(),   // simple unique ID
    title,
    done: false,
  }

  tasks.push(newTask)
  renderAll()         // re-render the whole list from data
  input.value = ''    // clear the input
  input.focus()
})
```

<v-click>

> **Key principle:** never mutate the DOM directly. Change the **data** (`tasks` array), then call `renderAll()`. The DOM is just a reflection of the data.

</v-click>

---

# Step 3 — Delete & Toggle via Delegation

```js
const list = document.querySelector('#task-list')

list.addEventListener('click', (event) => {
  // Find which action button was clicked (if any)
  const deleteBtn = event.target.closest('.delete-btn')
  const toggleBtn = event.target.closest('.toggle-btn')

  if (deleteBtn) {
    const id = Number(deleteBtn.closest('li').dataset.id)
    // Remove from data
    const idx = tasks.findIndex(t => t.id === id)
    tasks.splice(idx, 1)
    renderAll()
  }

  if (toggleBtn) {
    const id = Number(toggleBtn.closest('li').dataset.id)
    // Toggle in data
    const task = tasks.find(t => t.id === id)
    task.done = !task.done
    renderAll()
  }
})
```

---

# 🔍 Quiz — Predict the Behaviour

```js
const list = document.querySelector('#task-list')

list.addEventListener('click', (event) => {
  if (event.target.matches('.delete-btn')) {
    event.target.closest('li').remove()
  }
})
```

This works — but what **breaks** when the delete button markup changes to:

```html
<button class="delete-btn">
  <span class="icon">✕</span>
</button>
```

<v-click>

Clicking the `<span>` icon means `event.target` is the `<span>`, not the `.delete-btn` button.  
`event.target.matches('.delete-btn')` returns `false` — the click is ignored.

**Fix:** use `event.target.closest('.delete-btn')` instead of `.matches()`.

</v-click>

---

# Summary — Week 5

<v-clicks>

- The **DOM** is a live tree of nodes the browser builds from HTML — JS can modify it at runtime
- Query with `querySelector` / `querySelectorAll` (CSS selectors, static result) — scope to a container when possible
- Create elements with `document.createElement()`, set content with `textContent` (not `innerHTML` for user data — XSS risk)
- **Events bubble** from the target up through every ancestor — use this to your advantage
- **Event delegation** — one listener on a parent handles all children, including dynamically added ones — always use `closest()` for robust targeting
- Reflows are expensive — **batch reads before writes**, use `DocumentFragment` for bulk inserts, prefer `classList` over inline styles
- **Data-driven rendering** — mutate your data array, then call a render function — never patch the DOM directly

</v-clicks>

---
layout: center
class: text-center
---

# Questions?

<div class="mt-6 text-xl opacity-70">
  Next week: <strong>Fetch API & Async UI</strong>
</div>
