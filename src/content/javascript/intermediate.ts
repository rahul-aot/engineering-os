import type { Topic } from "../../types/content";

export const javascriptIntermediateTopics: Topic[] = [
  {
    id: "arrays",
    title: "Arrays",
    level: "intermediate",
    description: "An ordered list of values, stored in a single variable.",
    explanation: `
Often you don't just have one value to track — you have many: a list of
names, scores, or products. Instead of creating a separate variable for
each one, JavaScript gives you an **array**: a single container that holds
an ordered list of values, each accessible by its position (its "index").

Indexes start at 0, so the first item is at position 0, the second at
position 1, and so on.
    `.trim(),
    analogy:
      "An array is like a row of numbered lockers. Locker 0 holds the first item, locker 1 the second, and so on. You can look inside any locker directly if you know its number.",
    examples: [
      {
        title: "Creating and using an array",
        code: `const fruits = ["apple", "banana", "cherry"];

console.log(fruits[0]); // "apple"
console.log(fruits.length); // 3

fruits.push("date"); // adds to the end
fruits.pop();        // removes the last item`,
        walkthrough: [
          { code: 'const fruits = ["apple", ...]', explanation: "Creates an array holding three strings, in order." },
          { code: "fruits[0]", explanation: 'Reads the item at index 0 — the first item, "apple".' },
          { code: "fruits.length", explanation: "Reports how many items are in the array right now." },
          { code: 'fruits.push("date");', explanation: 'Adds "date" to the end of the array.' },
          { code: "fruits.pop();", explanation: "Removes and returns the last item in the array." },
        ],
      },
      {
        title: "Looping over an array",
        code: `const scores = [10, 20, 30];

scores.forEach((score) => {
  console.log(score);
});`,
      },
    ],
    howItWorks: `
Internally, an array stores its items in order and keeps track of how many
there are (its \`length\`). Accessing \`fruits[0]\` jumps straight to the item
at position 0 without needing to check the others.
    `.trim(),
    whyItExists: `
Almost every real program deals with collections of things — a list of
users, a shopping cart, search results. Arrays give you a consistent,
built-in way to store, access, and process ordered groups of data.
    `.trim(),
    whenToUse: `
Reach for an array whenever you have more than one related value with a
natural order — a list of to-dos, a set of scores, the results of a
search. If you catch yourself naming variables \`item1\`, \`item2\`, \`item3\`,
that's a sign you want an array instead.
    `.trim(),
    whenNotToUse: `
If your values aren't really a sequence but a set of named attributes
about one thing (a person's name, age, and email), an object is a better
fit than an array. And if you need fast lookups by a unique key rather
than by position, a \`Map\` or object usually serves you better than
searching through an array.
    `.trim(),
    commonMistakes: [
      "Forgetting that array indexes start at 0, not 1.",
      "Trying to access an index that doesn't exist (returns `undefined` instead of an error).",
      "Using `for...in` on an array instead of `for...of` or `.forEach()`, which can produce unexpected results.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Create an array of 5 numbers and log the third one." },
      { difficulty: "Medium", prompt: "Use `.map()` to create a new array where every number is doubled." },
      { difficulty: "Hard", prompt: "Use `.filter()` and `.reduce()` together to sum only the even numbers in an array." },
    ],
    interviewQuestions: [
      { question: "How do you add or remove items from the end of an array?", answer: "`push()` adds to the end, `pop()` removes from the end. `unshift()` and `shift()` do the same at the beginning." },
      { question: "What's the difference between `map` and `forEach`?", answer: "`map` returns a new array built from the return value of each call; `forEach` just runs a function for each item and returns `undefined`." },
      { question: "How do you check if a value exists in an array?", answer: "`array.includes(value)` returns true/false; `array.indexOf(value)` returns the position or -1 if not found." },
    ],
    prerequisites: ["functions"],
    relatedTopics: ["objects", "loops"],
    keywords: ["array", "index", "push", "pop", "map", "filter", "reduce"],
  },
  {
    id: "objects",
    title: "Objects",
    level: "intermediate",
    description: "A collection of related values, stored as named properties.",
    explanation: `
An array is great when your data is an ordered list, but a lot of real data
isn't a list — it's a group of related details, like a person's name, age,
and email. An **object** stores values under named keys instead of numbered
positions, so you can describe something with multiple properties in one
place.
    `.trim(),
    analogy:
      "If an array is a row of numbered lockers, an object is a labeled filing cabinet — each drawer has a name on it (like \"name\" or \"age\"), and you open the one you need by its label, not its position.",
    examples: [
      {
        title: "Creating and using an object",
        code: `const user = {
  name: "Amara",
  age: 28,
  isAdmin: false,
};

console.log(user.name);      // "Amara"
console.log(user["age"]);    // 28

user.age = 29; // update a property`,
        explanation:
          "Properties can be read with dot notation (`user.name`) or bracket notation (`user[\"age\"]`), which is useful when the key is dynamic.",
        walkthrough: [
          { code: "const user = { name: ..., age: ..., isAdmin: ... };", explanation: "Creates an object with three named properties." },
          { code: "user.name", explanation: "Dot notation reads the value stored under the name key." },
          { code: 'user["age"]', explanation: "Bracket notation does the same thing, and is useful when the key is stored in a variable." },
          { code: "user.age = 29;", explanation: "Updates the existing age property to a new value." },
        ],
      },
    ],
    howItWorks: `
An object stores each value under a key. When you write \`user.name\`,
JavaScript looks up the key \`"name"\` inside the object and returns whatever
value is stored there. Unlike arrays, there's no guaranteed numeric order —
you access things by name, not position.
    `.trim(),
    whyItExists: `
Real-world things usually have multiple attributes at once — a product has
a name, price, and stock count; a user has an email and a role. Objects let
you group all of that related data together instead of tracking it in
several separate, disconnected variables.
    `.trim(),
    whenToUse: `
Use an object whenever you're describing one thing with several named
attributes — a user, a product, a settings config. If you'd naturally
answer "what properties does it have?" rather than "what position is it
at?", it's an object.
    `.trim(),
    whenNotToUse: `
If your data is really a sequence of similar items, an array (or an array
of objects) fits better than a single object with numbered-looking keys.
And for very large collections you need to search by key constantly, a
\`Map\` can be a better fit than a plain object.
    `.trim(),
    commonMistakes: [
      "Trying to access a property that doesn't exist and being surprised it returns `undefined` instead of an error.",
      "Confusing objects with arrays — using numeric indexes on an object won't work the way you expect.",
      "Forgetting that copying an object with `=` copies a reference, not a brand-new independent object.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Create an object representing a book with `title`, `author`, and `pages` properties." },
      { difficulty: "Medium", prompt: "Write a function that takes a `user` object and returns a greeting string using its `name` property." },
      { difficulty: "Hard", prompt: "Write a function that takes an array of objects (e.g. products) and returns only the ones where `inStock` is true." },
    ],
    interviewQuestions: [
      { question: "What's the difference between dot notation and bracket notation?", answer: "Both access a property. Bracket notation is required when the key is stored in a variable or isn't a valid identifier, e.g. `user[\"first-name\"]`." },
      { question: "How do you check if a key exists on an object?", answer: "Using the `in` operator (`\"name\" in user`) or `Object.hasOwn(user, \"name\")`." },
      { question: "Why does copying an object with `=` sometimes cause bugs?", answer: "Objects are copied by reference, so both variables point to the same underlying object — changing one changes the other, unless you explicitly clone it." },
    ],
    prerequisites: ["arrays"],
    relatedTopics: ["arrays", "scope", "prototypes"],
    keywords: ["object", "property", "key", "value", "dot notation"],
  },
  {
    id: "scope",
    title: "Scope",
    level: "intermediate",
    description: "The rules that decide where a variable can be used in your code.",
    explanation: `
A variable can't always be used everywhere in your program — there are
places where a given variable simply doesn't exist as far as the code is
concerned. This area where a variable is usable is called its **scope**.

JavaScript decides scope based on where in the code a variable was
declared — this is called **lexical scope**. A variable declared inside a
function is only usable inside that function (and anything nested within
it); it disappears once the function finishes.
    `.trim(),
    analogy:
      "Think of scope like rooms in a house. Something you leave in the kitchen is only reachable while you're in the kitchen or in rooms that connect to it — it's not automatically available in every room of the house.",
    examples: [
      {
        title: "Function scope",
        code: `function greet() {
  const message = "Hello!";
  console.log(message); // works fine, "message" is in scope here
}

greet();
console.log(message); // ❌ Error: message is not defined out here`,
        walkthrough: [
          { code: "function greet() {", explanation: "Starts a new function scope." },
          { code: 'const message = "Hello!";', explanation: "message only exists inside this function's scope." },
          { code: "console.log(message);", explanation: "Works because message is in scope right here, inside greet." },
          { code: "console.log(message); // outside", explanation: "Fails — message's scope ended the moment the function finished running." },
        ],
      },
      {
        title: "Block scope with let/const",
        code: `if (true) {
  const secret = "hidden";
  console.log(secret); // works
}
console.log(secret); // ❌ Error: secret is not defined`,
      },
    ],
    howItWorks: `
When JavaScript looks up a variable, it checks the current block first,
then the block that contains it, and so on outward — this chain is called
the **scope chain**. If it reaches the outermost level without finding the
variable, it throws an error. This lookup is based entirely on where the
code was written, not on the order things happen to run in.
    `.trim(),
    diagram: `
Global scope
  └── Function scope
        └── Block scope (if/for/while)

Lookup direction: inner → outer, never outer → inner
    `.trim(),
    whyItExists: `
Without scope, every variable in a program would be visible everywhere,
which would make large programs a mess — names would collide constantly,
and it would be impossible to tell what any given piece of code depends on.
Scope keeps variables contained to where they're actually relevant.
    `.trim(),
    whenToUse: `
You're actively reasoning about scope any time you're deciding where to
declare a variable, debugging a "not defined" error, or trying to
understand why a variable inside a function isn't visible outside it.
    `.trim(),
    whenNotToUse: `
You don't need to think hard about scope for a variable used in one
small, self-contained block — it only becomes a source of confusion (and
bugs) once a program grows large enough that the same name gets reused in
multiple places.
    `.trim(),
    commonMistakes: [
      "Assuming a variable declared inside an `if` block is available outside of it.",
      "Accidentally creating a global variable by forgetting `let`/`const`/`var`.",
      "Being surprised that two functions can each have their own separate variable with the same name, with no conflict.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Declare a variable inside a function and try (and fail) to log it outside the function. Observe the error." },
      { difficulty: "Medium", prompt: "Write two functions that each declare a local variable with the same name, and show they don't interfere with each other." },
      { difficulty: "Hard", prompt: "Explain, in writing, why a variable declared with `let` inside a `for` loop is not accessible after the loop ends." },
    ],
    interviewQuestions: [
      { question: "What is lexical scope?", answer: "The idea that a variable's accessibility is determined by where it's physically written in the code, not by when or how a function is called." },
      { question: "What is the difference between global scope, function scope, and block scope?", answer: "Global scope is accessible everywhere; function scope is limited to inside a function; block scope (introduced by `let`/`const`) is limited to the nearest `{}` block, like an `if` or `for`." },
      { question: "How does scope relate to closures?", answer: "A closure is what happens when a function 'remembers' variables from its outer scope even after that outer scope has finished running." },
    ],
    prerequisites: ["functions"],
    relatedTopics: ["functions", "closures"],
    keywords: ["lexical scope", "block scope", "scope chain", "global"],
  },
  {
    id: "closures",
    title: "Closures",
    level: "intermediate",
    description: "A function that remembers the variables from where it was created, even after that outer code has finished running.",
    explanation: `
Normally, when a function finishes running, the variables it created are
thrown away — there's nothing left to hold onto them. But if that function
creates another function *inside* it, and hands that inner function back
out, something interesting happens: the inner function keeps access to the
outer variables, even though the outer function has already finished.

This "memory" is called a **closure**. It's not a special feature you turn
on — it happens automatically, any time a function is defined inside
another function and used outside of it.
    `.trim(),
    analogy:
      "Imagine a box that remembers what you put inside it. You seal it up and hand it to a friend. Weeks later, they can still open the box and find exactly what was placed inside — even though you're long gone.",
    examples: [
      {
        title: "A simple closure",
        code: `function makeCounter() {
  let count = 0;

  return function () {
    count = count + 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`,
        explanation:
          "`makeCounter` finishes running immediately, but the inner function it returns still remembers and can update `count` every time it's called.",
        walkthrough: [
          { code: "function makeCounter() {", explanation: "Defines a function whose job is to build and return a counter." },
          { code: "let count = 0;", explanation: "A variable private to this one call of makeCounter." },
          { code: "return function () {", explanation: "Returns a brand-new function that closes over count." },
          { code: "count = count + 1; return count;", explanation: "Each call updates and returns the same shared count, remembered between calls." },
          { code: "const counter = makeCounter();", explanation: "Runs makeCounter once, getting back the inner function with its own private count." },
        ],
      },
    ],
    howItWorks: `
When a function is created, it keeps a hidden link to the scope it was
created in — not just the scope it's called from. So even after
\`makeCounter\` returns, the inner function still has a live connection to
the \`count\` variable, and can read and update it on every call.
    `.trim(),
    diagram: `
Function created
       ↓
Variables available
       ↓
Function returned
       ↓
Function remembers variables
       ↓
Function called later
    `.trim(),
    whyItExists: `
Closures let you create private state — data that only one function (or a
small group of functions) can access and update, without exposing it as a
global variable anyone could accidentally change. They're the foundation
for patterns like counters, caches, and event handlers with private data.
    `.trim(),
    whenToUse: `
Reach for a closure whenever you want a piece of state that only one
function (or a small group of related functions) can touch — a counter, a
cache, a toggle, a configuration value set up once and reused on every
call.
    `.trim(),
    whenNotToUse: `
If the state genuinely needs to be shared, modified from many unrelated
places, or inspected from outside, a closure's privacy works against you —
a plain object or a class is usually clearer. And don't reach for a
closure just to avoid passing one extra parameter.
    `.trim(),
    commonMistakes: [
      "Creating closures inside a loop and expecting each one to capture a different value of the loop variable when using `var` (they all share the same one — `let` fixes this).",
      "Thinking a closure copies the outer variable's value — it actually keeps a live reference, so if the value changes later, the closure sees the new value.",
      "Overusing closures for state that would be simpler as a regular object or class.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Create a counter using a closure, similar to the example above, but that can also be reset back to 0." },
      { difficulty: "Medium", prompt: "Create a private bank balance: a function that returns `deposit` and `withdraw` functions sharing one hidden `balance` variable." },
      { difficulty: "Hard", prompt: "Build a reusable closure-based utility, `once(fn)`, that only lets a given function run one time no matter how many times it's called." },
    ],
    interviewQuestions: [
      { question: "What is a closure?", answer: "A function that retains access to the variables from the scope it was created in, even after that outer scope has finished executing." },
      { question: "Why are closures useful?", answer: "They let you create private, persistent state tied to a function, without using global variables — useful for counters, caches, and encapsulated logic." },
      { question: "What is lexical scope, and how does it relate to closures?", answer: "Lexical scope determines which variables a function can see based on where it's written in the code. Closures are the direct result of that: a function 'takes its scope with it' wherever it goes." },
    ],
    prerequisites: ["scope"],
    relatedTopics: ["scope", "functions", "this"],
    keywords: ["closure", "lexical scope", "private state", "counter"],
  },
];
