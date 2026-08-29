import type { Topic } from "../../types/content";

export const dsaIntermediateTopics: Topic[] = [
  {
    id: "linked-lists",
    title: "Linked Lists",
    level: "intermediate",
    description: "A chain of items where each one points to the next, instead of sitting side by side in memory.",
    explanation: `
An array keeps its items packed tightly together in memory, which is fast
to read but expensive to insert into. A **linked list** takes a different
approach: each item (called a **node**) stores its value plus a pointer to
the *next* node. The items don't need to sit next to each other in memory
at all — they're connected purely through these pointers.

This trade-off is the opposite of an array's: inserting or removing a node
is fast (you just change a couple of pointers), but finding the 5th item
means walking through the first four nodes one by one — there's no
shortcut to "jump" straight to a position.
    `.trim(),
    analogy:
      "A linked list is like a scavenger hunt: each clue tells you where to find the next one. You can't jump straight to clue #5 — you have to follow the chain from the start. But inserting a brand-new clue into the middle is easy: just point the previous clue somewhere new.",
    examples: [
      {
        title: "A simple linked list in JavaScript",
        code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const first = new Node(10);
const second = new Node(20);
first.next = second; // 10 → 20

console.log(first.value);      // 10
console.log(first.next.value); // 20`,
      },
    ],
    howItWorks: `
Each node holds a value and a reference to the next node (or \`null\` if
it's the last one). To read the item at position 5, you must start at the
first node and follow \`.next\` five times — there's no way to calculate its
memory location directly, unlike an array.
    `.trim(),
    diagram: `
[10] → [20] → [30] → null
 head

To reach 30: head → next → next
    `.trim(),
    whyItExists: `
Linked lists shine when your program does a lot of inserting and removing
(especially at the front or in the middle) and doesn't need fast random
access by position. They're also the foundation for other structures, like
stacks and queues.
    `.trim(),
    commonMistakes: [
      "Forgetting to update the `next` pointer when inserting a node, accidentally breaking the chain.",
      "Losing the reference to the rest of the list by overwriting a `next` pointer before saving it elsewhere.",
      "Assuming linked lists have fast random access like arrays do — they don't.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Build a linked list of 3 nodes manually and print each value by following `.next`." },
      { difficulty: "Medium", prompt: "Write a function that returns the length of a linked list by traversing it." },
      { difficulty: "Hard", prompt: "Write a function that reverses a singly linked list in place, without creating a new list." },
    ],
    interviewQuestions: [
      { question: "What's the main trade-off between arrays and linked lists?", answer: "Arrays offer fast random access (O(1)) but slow insertion/removal in the middle (O(n)). Linked lists offer fast insertion/removal (O(1), given a reference to the node) but slow access by position (O(n))." },
      { question: "What is a node?", answer: "The basic unit of a linked list — an object holding a value and a pointer (or pointers) to neighboring nodes." },
      { question: "What's the difference between a singly and doubly linked list?", answer: "A singly linked list's nodes only point to the next node; a doubly linked list's nodes point to both the next and the previous node, allowing traversal in both directions." },
    ],
    relatedTopics: ["arrays", "stack", "queue"],
    keywords: ["linked list", "node", "pointer", "traversal"],
  },
  {
    id: "stack",
    title: "Stack",
    level: "intermediate",
    description: "A structure where the last item added is always the first one removed.",
    explanation: `
Some problems naturally need to process things in reverse order of how
they arrived — undo history, nested function calls, matching brackets. A
**stack** is a structure built exactly for that: you can only add ("push")
or remove ("pop") from one end, called the top, and whatever was added
most recently is always the first thing to come back out.

This rule is called **LIFO** — Last In, First Out.
    `.trim(),
    analogy:
      "A stack is like a stack of plates. You add a new plate on top, and when you need one, you take the top plate off first — you'd never pull one from the bottom without disturbing everything above it.",
    examples: [
      {
        title: "Using an array as a stack",
        code: `const stack = [];

stack.push(1); // [1]
stack.push(2); // [1, 2]
stack.push(3); // [1, 2, 3]

console.log(stack.pop()); // 3 — removes and returns the top item
console.log(stack);       // [1, 2]`,
        explanation:
          "`push` and `pop` both operate on the end of the array, which is exactly how a stack behaves — no special data structure is required in JavaScript.",
      },
    ],
    howItWorks: `
A stack only exposes two main operations: \`push\` (add to the top) and
\`pop\` (remove from the top) — both O(1), since neither requires touching
any other item. There's no direct way to access an item in the middle
without first removing everything above it.
    `.trim(),
    diagram: `
push(1)   push(2)   push(3)     pop()
   ↓         ↓         ↓          ↓
  [1]      [1,2]    [1,2,3]    returns 3, leaves [1,2]
    `.trim(),
    whyItExists: `
Many real problems are naturally last-in-first-out: undo/redo history,
tracking function calls (the call stack!), and checking that brackets or
parentheses are balanced. A stack models that behavior directly and simply.
    `.trim(),
    commonMistakes: [
      "Trying to access the middle of a stack directly instead of popping down to it.",
      "Popping from an empty stack without checking first, causing errors or `undefined`.",
      "Confusing a stack (LIFO) with a queue (FIFO) — they solve different problems.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Implement a `Stack` class with `push`, `pop`, and `peek` (view the top without removing it) methods." },
      { difficulty: "Medium", prompt: "Use a stack to check whether a string of parentheses like `\"(()())\"` is balanced." },
      { difficulty: "Hard", prompt: "Use a stack to reverse the words in a sentence without using built-in reverse methods." },
    ],
    interviewQuestions: [
      { question: "What does LIFO mean?", answer: "Last In, First Out — the most recently added item is always the first one removed." },
      { question: "What is a real-world use of a stack in programming?", answer: "The call stack itself, which tracks function calls; also undo/redo features and balanced-bracket checking." },
      { question: "What's the time complexity of push and pop?", answer: "Both are O(1) — they only ever touch the top item." },
    ],
    relatedTopics: ["queue", "recursion", "linked-lists"],
    keywords: ["stack", "LIFO", "push", "pop", "call stack"],
  },
  {
    id: "queue",
    title: "Queue",
    level: "intermediate",
    description: "A structure where the first item added is always the first one removed.",
    explanation: `
Some problems need to be processed in the exact order they arrived — a
printer processing print jobs, customer support tickets, tasks waiting to
run. A **queue** models this directly: items are added at the back and
removed from the front, so whatever arrived first leaves first.

This rule is called **FIFO** — First In, First Out.
    `.trim(),
    analogy:
      "A queue is like a line at a coffee shop. New people join at the back, and the person who's been waiting longest is always served next, from the front.",
    examples: [
      {
        title: "Using an array as a queue",
        code: `const queue = [];

queue.push("first");  // ["first"]
queue.push("second");  // ["first", "second"]

console.log(queue.shift()); // "first" — removes and returns the front item
console.log(queue);         // ["second"]`,
        explanation:
          "`push` adds to the back; `shift` removes from the front — together they behave like a queue. Note that `shift` is O(n) on a plain array since every remaining item shifts down.",
      },
    ],
    howItWorks: `
A queue exposes two main operations: **enqueue** (add to the back) and
**dequeue** (remove from the front). Conceptually both should be O(1); in
JavaScript, using a plain array's \`.shift()\` is actually O(n) because
everything has to shift down, so real-world queues are often implemented
with a linked list to keep both ends O(1).
    `.trim(),
    diagram: `
enqueue("A")  enqueue("B")  dequeue()
     ↓             ↓            ↓
   [A]           [A,B]      returns "A", leaves [B]
    `.trim(),
    whyItExists: `
Queues naturally model anything processed in arrival order: task
scheduling, message processing, handling requests in the order they came
in, and breadth-first traversal of trees and graphs.
    `.trim(),
    commonMistakes: [
      "Confusing a queue's FIFO order with a stack's LIFO order.",
      "Using `.shift()` on a large array in performance-sensitive code without realizing it's O(n), not O(1).",
      "Forgetting to check whether a queue is empty before dequeuing.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Implement a `Queue` class with `enqueue` and `dequeue` methods." },
      { difficulty: "Medium", prompt: "Use a queue to simulate people being served in a waiting line, printing the order they're served in." },
      { difficulty: "Hard", prompt: "Use a queue to implement a breadth-first traversal over a simple tree of nested objects." },
    ],
    interviewQuestions: [
      { question: "What does FIFO mean?", answer: "First In, First Out — the earliest added item is always the first one removed." },
      { question: "What's a real-world use of a queue in software?", answer: "Task/job scheduling, request handling, and breadth-first search over trees and graphs." },
      { question: "Why is `.shift()` on a JavaScript array not ideal for a high-performance queue?", answer: "Because it's O(n) — every remaining element has to move down by one index. A linked-list-based queue keeps both ends O(1)." },
    ],
    relatedTopics: ["stack", "linked-lists"],
    keywords: ["queue", "FIFO", "enqueue", "dequeue"],
  },
  {
    id: "hash-tables",
    title: "Hash Tables",
    level: "intermediate",
    description: "A structure that lets you look up a value almost instantly using a key, instead of searching through everything.",
    explanation: `
Searching an array for a value means checking items one at a time until
you find it — slow once there's a lot of data. A **hash table** solves
this by converting a key (like a name or an id) into a number using a
**hash function**, and using that number to jump directly to where the
value is stored. In JavaScript, plain objects and the \`Map\` class are both
backed by this idea.
    `.trim(),
    analogy:
      "A hash table is like a coat check at a theater. Instead of searching through every coat to find yours, you're handed a numbered ticket (the hash), and the attendant goes directly to that numbered spot to retrieve your coat.",
    examples: [
      {
        title: "Using an object (or Map) as a hash table",
        code: `const ages = {};

ages["amara"] = 28;
ages["diego"] = 34;

console.log(ages["amara"]); // 28 — near-instant lookup, not a search

const map = new Map();
map.set("amara", 28);
console.log(map.get("amara")); // 28`,
      },
    ],
    howItWorks: `
A hash function takes a key and converts it into a number (a "hash") that
maps to a specific storage slot. Looking up a key just means: hash the
key, jump to that slot, and read the value — no scanning required. When
two different keys happen to hash to the same slot (a "collision"), the
table has strategies (like storing a small list at that slot) to handle
it correctly.
    `.trim(),
    diagram: `
key "amara"
       ↓ hash function
    number: 42
       ↓
   slot 42 → 28
    `.trim(),
    whyItExists: `
Hash tables give near-instant lookups, insertions, and deletions on
average — O(1) — which makes them essential for counting frequencies,
caching results, deduplicating data, and implementing sets and dictionaries
efficiently.
    `.trim(),
    commonMistakes: [
      "Assuming object/array key order is always guaranteed in every situation — it mostly is in modern JavaScript for string keys, but it's a detail worth knowing rather than relying on blindly.",
      "Using an object when a `Map` would be safer, e.g. when keys aren't simple strings or when key order and size (`.size`) matter.",
      "Forgetting that average-case O(1) lookup can degrade if many keys collide (a rare but real edge case).",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Use an object to count how many times each word appears in a sentence." },
      { difficulty: "Medium", prompt: "Write a function that returns `true` if an array contains any duplicate values, using a hash table for O(n) performance." },
      { difficulty: "Hard", prompt: "Solve the 'two sum' problem (find two numbers in an array that add up to a target) in O(n) time using a hash table." },
    ],
    interviewQuestions: [
      { question: "What is a hash function?", answer: "A function that converts a key into a number used to determine where its value is stored, ideally spreading keys evenly across storage slots." },
      { question: "What is the average time complexity of a hash table lookup?", answer: "O(1) on average, since the hash function typically jumps directly to the right slot." },
      { question: "What is a hash collision, and how is it handled?", answer: "A collision happens when two different keys hash to the same slot. It's commonly handled by storing multiple entries at that slot (e.g. in a small list) and checking each one." },
    ],
    relatedTopics: ["arrays", "strings", "big-o"],
    keywords: ["hash table", "hash map", "hash function", "collision", "dictionary"],
  },
  {
    id: "recursion",
    title: "Recursion",
    level: "intermediate",
    description: "A function that solves a problem by calling itself on a smaller version of the same problem.",
    explanation: `
Some problems are naturally defined in terms of smaller versions of
themselves — finding the total of a list, exploring every folder inside a
folder, calculating a factorial. **Recursion** is when a function solves
such a problem by calling itself with a smaller input, until the input is
simple enough to answer directly (the **base case**).

Every recursive function needs two things: a base case that stops the
recursion, and a step that reduces the problem toward that base case.
    `.trim(),
    analogy:
      "Recursion is like a set of Russian nesting dolls. To find the smallest doll, you open one doll to reveal a smaller one inside, and repeat — until you reach the smallest doll that doesn't open any further. That smallest doll is the base case.",
    examples: [
      {
        title: "Factorial using recursion",
        code: `function factorial(n) {
  if (n <= 1) return 1;       // base case
  return n * factorial(n - 1); // recursive case
}

console.log(factorial(4)); // 4 * 3 * 2 * 1 = 24`,
        explanation:
          "Each call reduces `n` by 1 and calls itself again, until `n` reaches 1 — the base case — at which point the calls start returning back up the chain.",
      },
    ],
    howItWorks: `
Each call to a recursive function is placed on the call stack, waiting for
the call it made to finish and return a value. Once the base case is
reached, the calls resolve in reverse order — like unwinding a stack of
plates — each one multiplying or combining its result with what it gets
back, until the original call finally returns.
    `.trim(),
    diagram: `
factorial(4)
  → 4 * factorial(3)
       → 3 * factorial(2)
            → 2 * factorial(1)
                 → returns 1 (base case)
            → returns 2 * 1 = 2
       → returns 3 * 2 = 6
  → returns 4 * 6 = 24
    `.trim(),
    whyItExists: `
Some structures and problems (folders inside folders, trees, certain
mathematical definitions) are naturally recursive — describing them without
recursion often requires extra bookkeeping that a recursive function
handles automatically through the call stack.
    `.trim(),
    commonMistakes: [
      "Forgetting the base case, causing infinite recursion until the program crashes ('stack overflow').",
      "Writing a recursive case that doesn't actually move closer to the base case.",
      "Using recursion for a simple problem a loop would solve more efficiently and clearly.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Write a recursive function that sums all numbers from 1 to n." },
      { difficulty: "Medium", prompt: "Write a recursive function that reverses a string." },
      { difficulty: "Hard", prompt: "Write a recursive function that returns all subsets of a given array." },
    ],
    interviewQuestions: [
      { question: "What two things does every recursive function need?", answer: "A base case that stops the recursion, and a recursive step that moves the input closer to that base case." },
      { question: "What causes a 'stack overflow' in recursion?", answer: "Recursing too deeply (or infinitely, due to a missing/broken base case) fills up the call stack beyond its limit." },
      { question: "When would you prefer recursion over a loop?", answer: "When the problem is naturally recursive in structure — like traversing trees, nested data, or divide-and-conquer algorithms — where recursion reads more clearly than manual bookkeeping." },
    ],
    relatedTopics: ["stack", "binary-search"],
    keywords: ["recursion", "base case", "call stack", "stack overflow"],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    level: "intermediate",
    description: "A fast way to find a value in a sorted list by repeatedly cutting the search area in half.",
    explanation: `
If you search a list one item at a time, finding a value in a million-item
list could take up to a million checks. But if the list is **sorted**,
there's a much faster way: check the middle item. If it's too big, the
answer must be in the left half; if it's too small, it must be in the
right half. Repeating this — always looking at the middle of whatever's
left — is called **binary search**, and it can find a value in a
million-item list in about 20 checks instead of a million.
    `.trim(),
    analogy:
      "It's how you'd find a word in a paper dictionary: you don't start at page 1. You open to the middle, see you've gone too far or not far enough, and jump to the middle of the correct half — repeating until you land on the word.",
    examples: [
      {
        title: "Binary search implementation",
        code: `function binarySearch(sortedArray, target) {
  let low = 0;
  let high = sortedArray.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (sortedArray[mid] === target) return mid;
    if (sortedArray[mid] < target) {
      low = mid + 1; // search the right half
    } else {
      high = mid - 1; // search the left half
    }
  }

  return -1; // not found
}`,
      },
    ],
    howItWorks: `
Each check eliminates half of the remaining possibilities. Starting with
\`n\` items, after one check there are \`n/2\` left to consider, then \`n/4\`,
then \`n/8\` — this halving is what makes binary search take only about
\`log2(n)\` steps, dramatically fewer than checking every item.
    `.trim(),
    diagram: `
[1,3,5,7,9,11,13] — looking for 11
        ↓ check middle (7) → too small → search right half
   [9,11,13]
        ↓ check middle (11) → found!
    `.trim(),
    whyItExists: `
Binary search is one of the clearest demonstrations of why algorithm
choice matters: the same problem, solved with a smarter approach on sorted
data, goes from O(n) to O(log n) — a difference that becomes enormous as
data grows.
    `.trim(),
    commonMistakes: [
      "Using binary search on data that isn't sorted — it silently gives wrong answers instead of erroring.",
      "Getting the `low`/`high` update backwards, causing an infinite loop or skipped elements.",
      "Off-by-one errors in the midpoint calculation or the boundary updates.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Implement binary search for a sorted array of numbers, returning the index of a target value." },
      { difficulty: "Medium", prompt: "Modify binary search to return the index where a value *should* be inserted to keep the array sorted, even if it isn't found." },
      { difficulty: "Hard", prompt: "Use binary search to find the smallest number in a sorted array that has been rotated (e.g. `[4,5,6,1,2,3]`)." },
    ],
    interviewQuestions: [
      { question: "What is required for binary search to work?", answer: "The data must be sorted — binary search relies on being able to rule out half the remaining data based on a single comparison." },
      { question: "What is the time complexity of binary search?", answer: "O(log n), since each step cuts the remaining search space in half." },
      { question: "Why is O(log n) so much better than O(n) for large inputs?", answer: "Because logarithmic growth is extremely slow — doubling the input only adds one more step, whereas linear growth doubles the work." },
    ],
    relatedTopics: ["big-o", "arrays", "recursion"],
    keywords: ["binary search", "sorted array", "log n", "divide and conquer"],
  },
];
