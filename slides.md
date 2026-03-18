---
theme: nord
colorSchema: dark
title: "Week 2 — Event Loop & Call Stack"
info: |
  ## JS & TS for Browser Applications
  Week 2: Event Loop & Call Stack
class: text-left
drawings:
  persist: false
transition: slide-left
mdc: true
layout: default
---
# Event Loop & Call Stack

## Agenda

1. Call stack & execution order
2. JavaScript is single-threaded
3. Web APIs — where async code lives
4. Event loop & macrotask queue
5. `setTimeout` / `setInterval` timing model
6. Promises — `new Promise`, `.then()`, `.catch()`, `.finally()`

---
layout: section
---

# Part 1 — The Call Stack

---

# What Is the Call Stack?

The call stack is a **LIFO data structure** that tracks which function is currently running.

```js
function greet(name) {
  return `Hello, ${name}!`
}

function sayHello() {
  const msg = greet('Alice')
  console.log(msg)
}

sayHello()
```

<v-clicks>

- Every time a function is **called**, a new **execution context** is pushed onto the stack
- When it **returns**, the execution context is popped off
- The engine always executes the **top** execution context

</v-clicks>

---

# Call Stack — Step by Step

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

```js
function greet(name) {
  return `Hello, ${name}!`
}

function sayHello() {
  const msg = greet('Alice')
  console.log(msg)
}

sayHello()
```

</div>
<div>

```
Step 1 — sayHello() called
 ┌──────────────────┐
 │   sayHello()     │  ← executing
 └──────────────────┘

Step 2 — greet() called inside
 ┌──────────────────┐
 │   greet()        │  ← executing
 ├──────────────────┤
 │   sayHello()     │  ← waiting
 └──────────────────┘

Step 3 — greet() returns
 ┌──────────────────┐
 │   sayHello()     │  ← resumes
 └──────────────────┘

Step 4 — sayHello() returns
 (stack is empty)
```

</div>
</div>

<v-click>

**Rule:** The engine only processes one execution context at a time. Nothing else runs while the stack is occupied.

</v-click>

---

# Stack Overflow — When Recursion Goes Wrong

```js
function infinite(i) {
  console.log(i)
  return infinite(i + 1) // never reaches a base case
}

infinite(1) // ❌ RangeError: Maximum call stack size exceeded
```

<v-clicks>

- V8 allows roughly 10 000–15 000 execution contexts before crashing
- Every recursive call adds an execution context — without a **base case**, the stack fills up completely
- The browser throws a `RangeError` and unwinds the stack

Recursion is powerful, but always needs a clear termination condition.

</v-clicks>

---

# Part 2 — Single Thread & Web APIs

## JavaScript Is Single-Threaded

<div class="grid grid-cols-2 gap-8 mt-6">
  <div v-click class="border border-gray-500 rounded-lg p-5">
    <div class="text-3xl mb-3">🧵</div>
    <strong>One call stack</strong>
    <p class="text-sm mt-2 opacity-70">Only one piece of code runs at a time — no true parallelism inside JS</p>
  </div>
  <div v-click class="border border-gray-500 rounded-lg p-5">
    <div class="text-3xl mb-3">🌐</div>
    <strong>Web APIs handle the rest</strong>
    <p class="text-sm mt-2 opacity-70">fetch, setTimeout, DOM events — these run <em>outside</em> the JS engine, inside the browser</p>
  </div>
</div>

<v-click>

```js
// setTimeout does NOT pause the JS engine
// It hands the timer off to a Web API
setTimeout(() => {
  console.log('fired after 2s')
}, 2000)

console.log('this runs immediately') // ← printed first
```

</v-click>

---

# The Browser Runtime — Full Picture

```

┌──────────────────────────────────────────────────────────────┐
│                     JS Engine (V8)                           │
│                                                              │
│   ┌─────────────────┐        ┌────────────────────────┐      │
│   │   Call Stack    │        │   Heap (objects)       │      │
│   │                 │        │                        │      │
│   │  [ main()     ] │        │  { id: 1, name: ... }  │      │
│   └─────────────────┘        └────────────────────────┘      │
└─────────────────┬────────────────────────────────────────────┘
                  ↑  Event Loop pushes tasks here when stack is empty
┌─────────────────┴────────────────────────────────────────────┐
│              Macrotask Queue  (a.k.a. Task Queue)            │
│   [ timer cb ]    [ click handler ]    [ network cb ]        │
└─────────────────┬────────────────────────────────────────────┘
                  ↑  Web APIs push callbacks here when they finish
┌─────────────────┴────────────────────────────────────────────┐
│                        Web APIs                              │
│       setTimeout / setInterval     fetch     DOM events      │
└──────────────────────────────────────────────────────────────┘
```

<div class="mt-4 text-sm opacity-60 text-center">
  Visualise it live → <a href="https://www.jsv9000.app/" target="_blank">jsv9000.app</a>
</div>

---
layout: section
---

# Part 3 — Event Loop & Macrotask Queue

---

# The Event Loop — One Rule

<v-clicks>

The event loop continuously checks a single condition:

> *Is the call stack empty?*
> - **Yes** → take the next task from the queue and push it onto the stack
> - **No** → wait

```
while (true) {
  if (callStack.isEmpty() && taskQueue.hasTask()) {
    callStack.push(taskQueue.dequeue())
  }
}
```

This is why `setTimeout(fn, 0)` does **not** mean "run right now" —  
it means "run as soon as the current stack is clear."

</v-clicks>

---

# Macrotask Queue — What Goes In

<v-clicks>

| Source | When the callback is queued |
| --- | --- |
| `setTimeout(fn, delay)` | After at least `delay` ms |
| `setInterval(fn, delay)` | Every ~`delay` ms |
| DOM event listeners (click, input…) | When the user interacts |

Each macrotask runs **to completion** before the next one starts.  
That's why a long-running synchronous function blocks the entire UI.

</v-clicks>

---

# Why Long Sync Code Freezes the UI

```js
// This blocks the browser for ~3 seconds:
// no clicks, no animations, no scroll
function doHeavyWork() {
  const start = Date.now()
  while (Date.now() - start < 3000) {
    // busy-waiting — holding the call stack hostage
  }
}

btn.addEventListener('click', doHeavyWork)
```

<v-click>

The event loop cannot process any queued task (render, click, scroll)  
while `doHeavyWork` occupies the call stack.

</v-click>

<v-click>

**Solutions:** `setTimeout` chunking &nbsp;·&nbsp; Web Workers &nbsp;·&nbsp; `async`/`await` with I/O

</v-click>

---
layout: section
---

# Part 4 — setTimeout & setInterval

---

# setTimeout — Minimum Delay, Not Exact Timing

```js
console.log('before')

setTimeout(() => {
  console.log('inside timeout')
}, 0) // delay = 0 ms

console.log('after')
```

<v-clicks>

Output:
```
before
after
inside timeout   ← runs AFTER all synchronous code completes
```

`0 ms` means: "queue this for the very next available turn of the event loop."  
Browsers enforce a **minimum delay of ~4 ms** for nested/chained `setTimeout` calls.

</v-clicks>

---

# setInterval — Repeating Timers

```js
let count = 0

const id = setInterval(() => {
  count++
  console.log('tick', count)

  if (count === 3) {
    clearInterval(id) // stop the interval
  }
}, 1000)
```

<v-click>

⚠️ If the callback takes **longer than the interval**, ticks pile up in the queue.  
For smooth, frame-accurate animation use `requestAnimationFrame` instead.  
For precise chained delays, prefer recursive `setTimeout`.

</v-click>

---

# 🔍 Predict the Output — Quiz 1

```js
console.log('A')

setTimeout(() => console.log('B'), 0)

console.log('C')
```

<v-click>

```
A
C
B
```

Synchronous code (`A`, `C`) runs first.  
`B` is queued as a macrotask and executes only after the current stack empties.

</v-click>

---

# 🔍 Predict the Output — Quiz 2

```js
console.log('start')

setTimeout(() => console.log('timeout 1'), 100)
setTimeout(() => console.log('timeout 2'), 0)

console.log('end')
```

<v-click>

```
start
end
timeout 2
timeout 1
```

Both callbacks are macrotasks. They execute in **timer-expiration order** —  
`timeout 2` fires first because its delay (0 ms) expires before 100 ms.

</v-click>

---
layout: section
---

# Part 5 — Promises

---

# What Is a Promise?

<v-clicks>

A **Promise** is an object representing the eventual result of an asynchronous operation.

Think of it like ordering food at a restaurant:

- You place an order → receive a **receipt** (the Promise object)
- You attach instructions: *"when the food is ready, do this"* (`.then()`)
- While waiting, you can do other things — you're not blocked
- If the kitchen fails → you're notified (`.catch()`)

</v-clicks>

---

# Promise States

<div class="grid grid-cols-3 gap-6 mt-8 text-center">
  <div v-click class="border border-yellow-500 rounded-lg p-5">
    <div class="text-3xl mb-3">⏳</div>
    <strong>Pending</strong>
    <p class="text-sm mt-2 opacity-70">Initial state — the async operation has not completed yet</p>
  </div>
  <div v-click class="border border-green-500 rounded-lg p-5">
    <div class="text-3xl mb-3">✅</div>
    <strong>Fulfilled</strong>
    <p class="text-sm mt-2 opacity-70">Operation completed successfully; the result value is available</p>
  </div>
  <div v-click class="border border-red-500 rounded-lg p-5">
    <div class="text-3xl mb-3">❌</div>
    <strong>Rejected</strong>
    <p class="text-sm mt-2 opacity-70">Operation failed; an error reason is available</p>
  </div>
</div>

<v-click>

A promise transitions **Pending → Fulfilled** or **Pending → Rejected** — exactly once.  
Once settled, its state is **immutable** — it never changes again.

</v-click>

---

# Creating a Promise

```js
const p = new Promise((resolve, reject) => {
  // The executor function runs synchronously (right now)
  setTimeout(() => {
    const success = true

    if (success) {
      resolve('Data loaded!') // → fulfilled
    } else {
      reject(new Error('Something went wrong')) // → rejected
    }
  }, 1000)
})
```

<v-clicks>

- The **executor** `(resolve, reject) => { ... }` runs **immediately** when `new Promise()` is called
- `resolve(value)` — settles the promise as fulfilled, value becomes the result
- `reject(reason)` — settles the promise as rejected, reason is the error
- Only the **first** call to either function takes effect; subsequent calls are ignored

</v-clicks>

---

# .then() / .catch() / .finally()

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

```js
function loadUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'Alice' })
      } else {
        reject(new Error('Invalid user ID'))
      }
    }, 500)
  })
}
```

</div>
<div>

```js
loadUser(1)
  .then(user => {
    console.log('Got user:', user.name)
    return user
  })
  .catch(err => {
    console.error('Failed:', err.message)
  })
  .finally(() => {
    console.log('Done — hide loading spinner')
  })
```

</div>
</div>

<v-clicks>

- `.then(onFulfilled)` — runs when the promise resolves; **returns a new Promise**
- `.catch(onRejected)` — catches any error thrown anywhere earlier in the chain
- `.finally(fn)` — runs regardless of outcome; ideal for cleanup (hide spinner, unlock button)

</v-clicks>

---

# Chaining .then() — Load User → Load Posts

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

```js
function loadUser(id) {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id, name: 'Alice' }), 200)
  )
}

function loadPosts(userId) {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]), 200)
  )
}
```

</div>
<div>

```js
loadUser(1)
  .then(user => {
    console.log('User:', user.name)
    // return the next Promise to keep the chain flat
    return loadPosts(user.id)
  })
  .then(posts => {
    console.log(`${posts.length} post(s) found`)
  })
  .catch(err => console.error('Error:', err))
```

</div>
</div>

<v-click>

**Key rule:** always `return` the next Promise from inside `.then()`.  
Forgetting `return` breaks the chain — the next `.then()` receives `undefined`  
and the dependent operation runs "detached" with no error handling.

</v-click>

---

# Microtask Queue — A Preview

Promise callbacks go into the **microtask queue**, not the macrotask queue.

```js
console.log('start')

setTimeout(() => console.log('timeout'), 0)        // macrotask
Promise.resolve().then(() => console.log('promise')) // microtask

console.log('end')
```

<v-click>

```
start
end
promise    ← microtask runs BEFORE the next macrotask
timeout
```

All pending microtasks are flushed **before** the event loop picks the next macrotask.  
We'll explore this fully next week when we cover `async`/`await`.

</v-click>

---

# Summary — Week 2

<v-clicks>

- The **call stack** is a LIFO structure tracking function calls — JS is single-threaded, one execution context at a time
- **Web APIs** (setTimeout, fetch, DOM events) live outside the engine; they push callbacks to the **macrotask queue** when done
- The **event loop** moves queued tasks onto the call stack — only when it is empty
- `setTimeout(fn, 0)` queues `fn` as a macrotask; it always runs **after** current synchronous code
- Long synchronous work **blocks** the event loop — the UI freezes until the stack clears
- A **Promise** is a handle for a future value: `pending` → `fulfilled` or `rejected`
- `.then()` chains stay flat when you **return** the next Promise; `.catch()` handles any upstream error
- Promise callbacks use the **microtask queue** and run before the next macrotask (full details in Week 3)

</v-clicks>

---
layout: center
class: text-center
---

# Questions?

<div class="mt-6 text-xl opacity-70">
  Next week: <strong>Async/Await & Advanced Promises</strong>
</div>

