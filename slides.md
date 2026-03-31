---
theme: nord
colorSchema: dark
title: "Week 4 — Closures, Scope & Context"
info: |
  ## JS & TS for Browser Applications
  Week 4: Closures, Scope & Context
class: text-left
drawings:
  persist: false
transition: slide-left
mdc: true
layout: default
---
# Closures, Scope & Context

## Agenda

1. Lexical scope — how JS resolves variable names
2. Closures — capturing variables from outer scopes
3. Loop closure bugs — a classic trap
4. `this` — binding rules in the browser
5. Arrow vs regular functions
6. Live coding — private state, pitfalls, fixes

---
layout: section
---

# Part 1 — Scope & Closures

---

# Lexical Scope — The Rules

```js
const x = 'global'

function outer() {
  const x = 'outer'

  function inner() {
    const x = 'inner'
    console.log(x) // 'inner'
  }

  inner()
  console.log(x) // 'outer'
}

outer()
console.log(x) // 'global'
```

<v-clicks>

- JS uses **lexical (static) scope** — a variable is resolved by where it is **written**, not where it is called
- Each function creates a new **scope** — variables declared inside are not visible outside
- Inner scopes can read variables from **outer** scopes (scope chain)
- The lookup travels **up the chain** until it finds the name or reaches the global scope

</v-clicks>

---

# The Scope Chain

```js
const base = 10

function multiply(factor) {
  // `base` is not here — JS looks one level up and finds it in global scope
  return base * factor
}

multiply(3) // 30
```

<v-clicks>

- Every function carries a reference to its **enclosing scope** at the time it was defined
- At runtime, looking up a variable walks up the **scope chain**: local → enclosing → ... → global
- If the name is not found anywhere → `ReferenceError`

```js
function outer() {
  const secret = 42

  function inner() {
    console.log(secret) // ✅ found in enclosing scope
  }

  return inner
}

const fn = outer()
fn() // 42 — even though outer() has already returned
```

</v-clicks>

---

# What Is a Closure?

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

**Definition**

> A **closure** is a function that **remembers** the variables from its enclosing scope, even after that scope has finished executing.

</div>
<div>

**Minimal example**

```js
function makeGreeter(name) {
  return function greet() {
    console.log(`Hello, ${name}!`)
  }
}

const greetAlice = makeGreeter('Alice')
const greetBob   = makeGreeter('Bob')

greetAlice() // Hello, Alice!
greetBob()   // Hello, Bob!
```

</div>
</div>

<v-click>

- `makeGreeter` has returned and its call frame is gone — but `name` **lives on** inside each returned function
- Each call to `makeGreeter` creates a **separate closure** with its own copy of `name`
- The closed-over variable is **shared by reference** — not copied by value

</v-click>

---

# Closure — Private State

```js
function makeCounter(initial = 0) {
  let count = initial // private — not accessible from outside

  return {
    increment() { count += 1 },
    decrement() { count -= 1 },
    reset()     { count = initial },
    value()     { return count },
  }
}

const counter = makeCounter(10)
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.value()) // 11
console.log(counter.count)   // undefined — truly private
```

<v-clicks>

- `count` is **fully encapsulated** — the only way to touch it is through the returned methods
- Every call to `makeCounter` produces a **brand new** `count` — instances are independent
- This pattern is the foundation of **module pattern**, React hooks internals, and many APIs

</v-clicks>

---

# Loop Closure Bug — Classic Trap

```js
// ❌ All callbacks share the SAME `i`
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// prints: 3  3  3
```

<v-click>

**Why?** `var` is function-scoped — there is only **one** `i`, and by the time the callbacks fire (100ms later), the loop has already finished and `i === 3`.

</v-click>

<v-click>

```js
// ✅ Fix 1 — use `let` (block-scoped: each iteration gets its own `i`)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// prints: 0  1  2
```

</v-click>

<v-click>

```js
// ✅ Fix 2 — function setTimeout assume more then 2 arguments and arguments strats from 3 will be passed to the callback function
for (var i = 0; i < 3; i++) {
    setTimeout((j) => console.log(j), 100, i)
}
// prints: 0  1  2
```

</v-click>

---

# 🔍 Quiz — What Does This Print?

```js
function makeAdders() {
  const adders = []

  for (let i = 1; i <= 3; i++) {
    adders.push(n => n + i)
  }

  return adders
}

const [add1, add2, add3] = makeAdders()
console.log(add1(10)) // ?
console.log(add2(10)) // ?
console.log(add3(10)) // ?
```

<v-click>

```
11
12
13
```

`let` creates a **new binding per iteration** — each arrow function closes over a different `i`.

</v-click>

---
layout: section
---

# Part 2 — `this` & Function Context

---

# What Is `this`?

<v-clicks>

- `this` is a **special keyword** that refers to the object that is the **current execution context**
- Its value is NOT fixed at definition time — it depends on **how** the function is called
- Four rules determine what `this` refers to — evaluated in priority order:
  1. `new` binding
  2. Explicit binding (`call`, `apply`, `bind`)
  3. Implicit binding (method call: `obj.method()`)
  4. Default binding (plain function call → `window` in browsers, `undefined` in strict mode)

</v-clicks>

---

# `this` — The Four Rules

```js
// 1. new binding — `this` is the newly created object
function Person(name) { this.name = name }
const p = new Person('Dave')
console.log(p.name) // 'Dave'

// 2. Explicit binding — .call / .apply / .bind
function greet() { console.log(this.name) }
greet.call({ name: 'Bob' })  // 'Bob'
greet.apply({ name: 'Eve' }) // 'Eve'
const greetCarol = greet.bind({ name: 'Carol' })
greetCarol()                 // 'Carol'

// 3. Implicit binding — called as a method
const user = { name: 'Alice', greet() { console.log(this.name) } }
user.greet() // 'Alice'  — `this` is `user`

// 4. Default binding — `this` is globalThis (window) in sloppy mode
function show() { console.log(this) }
show() // Window { ... }  (or `undefined` in strict mode)
```

---

# `this` Lost — The Classic Pitfall

```js
const timer = {
  label: 'Timer',
  start() {
    setTimeout(function () {
      console.log(this.label) // ❌ undefined — `this` is window, not `timer`
    }, 1000)
  },
}

timer.start()
```

<v-click>

**Why?** The callback passed to `setTimeout` is called as a plain function (default binding) — `this` is `window`, not `timer`.

</v-click>

<v-click>

```js
// ✅ Fix — save reference to `this`
start() {
  const self = this
  setTimeout(function () {
    console.log(self.label) // 'Timer'
  }, 1000)
}
```

</v-click>

---

# Arrow Functions — Lexical `this`

```js
const timer = {
  label: 'Timer',
  start() {
    // Arrow function — does NOT have its own `this`
    // `this` is inherited from the enclosing `start()` method
    setTimeout(() => {
      console.log(this.label) // ✅ 'Timer'
    }, 1000)
  },
}

timer.start()
```

<v-clicks>

- Arrow functions **do not have their own `this`** — they inherit it from the **lexical enclosing scope**
- The value of `this` inside an arrow is determined at **definition time**, not call time
- Arrow functions cannot be used with `new`, `.call`, `.apply`, or `.bind` to change `this`

</v-clicks>

---

# Arrow vs Regular Functions — Quick Reference

<div class="mt-4">

| Feature | Regular function | Arrow function |
| --- | --- | --- |
| Own `this` | ✅ Yes — set at call time | ❌ No — inherits from enclosing scope |
| Can use `new` | ✅ Yes | ❌ No |
| `arguments` object | ✅ Yes | ❌ No (use rest `...args`) |
| `prototype` property | ✅ Yes | ❌ No |
| Best used for | Methods, constructors | Callbacks, closures |

</div>

<v-click>

**Rule of thumb:**

- Use **arrow functions** for callbacks, event handlers inside methods, and any place you want to preserve the outer `this`
- Use **regular functions** when you need the function to have its own `this` (object methods, constructors, prototype methods)

</v-click>

---

# `this` — Method Extraction Pitfall

```js
const formatter = {
  prefix: 'LOG',
  format(msg) {
    return `[${this.prefix}] ${msg}`
  },
}

// ✅ Called as method — `this` is `formatter`
console.log(formatter.format('hello')) // '[LOG] hello'

// ❌ Extracted and called as plain function
const fmt = formatter.format
console.log(fmt('hello')) // '[undefined] hello'
```

<v-click>

Extracting a method **detaches** it from its owner — `this` becomes the **default binding** (`window` / `undefined`).

</v-click>

---

# `this` — Fixing Detached Methods

Common situation: passing a method as a callback loses `this`.

```js
// ❌ `this` inside format() will be the button element, not formatter
button.addEventListener('click', formatter.format)
```

<v-clicks>

```js
// ✅ Fix 1 — .bind() locks `this` permanently
button.addEventListener('click', formatter.format.bind(formatter))
```

```js
// ✅ Fix 2 — arrow wrapper calls the method on the correct owner
button.addEventListener('click', msg => formatter.format(msg))
```

```js
// ✅ Fix 3 — arrow class field (the method never loses `this`)
class Formatter {
  prefix = 'LOG'
  format = (msg) => `[${this.prefix}] ${msg}`
}
```

</v-clicks>

---
layout: section
---

# Part 3 — Live Coding

---

# Live Coding 1 — Private Counter Factory

**Goal:** build a counter with fully private state using closures.

```js
function makeCounter(initial = 0) {
  // Your implementation here
}

const c1 = makeCounter(0)
const c2 = makeCounter(100)

c1.increment()
c1.increment()
c1.increment()
c2.increment()

console.log(c1.value()) // 3
console.log(c2.value()) // 101
console.log(c1 === c2)  // false — independent instances
```

<v-click>

Try it first — solution on the next slide.

</v-click>

---

# Private Counter — Solution

```js
function makeCounter(initial = 0) {
  let count = initial

  return {
    increment() { count += 1 },
    decrement() { count -= 1 },
    reset()     { count = initial },
    value()     { return count },
  }
}
```

<v-clicks>

- `count` is **encapsulated** — the returned object is the only way to observe or change it
- `initial` is also closed over — `reset()` restores the exact starting value
- Each `makeCounter()` call creates a **fresh scope** → fresh `count` → independent instances

```js
const c = makeCounter(5)
c.increment()
c.increment()
console.log(c.value()) // 7
c.reset()
console.log(c.value()) // 5
```

</v-clicks>

---

# 🔍 Predict the Output — Closure Quiz

```js
function outer() {
  let x = 1

  function inner() {
    let x = 2
    console.log(x) // A
  }

  inner()
  console.log(x) // B
}

outer()
```

<v-click>

```
2   ← A: inner's own `x` shadows outer's
1   ← B: outer's `x` unchanged — inner's `x` was a separate binding
```

</v-click>

<v-click>

**Now with shared reference:**

```js
function outer() {
  let x = 1
  function inner() { x = 99 } // no `let` — mutates outer's `x`
  inner()
  console.log(x) // 99
}
```

Omitting `let`/`const` is not "using the outer variable" as a local — it **mutates** the shared binding in the enclosing scope.

</v-click>

---

# 🔍 Predict the Output — `this` Quiz

```js
const obj = {
  name: 'Obj',
  regular: function () { return this.name },
  arrow: () => this.name,
}

console.log(obj.regular()) // ?
console.log(obj.arrow())   // ?
```

<v-click>

```
'Obj'      ← regular: called as a method → `this` is `obj`
undefined  ← arrow: defined at module level → `this` is globalThis (window.name is '' or undefined)
```

</v-click>

<v-click>

**Key insight:** Arrow functions defined at the top level of an object literal do **not** receive the object as `this` — the enclosing lexical scope is the **module/script** scope, not the object.

</v-click>

---


# Summary — Week 4

<v-clicks>

- **Lexical scope** — JS resolves names by where code is **written**, not where it is called
- **Closure** — a function that remembers its outer scope variables even after that scope has exited
- Closures enable **private state**, factory functions, and module-like encapsulation
- **Loop closure bug** with `var` — fix with `let` (block-scoped) or IIFE (pre-ES6)
- **`this`** is determined at **call time**, not definition time — four rules: default, implicit, explicit, `new`
- **Arrow functions** inherit `this` lexically — ideal for callbacks to avoid losing context
- **Method extraction** detaches `this` — fix with `.bind()`, arrow wrapper, or arrow class field

</v-clicks>

---
layout: center
class: text-center
---

# Questions?

<div class="mt-6 text-xl opacity-70">
  Next week: <strong>Objects & Prototypes</strong>
</div>
