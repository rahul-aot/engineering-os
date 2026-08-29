import type { Topic } from "../../types/content";

export const dsaBeginnerTopics: Topic[] = [
  {
    id: "big-o",
    title: "Big O",
    level: "beginner",
    description: "A way to describe how much slower or bigger a program gets as its input grows.",
    explanation: `
Two solutions to the same problem can both "work," but behave very
differently once the amount of data grows. One might stay fast with a
million items; another might crawl to a halt. **Big O notation** is a way
to describe that growth pattern — how the time (or memory) a program needs
scales as the input gets bigger — without depending on the exact hardware
it runs on.

You'll see it written like \`O(1)\`, \`O(n)\`, or \`O(n²)\`, where \`n\` represents
the size of the input.
    `.trim(),
    analogy:
      "Imagine looking up a word in a dictionary versus checking every page one by one. Both find the word eventually, but one gets dramatically slower as the dictionary grows, and the other barely changes. Big O is how we describe that difference.",
    examples: [
      {
        title: "O(1) vs O(n)",
        code: `// O(1) — constant time: same speed no matter the array size
function getFirst(arr) {
  return arr[0];
}

// O(n) — linear time: gets slower as the array grows
function findValue(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
        explanation:
          "`getFirst` always does exactly one step. `findValue` might need to check every single item, so its worst-case work grows directly with the array's size.",
      },
    ],
    howItWorks: `
Big O describes the *shape* of growth, ignoring constant factors and small
details. \`O(1)\` means the work stays the same regardless of input size.
\`O(n)\` means the work grows in direct proportion to the input. \`O(n²)\` means
the work grows by the square of the input — often caused by a loop nested
inside another loop over the same data.
    `.trim(),
    diagram: `
Input size (n) grows →

O(1)   ▬▬▬▬▬▬▬▬▬▬  (flat — stays fast)
O(n)   ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  (grows steadily)
O(n²)  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  (grows steeply)
    `.trim(),
    whyItExists: `
As soon as data gets large — thousands or millions of items — the
difference between an efficient and inefficient approach becomes the
difference between an app that feels instant and one that visibly freezes.
Big O gives engineers a common language to compare approaches before
writing (or after debugging) real code.
    `.trim(),
    commonMistakes: [
      "Assuming code that works fine on a small test array will work fine at real scale.",
      "Confusing best-case performance with worst-case — Big O usually describes the worst case.",
      "Ignoring nested loops over the same data, which is one of the most common causes of O(n²) code.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Identify the Big O of a function that returns `array.length`." },
      { difficulty: "Medium", prompt: "Identify the Big O of a function with one loop that checks every item in an array, and explain why." },
      { difficulty: "Hard", prompt: "Identify the Big O of a function with a loop inside a loop, both running over the same array, and explain what causes the extra cost." },
    ],
    interviewQuestions: [
      { question: "What does Big O notation measure?", answer: "How the running time or memory usage of an algorithm grows as the input size increases, independent of the specific hardware." },
      { question: "What's the difference between O(n) and O(n²)?", answer: "O(n) work grows directly with input size; O(n²) work grows with the square of it — usually from a loop nested inside another loop over the same input." },
      { question: "Is Big O about the best case or the worst case?", answer: "Usually the worst case, since that's the guarantee you can rely on — though best-case and average-case notations exist too." },
    ],
    relatedTopics: ["arrays", "sorting", "binary-search"],
    keywords: ["complexity", "time complexity", "space complexity", "growth rate"],
  },
  {
    id: "arrays",
    title: "Arrays",
    level: "beginner",
    description: "The most fundamental way to store an ordered list of items in memory.",
    explanation: `
An array is a way to store a group of values right next to each other in
memory, in order, so you can find any item instantly if you know its
position (its index). It's one of the most basic building blocks for
almost every other data structure.

Because array items sit next to each other in memory, reading any item by
its index is extremely fast — but inserting or removing an item in the
middle can be slow, since everything after it may need to shift.
    `.trim(),
    analogy:
      "An array is like a row of parking spaces, each numbered. If you know the space number, you can walk straight to that car. But if you need to add a car in the middle of a full row, every car after it has to shift over one space.",
    examples: [
      {
        title: "Reading vs inserting",
        code: `const arr = [10, 20, 30, 40];

console.log(arr[2]); // 30 — instant, O(1)

arr.splice(1, 0, 15); // insert 15 at index 1
// arr is now [10, 15, 20, 30, 40] — everything after index 1 had to shift`,
      },
    ],
    howItWorks: `
Because array elements are stored in one continuous block of memory,
accessing \`arr[i]\` is a direct calculation ("jump to this exact spot") —
constant time, or O(1). Inserting or deleting somewhere other than the end
requires shifting every following element over by one, which takes time
proportional to the array's size, or O(n).
    `.trim(),
    whyItExists: `
Fast, predictable access by position is essential for countless problems —
searching, sorting, storing sequences of steps or events. Arrays are the
default choice whenever order matters and you mostly need to read items
rather than insert them in the middle.
    `.trim(),
    commonMistakes: [
      "Repeatedly inserting or removing items from the front of a large array, which is slower than it looks.",
      "Assuming array search by value is instant — finding a value (not an index) still requires checking items one by one, O(n).",
      "Forgetting that in JavaScript, arrays can hold mixed types, which is convenient but easy to misuse.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Write a function that returns the largest number in an array." },
      { difficulty: "Medium", prompt: "Write a function that reverses an array without using the built-in `.reverse()` method." },
      { difficulty: "Hard", prompt: "Write a function that removes duplicate values from an array while preserving the original order." },
    ],
    interviewQuestions: [
      { question: "Why is accessing an array by index O(1)?", answer: "Because array elements sit in contiguous memory, so the position of any index can be calculated directly, without searching." },
      { question: "Why is inserting into the middle of an array O(n)?", answer: "Because every element after the insertion point has to shift over by one position to make room." },
      { question: "When would you choose an array over a linked list?", answer: "When you need fast, random access to elements by index and don't need to frequently insert or remove items from the middle." },
    ],
    relatedTopics: ["big-o", "strings", "linked-lists"],
    keywords: ["array", "index", "contiguous memory", "insertion", "access time"],
  },
  {
    id: "strings",
    title: "Strings",
    level: "beginner",
    description: "A sequence of characters, and the special rules for working with them efficiently.",
    explanation: `
A string is just text — a sequence of characters like "hello". At first
glance it looks like a simple value, but from a data-structures
perspective, a string behaves a lot like an array of characters, and many
classic coding problems are really about processing strings efficiently:
reversing them, searching within them, checking if two strings are related
in some way.
    `.trim(),
    analogy:
      "A string is like a train of connected train cars, each one carrying a single letter. You can look at any car by its position, but the whole train has to be considered when you want to know if it 'matches' another train.",
    examples: [
      {
        title: "Treating a string like an array of characters",
        code: `const word = "hello";

console.log(word[0]);        // "h"
console.log(word.length);    // 5

const reversed = word.split("").reverse().join("");
console.log(reversed);       // "olleh"`,
        explanation:
          "`split(\"\")` breaks the string into an array of characters, `.reverse()` flips their order, and `.join(\"\")` glues them back into a string.",
      },
    ],
    howItWorks: `
In JavaScript, strings are immutable — once created, a string's contents
never change. Any operation that seems to "modify" a string (like
\`.toUpperCase()\` or concatenation) actually creates and returns a brand new
string, leaving the original untouched.
    `.trim(),
    whyItExists: `
Text is everywhere — usernames, messages, file contents, search queries.
Efficient string handling underpins search engines, spell checkers, text
editors, and virtually every user-facing application.
    `.trim(),
    commonMistakes: [
      "Trying to change a character in a string directly (e.g. `str[0] = \"H\"`) — this silently does nothing, since strings are immutable.",
      "Repeatedly concatenating strings in a large loop, which can be slower than building an array and joining it once at the end.",
      "Forgetting that string comparison (`===`) is case-sensitive by default.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Write a function that checks if a given string is a palindrome (reads the same forwards and backwards)." },
      { difficulty: "Medium", prompt: "Write a function that counts how many times each character appears in a string." },
      { difficulty: "Hard", prompt: "Write a function that checks if two strings are anagrams of each other (contain exactly the same letters, in any order)." },
    ],
    interviewQuestions: [
      { question: "Are strings mutable in JavaScript?", answer: "No — strings are immutable. Any method that appears to transform a string actually returns a brand-new string." },
      { question: "How would you check if a string is a palindrome?", answer: "Compare it to its own reverse, or use two pointers moving from both ends toward the middle, checking that characters match at each step." },
      { question: "What's an efficient way to count character frequency in a string?", answer: "Use a hash table (or plain object) mapping each character to a running count, built in a single pass through the string." },
    ],
    relatedTopics: ["arrays", "hash-tables"],
    keywords: ["string", "immutable", "palindrome", "anagram", "character"],
  },
];
