---
theme: nord
colorSchema: dark
title: "Week 3 — Async/Await & Advanced Promises"
info: |
  ## JS & TS for Browser Applications
  Week 3: Async/Await & Advanced Promises
class: text-left
drawings:
  persist: false
transition: slide-left
mdc: true
layout: default
---
# Async/Await & Advanced Promises

## Agenda

1. `async` / `await` — syntax and semantics
2. Refactor `.then()` chains to `async/await`
3. Error handling with `try/catch`
4. Microtasks vs macrotasks — why order differs
5. `Promise.all`, `Promise.race`, `Promise.allSettled`
6. Live coding — simple task scheduler

---
layout: section
---

# Part 1 — async / await

---

# What Does `async` Do?

```js
async function greet() {
  return 'Hello!'
}

const result = greet()
console.log(result) // Promise { 'Hello!' }
```

<v-clicks>

- Marking a function `async` makes it **always return a Promise**
- A plain returned value is automatically wrapped: `return 'Hello!'` → `Promise.resolve('Hello!')`
- You can `await` any async function just like any other Promise
- `async` / `await` is **syntactic sugar** — it compiles down to `.then()` chains internally

</v-clicks>

---

# What Does `await` Do?

```js
function getData() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: 1, title: 'Learn async/await' }), 500)
  })
}

async function loadData() {
  console.log('before await')
  const data = await getData()
  console.log('after await') // resumes here once the Promise resolves
  return data
}
```

<v-clicks>

- `await` **pauses execution** of the `async` function until the Promise settles
- The JS engine is **not blocked** — it continues processing other tasks while waiting
- When the Promise resolves, the function **resumes** from the next line
- `await` can only be used **inside** an `async` function (or at the top level of a module)

</v-clicks>

---

# Refactor — .then() Chain → async/await

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

**Before — .then() chain**

```js
function loadUserAndPosts(id) {
  return loadUser(id)
    .then(user => {
      console.log('User:', user.name)
      return loadPosts(user.id)
    })
    .then(posts => {
      console.log(`${posts.length} post(s)`)
    })
    .catch(err => {
      console.error('Error:', err.message)
    })
}
```

</div>
<div>

**After — async/await**

```js
async function loadUserAndPosts(id) {
  try {
    const user = await loadUser(id)
    console.log('User:', user.name)

    const posts = await loadPosts(user.id)
    console.log(`${posts.length} post(s)`)
  } catch (err) {
    console.error('Error:', err.message)
  }
}
```

</div>
</div>

<v-click>

Same behaviour — but the `async/await` version reads like **synchronous code**.  
Easier to follow, debug, and extend without callback nesting.

</v-click>

---

# Error Handling — try / catch

```js
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`)

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const user = await response.json()
    return user
  } catch (err) {
    console.error('fetchUser failed:', err.message)
    throw err // re-throw so the caller can also handle it
  } finally {
    console.log('fetchUser done') // always runs
  }
}
```

<v-clicks>

- `try` wraps the "happy path" — `await` lines that might fail
- `catch` receives any thrown error, including rejected Promises
- `finally` always executes — use it to hide spinners, enable buttons, clean up resources
- Re-throwing with `throw err` lets errors **bubble up** to the caller

</v-clicks>

---

# Common Mistake — Unhandled Rejection

```js
// ❌ No try/catch — unhandled rejection
async function bad() {
  const data = await fetch('/api/broken-endpoint')
  return data.json()
}

bad() // if this rejects: UnhandledPromiseRejection warning
```

```js
// ✅ Always handle errors at the boundary
async function good() {
  try {
    const data = await fetch('/api/broken-endpoint')
    return data.json()
  } catch (err) {
    console.error('Request failed:', err)
    return null
  }
}
```

<v-click>

**Rule:** every `async` function that can reject should either handle the error internally  
or be called with `.catch()` at the call site — never leave a rejection unhandled.

</v-click>

---
layout: section
---

# Part 2 — Microtasks vs Macrotasks

---

# Two Queues — Quick Recap

<div class="grid grid-cols-2 gap-8 mt-6">
  <div v-click class="border border-blue-400 rounded-lg p-5">
    <div class="text-3xl mb-3">⚡</div>
    <strong>Microtask Queue</strong>
    <p class="text-sm mt-2 opacity-70">Promise callbacks (<code>.then</code>, <code>.catch</code>, <code>.finally</code>), <code>queueMicrotask()</code>, <code>await</code> continuations</p>
  </div>
  <div v-click class="border border-orange-400 rounded-lg p-5">
    <div class="text-3xl mb-3">🕐</div>
    <strong>Macrotask Queue</strong>
    <p class="text-sm mt-2 opacity-70"><code>setTimeout</code>, <code>setInterval</code>, DOM events, I/O callbacks</p>
  </div>
</div>

<v-click>

**The rule:**

> After every macrotask, the engine **drains the entire microtask queue** before picking the next macrotask.

</v-click>

---

# Microtask vs Macrotask — Order Demo

```js
console.log('1 — sync')

setTimeout(() => console.log('2 — macrotask'), 0)

Promise.resolve()
  .then(() => console.log('3 — microtask 1'))
  .then(() => console.log('4 — microtask 2'))

console.log('5 — sync')
```

<v-click>

```
1 — sync
5 — sync
3 — microtask 1
4 — microtask 2
2 — macrotask
```

</v-click>

<v-click>

**Why?** Synchronous code runs first. When the stack empties, the microtask queue is fully drained  
(microtask 1 → its `.then()` queues microtask 2 → microtask 2 runs) **before** any macrotask is processed.

</v-click>

---

# `await` and the Microtask Queue

```js
async function run() {
  console.log('A — start of async fn')
  await Promise.resolve()   // suspends, queues continuation as microtask
  console.log('C — after await')
}

console.log('B — before call')
run()
console.log('D — after call')
```

<v-click>

```
B — before call
A — start of async fn
D — after call
C — after await
```

</v-click>

<v-click>

- `run()` starts synchronously up to the first `await`
- The continuation (`C`) is queued as a **microtask**
- Control returns to the caller — `D` prints
- After the stack empties, the microtask fires → `C` prints

</v-click>

---

# 🔍 Predict the Output — Quiz

```js
console.log('start')

async function foo() {
  console.log('foo start')
  await null
  console.log('foo end')
}

setTimeout(() => console.log('timeout'), 0)
foo()
console.log('end')
```

<v-click>

```
start
foo start
end
foo end
timeout
```

`foo start` prints synchronously. `await null` suspends at a microtask boundary.  
`end` prints. Microtask (`foo end`) drains before the macrotask (`timeout`).

</v-click>

---
layout: section
---

# Part 3 — Promise Combinators

---

# Promise.all — Run in Parallel, Wait for All

```js
const [user, posts, settings] = await Promise.all([
  fetchUser(1),
  fetchPosts(1),
  fetchSettings(1),
])
```

<v-clicks>

- Starts **all Promises at the same time** — true parallel async execution
- Resolves when **every** Promise has fulfilled — result is an array of values in the same order
- **Rejects immediately** if any Promise rejects — other results are discarded

```js
// Compared to sequential:
const user = await fetchUser(1)       // waits 200ms
const posts = await fetchPosts(1)     // then waits 200ms → total ~400ms

// vs parallel:
const [user, posts] = await Promise.all([
  fetchUser(1),   //  ┐ both start at once
  fetchPosts(1),  //  ┘ total ~200ms
])
```

</v-clicks>

---

# Promise.allSettled — Run All, Collect Every Result

```js
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(-1), // this one will reject
  fetchUser(3),
])

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('OK:', result.value)
  } else {
    console.error('Failed:', result.reason.message)
  }
})
```

<v-clicks>

- **Never rejects** — waits for every Promise to settle (fulfill or reject)
- Returns an array of `{ status, value }` or `{ status, reason }` objects
- Ideal when you need **all outcomes**, even partial failures — e.g. batch API calls, dashboard widgets

</v-clicks>

---

# Promise.race — First One Wins

```js
const result = await Promise.race([
  fetchData(),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout!')), 3000)
  ),
])
```

<v-clicks>

- Settles with the **first** Promise to settle — whether fulfilled or rejected
- Common use case: **timeout wrapper** — cancel a slow request if it takes too long
- Note: the other Promises keep running in the background — they just can't affect `result`

| Combinator | Resolves when | Rejects when |
| --- | --- | --- |
| `Promise.all` | **all** fulfill | **any** rejects |
| `Promise.allSettled` | **all** settle | never |
| `Promise.race` | **first** settles | **first** rejects |
| `Promise.any` | **first** fulfills | **all** reject |

</v-clicks>

---
layout: section
---

# Part 4 — Live Coding

---

# Live Coding — runTasksInOrder

**Goal:** run a list of async tasks **one by one**, waiting for each before starting the next.

```js
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const tasks = [
  async () => { await delay(300); console.log('Task 1 done') },
  async () => { await delay(100); console.log('Task 2 done') },
  async () => { await delay(200); console.log('Task 3 done') },
]
```

<v-click>

Expected output:
```
Task 1 done   ← after ~300ms
Task 2 done   ← after ~400ms total
Task 3 done   ← after ~600ms total
```

</v-click>

---

# runTasksInOrder — Implementation

```js
async function runTasksInOrder(tasks) {
  for (const task of tasks) {
    await task() // wait for each task before moving to the next
  }
}

await runTasksInOrder(tasks)
```

<v-clicks>

Why `for...of` and not `forEach`?

```js
// ❌ forEach doesn't await — all tasks fire at once
tasks.forEach(async task => {
  await task()
})

// ✅ for...of respects await — true sequential execution
for (const task of tasks) {
  await task()
}
```

`Array.forEach` is **not Promise-aware** — it ignores the returned Promise from the async callback.

</v-clicks>

---

# runTasksInOrder — Bonus: Collect Results

```js
async function runTasksInOrder(tasks) {
  const results = []

  for (const task of tasks) {
    const result = await task()
    results.push(result)
  }

  return results
}
```

<v-click>

**Compare: sequential vs parallel**

```js
// Sequential — total time = sum of all durations
const results = await runTasksInOrder(tasks)

// Parallel — total time = longest single duration
const results = await Promise.all(tasks.map(task => task()))
```

Choose sequential when tasks **depend on each other** or share a rate-limited resource.  
Choose parallel when tasks are **independent** and you want maximum throughput.

</v-click>

---

# Microtask Queue — Deep Demo

```js
async function step(name, ms) {
  await delay(ms)
  console.log(name, 'done')
}

console.log('start')

step('A', 100)
step('B', 50)
step('C', 75)

console.log('all started')
```

<v-click>

```
start
all started
B done   ← 50ms
C done   ← 75ms
A done   ← 100ms
```

All three `step()` calls start **concurrently** (no `await` before them).  
They run in parallel and finish in timer-expiration order.

</v-click>

---

# Summary — Week 3

<v-clicks>

- `async` functions **always return a Promise**; `await` pauses execution until a Promise settles
- `async/await` is syntactic sugar over `.then()` — same microtask mechanics, cleaner syntax
- Use `try/catch/finally` inside `async` functions for structured error handling
- **Microtasks** (Promise callbacks, `await` continuations) flush **before** the next macrotask
- `Promise.all` — parallel, fails fast; use when all results are required
- `Promise.allSettled` — parallel, never rejects; use when you need every outcome
- `Promise.race` — resolves/rejects with the first settled Promise; useful for timeouts
- `for...of` + `await` = sequential async loop; `Promise.all` = parallel async execution

</v-clicks>

---
layout: center
class: text-center
---

# Questions?

<div class="mt-6 text-xl opacity-70">
  Next week: <strong>Closures, Scope & Context</strong>
</div>
