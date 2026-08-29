import type { Topic } from "../../types/content";

export const javascriptAdvancedTopics: Topic[] = [
  {
    id: "promises",
    title: "Promises",
    level: "advanced",
    description: "An object that represents a value you'll get later, not right now.",
    explanation: `
Some tasks don't finish instantly — fetching data from a server, reading a
file, waiting a few seconds. JavaScript can't just pause and wait around,
because that would freeze the whole page. Instead, it needs a way to say
"start this task, and let me know when it's done."

A **Promise** is an object that represents a value that isn't ready yet, but
will be — either successfully (**resolved**) or unsuccessfully (**rejected**).
You attach instructions for what to do in each case using \`.then()\` and
\`.catch()\`.
    `.trim(),
    analogy:
      "A promise is like a food delivery tracking number. You don't have the food yet, but you have something that represents it — and you can be notified the moment it arrives, or if the order fails.",
    examples: [
      {
        title: "Creating and using a promise",
        code: `function waitOneSecond() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done waiting!");
    }, 1000);
  });
}

waitOneSecond()
  .then((message) => console.log(message)) // logs "Done waiting!" after 1s
  .catch((error) => console.log("Something went wrong:", error));`,
      },
    ],
    howItWorks: `
A promise starts in a "pending" state. When the task finishes, it either
calls \`resolve(value)\` — moving the promise to "fulfilled" and triggering any
\`.then()\` callbacks — or calls \`reject(error)\`, moving it to "rejected" and
triggering \`.catch()\`. Once settled, a promise's outcome never changes again.
    `.trim(),
    diagram: `
Promise created (pending)
       ↓
Task runs in the background
       ↓
   ┌───────┴───────┐
success           failure
   ↓                 ↓
resolve(value)   reject(error)
   ↓                 ↓
.then() runs     .catch() runs
    `.trim(),
    whyItExists: `
Before promises, handling multiple sequential async tasks (like "fetch a
user, then fetch their orders, then fetch order details") led to deeply
nested callbacks that were hard to read and error-prone. Promises give
asynchronous code a consistent shape and let errors be handled in one place.
    `.trim(),
    commonMistakes: [
      "Forgetting to add a `.catch()`, so errors disappear silently.",
      "Nesting `.then()` calls instead of chaining them, recreating the exact mess promises were meant to fix.",
      "Forgetting to `return` a value inside a `.then()`, breaking the chain for the next `.then()`.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Create a promise that resolves with your name after 500ms, and log it with `.then()`." },
      { difficulty: "Medium", prompt: "Create a promise that randomly resolves or rejects, and handle both cases." },
      { difficulty: "Hard", prompt: "Chain three promises together, each depending on the previous result, using `.then()`." },
    ],
    interviewQuestions: [
      { question: "What are the three states of a promise?", answer: "Pending (not yet settled), fulfilled (resolved successfully), and rejected (failed)." },
      { question: "What's the difference between `.then()` and `.catch()`?", answer: "`.then()` handles a successful resolution; `.catch()` handles a rejection (an error)." },
      { question: "What does `Promise.all()` do?", answer: "It takes an array of promises and resolves once all of them succeed, or rejects as soon as any one of them fails." },
    ],
    relatedTopics: ["async-await", "event-loop"],
    keywords: ["promise", "resolve", "reject", "then", "catch", "async"],
  },
  {
    id: "async-await",
    title: "Async/Await",
    level: "advanced",
    description: "A cleaner way to write asynchronous code so it reads like normal, step-by-step code.",
    explanation: `
Promises solved the "callback mess" problem, but chaining many \`.then()\`
calls can still be hard to read. **async/await** is newer syntax built on
top of promises that lets you write asynchronous code that *looks*
synchronous — top to bottom, like normal steps — while still not blocking
the rest of the program.

You mark a function as \`async\`, and inside it you use \`await\` before a
promise to pause that function (and only that function) until the promise
settles.
    `.trim(),
    analogy:
      "It's like a recipe written as a checklist instead of a tangle of arrows: 'wait for the water to boil, then add pasta, then wait 10 minutes.' Each step waits for the previous one, written in plain, readable order.",
    examples: [
      {
        title: "Using async/await",
        code: `async function getUserData() {
  const response = await fetch("/api/user");
  const data = await response.json();
  return data;
}`,
      },
      {
        title: "Handling errors with try/catch",
        code: `async function getUserData() {
  try {
    const response = await fetch("/api/user");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Failed to load user:", error);
  }
}`,
      },
    ],
    howItWorks: `
When JavaScript hits \`await somePromise\`, it pauses that async function's
progress right there — without freezing the rest of the program — and lets
other code keep running. Once the promise settles, the function resumes
exactly where it left off, with the resolved value in hand (or an error, if
it was rejected).
    `.trim(),
    whyItExists: `
async/await exists purely to make promise-based code easier to read and
reason about. It doesn't replace promises — it's built entirely on top of
them — but it removes a lot of the \`.then()\` chaining boilerplate.
    `.trim(),
    commonMistakes: [
      "Forgetting the `async` keyword on a function that uses `await` inside it.",
      "Forgetting to wrap `await` calls in `try/catch`, so rejected promises crash the function silently.",
      "Using `await` in a loop when the calls don't actually depend on each other, making things slower than necessary (running them in parallel with `Promise.all` would be faster).",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Convert a `.then()`-based promise chain into an `async/await` function." },
      { difficulty: "Medium", prompt: "Write an async function that fetches data and handles errors with `try/catch`." },
      { difficulty: "Hard", prompt: "Write an async function that runs three independent async tasks in parallel using `Promise.all`, instead of `await`-ing them one by one." },
    ],
    interviewQuestions: [
      { question: "How does `async/await` relate to promises?", answer: "It's syntax sugar over promises — an `async` function always returns a promise, and `await` pauses execution until a promise settles." },
      { question: "How do you handle errors in async/await code?", answer: "With a `try/catch` block around the `await` calls." },
      { question: "Does `await` block the entire program?", answer: "No — it only pauses the current async function. The rest of the program (and browser) keeps running normally." },
    ],
    relatedTopics: ["promises", "event-loop"],
    keywords: ["async", "await", "try catch", "asynchronous"],
  },
  {
    id: "event-loop",
    title: "Event Loop",
    level: "advanced",
    description: "The mechanism that lets JavaScript handle many tasks without ever running two at once.",
    explanation: `
JavaScript can only do one thing at a time — it has a single "thread" of
execution. And yet it can handle things like timers, network requests, and
user clicks all seemingly "at once" without freezing the page. The
**event loop** is the mechanism that makes this possible.

It works by separating "run this code right now" from "run this code later,
once something else finishes" — and constantly checking whether it's time
to run any of that waiting code.
    `.trim(),
    analogy:
      "Imagine a single chef in a kitchen who can only cook one dish at a time, but has an oven timer for things in the background. The chef finishes the current dish, checks if any timers have gone off, handles those, then moves to the next task — never doing two things simultaneously, but never sitting idle either.",
    examples: [
      {
        title: "Order of execution",
        code: `console.log("1: start");

setTimeout(() => {
  console.log("2: timeout callback");
}, 0);

console.log("3: end");

// Output order:
// 1: start
// 3: end
// 2: timeout callback`,
        explanation:
          "Even with a 0ms delay, the timeout callback runs after all the regular code — because it has to wait for the main code to finish first.",
      },
    ],
    howItWorks: `
JavaScript runs your main code on something called the **call stack**. When
it encounters something asynchronous (like \`setTimeout\` or a network
request), that task is handed off to the browser, and JavaScript keeps
running the rest of the main code. Once the async task finishes, its
callback is placed in a **queue**. The event loop's job is simple: constantly
check "is the call stack empty?" — and if so, take the next item from the
queue and run it.
    `.trim(),
    diagram: `
Call stack (running now)
       ↓ empty?
Event loop checks the queue
       ↓
Queue has a waiting callback? ──▶ run it on the call stack
       ↓ no
keep checking
    `.trim(),
    whyItExists: `
Without the event loop, any slow task (like a network request) would
freeze the entire page until it finished. The event loop lets JavaScript
start slow tasks, move on immediately, and come back to handle the result
later — keeping the page responsive the whole time.
    `.trim(),
    commonMistakes: [
      "Assuming `setTimeout(fn, 0)` runs immediately — it still waits for the current code to finish first.",
      "Not realizing that a long-running synchronous loop can freeze the page, since nothing else can run until the call stack is clear.",
      "Confusing the order of promise callbacks (microtasks) and timer callbacks (macrotasks) — promises generally run first.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Predict, then verify, the console output order of a mix of `console.log` and `setTimeout` calls." },
      { difficulty: "Medium", prompt: "Write a small snippet mixing a `Promise.resolve().then()` and a `setTimeout`, and explain which runs first and why." },
      { difficulty: "Hard", prompt: "Explain, in your own words, why a `for` loop with a billion iterations would freeze a webpage." },
    ],
    interviewQuestions: [
      { question: "Is JavaScript single-threaded?", answer: "Yes — it runs one line of code at a time on a single call stack, but the browser provides separate mechanisms (timers, network APIs) to handle slow work in the background." },
      { question: "What is the difference between the call stack and the task queue?", answer: "The call stack is where code currently executes, one frame at a time. The task queue holds callbacks (from timers, promises, events) waiting for the stack to be empty before they can run." },
      { question: "Do microtasks (promises) or macrotasks (setTimeout) run first?", answer: "Microtasks run first — the event loop drains the entire microtask queue before picking up the next macrotask." },
    ],
    relatedTopics: ["promises", "async-await"],
    keywords: ["event loop", "call stack", "queue", "single-threaded", "microtask"],
  },
  {
    id: "prototypes",
    title: "Prototypes",
    level: "advanced",
    description: "How JavaScript objects share behavior with each other behind the scenes.",
    explanation: `
When you call \`"hello".toUpperCase()\`, you're using a method you never
defined yourself. Where did it come from? Every object in JavaScript has a
hidden link to another object it can "fall back to" when it doesn't have a
property itself — that fallback object is called its **prototype**.

If JavaScript can't find a property directly on an object, it checks the
object's prototype, then that prototype's prototype, and so on, until it
finds the property or runs out of links. This chain is called the
**prototype chain**.
    `.trim(),
    analogy:
      "Imagine asking a coworker a question. If they don't know the answer, they ask their manager. If the manager doesn't know, they ask their manager. Each object checks its own knowledge first, then defers up a chain until someone has the answer.",
    examples: [
      {
        title: "Objects sharing behavior via a prototype",
        code: `const animal = {
  speak() {
    console.log(this.name + " makes a sound.");
  },
};

const dog = Object.create(animal);
dog.name = "Rex";

dog.speak(); // "Rex makes a sound."
// dog doesn't have its own "speak" method — it found it on "animal"`,
      },
    ],
    howItWorks: `
Every object has an internal link (accessible via \`Object.getPrototypeOf\`)
pointing to another object. Property lookup checks the object itself first;
if not found, it walks up this chain of prototypes. Arrays and functions
are also objects, and they get useful built-in methods (like \`.map()\` or
\`.call()\`) this exact same way — from their own prototypes.
    `.trim(),
    whyItExists: `
Prototypes let many objects share the same methods without each one storing
its own separate copy — saving memory and letting you update shared
behavior in one place. It's the mechanism underneath JavaScript's classes
and built-in types like arrays and strings.
    `.trim(),
    commonMistakes: [
      "Confusing an object's own properties with properties it only has access to through its prototype.",
      "Modifying a shared prototype directly and accidentally affecting every object that relies on it.",
      "Assuming JavaScript's `class` syntax is a completely different system — it's mostly a friendlier way to write prototype-based code.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Use `Object.getPrototypeOf()` on an array and on a plain object, and compare the results." },
      { difficulty: "Medium", prompt: "Create an object `vehicle` with a `honk` method, then use `Object.create()` to make a `car` object that inherits it." },
      { difficulty: "Hard", prompt: "Explain, using the prototype chain, why `[].toString()` works even though arrays don't define `toString` themselves." },
    ],
    interviewQuestions: [
      { question: "What is the prototype chain?", answer: "A series of linked objects that JavaScript walks through when looking up a property that isn't found directly on an object." },
      { question: "How does `class` relate to prototypes?", answer: "JavaScript classes are largely syntax sugar over prototype-based inheritance — methods defined in a class body end up on the class's prototype." },
      { question: "What does `Object.create(proto)` do?", answer: "It creates a new, empty object whose prototype is explicitly set to `proto`, giving it access to everything on `proto` without copying it." },
    ],
    relatedTopics: ["objects", "this"],
    keywords: ["prototype", "prototype chain", "inheritance", "Object.create"],
  },
  {
    id: "this",
    title: "this",
    level: "advanced",
    description: "A special keyword that refers to whatever object is currently 'in charge' of the running code.",
    explanation: `
Sometimes code inside a function needs to refer to "the object I belong
to" without naming that object directly — so the same code can work for
many different objects. JavaScript provides a special keyword, \`this\`, that
refers to that object.

The tricky part: \`this\` isn't fixed to where a function is *written* — it
depends on how the function is *called*. The same function can have a
different \`this\` each time you call it differently.
    `.trim(),
    analogy:
      "Think of \"this\" like the word \"I\" in a sentence. The word itself doesn't change, but who \"I\" refers to depends entirely on who's speaking at the time.",
    examples: [
      {
        title: "`this` depends on how a function is called",
        code: `const user = {
  name: "Amara",
  greet() {
    console.log("Hi, I'm " + this.name);
  },
};

user.greet(); // "Hi, I'm Amara" — this = user, because user.greet() called it

const greetFn = user.greet;
greetFn(); // "Hi, I'm undefined" — this is no longer "user" here`,
        explanation:
          "Calling `user.greet()` sets `this` to `user`. But once the function is detached from `user` and called on its own, `this` no longer points to `user`.",
      },
      {
        title: "Arrow functions and `this`",
        code: `const user = {
  name: "Amara",
  greet: () => {
    console.log("Hi, I'm " + this.name); // ❌ arrow functions don't have their own "this"
  },
};`,
        explanation:
          "Arrow functions intentionally don't have their own `this` — they use `this` from the surrounding code where they were written, which is usually not what you want for object methods.",
      },
    ],
    howItWorks: `
When a regular function is called, JavaScript looks at *how* it was called
to decide what \`this\` should be: calling it as \`obj.method()\` sets \`this\` to
\`obj\`; calling it plain, like \`fn()\`, sets \`this\` to \`undefined\` (in strict
mode) or the global object; and \`.call()\`/\`.apply()\`/\`.bind()\` let you set
\`this\` explicitly. Arrow functions skip this process entirely and just
borrow \`this\` from their enclosing scope.
    `.trim(),
    whyItExists: `
\`this\` lets the same method definition work correctly for many different
objects — one \`greet\` method can be shared by every user object, each
correctly referring to itself, instead of needing a separate hardcoded copy
per object.
    `.trim(),
    commonMistakes: [
      "Passing an object method as a callback (e.g. to `setTimeout`) and losing its intended `this`.",
      "Using a regular function for an object method that's called as a plain callback, instead of binding it or using an arrow function appropriately.",
      "Assuming `this` refers to where a function is defined rather than how it's called.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Create an object with a method that logs `this.name`, and call it normally to confirm it works." },
      { difficulty: "Medium", prompt: "Detach that method into its own variable, call it directly, and explain why `this` breaks." },
      { difficulty: "Hard", prompt: "Fix the broken example using `.bind()`, and explain what `.bind()` actually does." },
    ],
    interviewQuestions: [
      { question: "What determines the value of `this` in a regular function?", answer: "How the function is called — as a method (`obj.fn()`), standalone (`fn()`), with `new`, or with `.call`/`.apply`/`.bind` — not where it's defined." },
      { question: "Why don't arrow functions have their own `this`?", answer: "They were designed to inherit `this` from their surrounding (lexical) scope, which avoids a very common class of bugs when using callbacks inside methods." },
      { question: "What does `.bind()` do?", answer: "It returns a new function with `this` permanently set to whatever value you pass in, regardless of how that new function is later called." },
    ],
    relatedTopics: ["functions", "prototypes", "closures"],
    keywords: ["this", "bind", "call", "apply", "context"],
  },
];
