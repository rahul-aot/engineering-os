import type { Topic } from "../../types/content";

export const systemDesignFundamentalsTopics: Topic[] = [
  {
    id: "what-is-system-design",
    title: "What is System Design?",
    level: "beginner",
    description: "Planning how the different parts of a real software system fit together and work at scale.",
    explanation: `
Writing a single function or a small app is one skill. Deciding how dozens
of services, databases, and servers should work *together* — so that
millions of people can use a product reliably, quickly, and without it
falling over — is a different skill entirely. That's **system design**.

It's less about writing code and more about making decisions: Where should
data live? How do different parts of the system talk to each other? What
happens when one part fails, or when ten times more people show up at
once?
    `.trim(),
    analogy:
      "If writing code is like building a single room, system design is like being the architect of an entire city — deciding where the roads, water pipes, and power lines go so that everything works together, even as the population grows.",
    examples: [
      {
        title: "Questions system design answers",
        code: `// Not code you'd run — these are the kinds of questions system design asks:

// - Should this data live in one database or be split across several?
// - What happens if this server crashes right now?
// - How do we serve 10 million users instead of 10 thousand?
// - Should two services talk directly, or through a queue?`,
      },
    ],
    howItWorks: `
System design usually starts with understanding requirements (how many
users, how much data, how fast does it need to respond), then breaks the
problem into components (servers, databases, caches, queues), and decides
how those components connect and what happens when something goes wrong.
It's an iterative process of trade-offs, not a single right answer.
    `.trim(),
    whyItExists: `
A system that works perfectly for 10 users can completely fall apart at 10
million — slow responses, crashes, lost data. System design exists to
think through those problems *before* they happen, and to make deliberate,
informed trade-offs instead of accidental ones.
    `.trim(),
    commonMistakes: [
      "Jumping straight to specific technologies before understanding the actual requirements and constraints.",
      "Designing only for the current scale and ignoring how the system would need to change if usage grew 100x.",
      "Assuming there's one 'correct' design instead of a best trade-off given the specific goals.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Pick an app you use daily (e.g. a messaging app) and list 3 questions you'd need to answer to design its backend." },
      { difficulty: "Medium", prompt: "Sketch (in words) the major components you'd expect behind a simple photo-sharing app: what stores the photos, what stores the metadata, what serves requests." },
      { difficulty: "Hard", prompt: "Describe what might break in your sketch above if the app suddenly went from 1,000 to 10,000,000 users." },
    ],
    interviewQuestions: [
      { question: "What is system design, in your own words?", answer: "The process of deciding how the components of a software system (servers, databases, caches, queues, etc.) fit together to meet requirements like scale, speed, and reliability." },
      { question: "Why can't you just 'add more servers' to fix every scaling problem?", answer: "Because bottlenecks often move to somewhere else — like a single database — that doesn't automatically scale just by adding more application servers." },
      { question: "What's the difference between a functional and a non-functional requirement in system design?", answer: "Functional requirements describe what the system does (e.g. 'users can post a photo'); non-functional requirements describe how well it does it (e.g. 'responses under 200ms', 'handles 1M users')." },
    ],
    relatedTopics: ["client-and-server", "scalability"],
    keywords: ["system design", "architecture", "scale", "trade-offs"],
  },
  {
    id: "client-and-server",
    title: "Client and Server",
    level: "beginner",
    description: "The basic relationship between the app you use and the machine that does the real work behind it.",
    explanation: `
When you open an app or website, the thing you're looking at — the
screen, the buttons — is called the **client**. It usually doesn't have
all the data or logic itself; instead, it sends a request over the
internet to a **server**: a computer somewhere else that has the actual
data and does the real processing, then sends a response back.

This split — client asks, server answers — is the foundation almost every
piece of software on the internet is built on.
    `.trim(),
    analogy:
      "It's like ordering food at a restaurant. You (the client) don't cook the meal yourself — you tell the waiter what you want, the kitchen (the server) prepares it, and the waiter brings it back to your table.",
    examples: [
      {
        title: "A basic client-server exchange",
        code: `// Client (browser) sends a request:
fetch("https://api.example.com/users/1")
  .then((response) => response.json())
  .then((user) => console.log(user));

// Server receives the request, looks up the data,
// and sends back something like:
// { "id": 1, "name": "Amara" }`,
      },
    ],
    howItWorks: `
The client sends a request over the network specifying what it wants. The
server receives that request, does whatever work is needed (looking up
data, running logic), and sends a response back. The client then updates
what the user sees, based on that response.
    `.trim(),
    diagram: `
Client (app/browser)
       │  sends a request
       ▼
     Server
       │  processes it, sends a response
       ▼
Client (app/browser) — updates the screen
    `.trim(),
    whyItExists: `
Splitting work this way lets many different clients (phones, browsers,
smart TVs) share the same server and data, without each device needing to
store and manage everything itself. It also lets the server be updated or
scaled independently of the apps that use it.
    `.trim(),
    commonMistakes: [
      "Assuming the client can be trusted — a server should always re-check anything important, since clients can be modified by users.",
      "Forgetting that a request/response trip takes real time (network latency), which affects how responsive an app feels.",
      "Putting sensitive logic or secrets in client-side code, where anyone can inspect it.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Open your browser's Network tab and find one request your favorite website sends to its server." },
      { difficulty: "Medium", prompt: "Explain, in your own words, why a weather app needs a server instead of just knowing the weather itself." },
      { difficulty: "Hard", prompt: "Describe what could go wrong if a shopping app trusted the price sent from the client instead of verifying it on the server." },
    ],
    interviewQuestions: [
      { question: "What is the client-server model?", answer: "An architecture where a client sends requests to a server, which processes them and returns a response, rather than the client handling everything itself." },
      { question: "Why shouldn't a server trust data coming from the client?", answer: "Because client-side code and requests can be modified or forged by anyone, so the server must independently validate anything security- or business-critical." },
      { question: "What is latency, in the context of client-server communication?", answer: "The time it takes for a request to travel to the server and for the response to travel back — a key factor in how fast an app feels." },
    ],
    relatedTopics: ["http", "rest-apis"],
    keywords: ["client", "server", "request", "response", "latency"],
  },
  {
    id: "http",
    title: "HTTP",
    level: "beginner",
    description: "The common language that lets clients and servers talk to each other over the web.",
    explanation: `
For a client and a server to communicate, they both need to agree on a
shared format for requests and responses — otherwise it's just noise
neither side understands. **HTTP** (HyperText Transfer Protocol) is that
shared language: a set of rules for how a request should be structured,
what kinds of requests exist, and how a server should respond.
    `.trim(),
    analogy:
      "HTTP is like the standard format for a letter: a return address, a recipient address, a subject, and a body. Because everyone agrees on that format, any post office (server) can read and process any properly formatted letter (request).",
    examples: [
      {
        title: "A basic HTTP request/response",
        code: `GET /users/1 HTTP/1.1
Host: api.example.com

// Server responds:
HTTP/1.1 200 OK
Content-Type: application/json

{ "id": 1, "name": "Amara" }`,
        explanation:
          "`GET /users/1` asks for user #1. The server replies with a status code (`200 OK` means success) and the requested data.",
      },
    ],
    howItWorks: `
Every HTTP request has a **method** (what kind of action, like GET or
POST), a **path** (what resource it's about), and optional **headers** and
a **body** (extra data). Every response has a **status code** (like 200
for success or 404 for not found) plus its own headers and body. Both
sides just follow this shared structure.
    `.trim(),
    whyItExists: `
Without a shared protocol, every client and server pair would need its own
custom way of communicating — nothing on the web would be interoperable.
HTTP gives every browser, app, and server a common language, which is why
the web works at all.
    `.trim(),
    commonMistakes: [
      "Confusing HTTP status code categories, e.g. thinking all 4xx codes mean 'server error' (they mean client error; 5xx means server error).",
      "Forgetting that HTTP is stateless by default — the server doesn't automatically remember previous requests unless something (like cookies or tokens) carries that state.",
      "Using the wrong method for the action, e.g. using GET for something that changes data on the server.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "List the HTTP methods GET, POST, PUT, and DELETE, and describe what each is typically used for." },
      { difficulty: "Medium", prompt: "Look up what HTTP status codes 200, 301, 404, and 500 mean." },
      { difficulty: "Hard", prompt: "Explain, in your own words, why HTTP being 'stateless' matters for how servers are designed to scale." },
    ],
    interviewQuestions: [
      { question: "What is HTTP?", answer: "A protocol (a set of rules) that defines how clients and servers structure requests and responses when communicating over the web." },
      { question: "What does it mean that HTTP is stateless?", answer: "Each request is handled independently — the server doesn't automatically remember anything about previous requests from the same client unless extra mechanisms (cookies, tokens, sessions) are used." },
      { question: "What's the difference between GET and POST?", answer: "GET requests data without changing anything on the server (and can be cached); POST typically sends data to create or change something on the server." },
    ],
    relatedTopics: ["client-and-server", "rest-apis"],
    keywords: ["http", "protocol", "status code", "method", "stateless"],
  },
  {
    id: "rest-apis",
    title: "REST APIs",
    level: "beginner",
    description: "A common, predictable way to structure requests so different apps can talk to a server the same way.",
    explanation: `
An API (Application Programming Interface) is simply a way one piece of
software lets another piece of software ask it to do things. But an API
could be organized in a thousand different, inconsistent ways — which
makes it hard to learn and use. **REST** is a popular, widely-agreed-upon
style for designing APIs so that they're consistent and predictable across
countless different services.

The core idea: everything is a "resource" (like a user, a post, a
product), identified by a URL, and you use standard HTTP methods to act on
it — GET to read, POST to create, PUT/PATCH to update, DELETE to remove.
    `.trim(),
    analogy:
      "REST is like a well-labeled filing cabinet where every drawer follows the same layout convention. Once you understand one drawer, you instantly know how to work with any other drawer in any cabinet built the same way.",
    examples: [
      {
        title: "REST-style endpoints for a 'posts' resource",
        code: `GET    /posts       // get all posts
GET    /posts/42    // get one specific post
POST   /posts       // create a new post
PUT    /posts/42    // replace post 42 entirely
PATCH  /posts/42    // partially update post 42
DELETE /posts/42    // delete post 42`,
        explanation:
          "Notice the URL identifies *what* you're acting on (a post, or a specific one), and the HTTP method identifies *what action* you're taking.",
      },
    ],
    howItWorks: `
A REST API exposes resources as URLs and relies on standard HTTP methods
and status codes rather than inventing custom verbs for every action. This
consistency means a developer who's used one REST API can usually guess
how another one works, without reading extensive documentation.
    `.trim(),
    whyItExists: `
Before conventions like REST became common, every API had its own bespoke
rules, making integration slow and error-prone. REST gives teams a shared
set of conventions, which speeds up building and consuming APIs across
completely different companies and codebases.
    `.trim(),
    commonMistakes: [
      "Using verbs in URLs (`/getUser`) instead of nouns with proper HTTP methods (`GET /user`).",
      "Returning 200 OK for every response, even for errors, instead of using proper status codes.",
      "Designing endpoints that don't map cleanly to a resource, making the API inconsistent and confusing.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Design REST-style endpoints for a 'comments' resource: list, get one, create, update, delete." },
      { difficulty: "Medium", prompt: "Explain why `POST /users/delete/42` is not a RESTful way to delete a user, and rewrite it properly." },
      { difficulty: "Hard", prompt: "Design a small REST API (endpoints + methods + expected status codes) for a simple to-do list app." },
    ],
    interviewQuestions: [
      { question: "What does REST stand for, and what's its core idea?", answer: "Representational State Transfer — the core idea is treating everything as a resource identified by a URL, manipulated using standard HTTP methods." },
      { question: "What makes an API 'RESTful'?", answer: "Using resource-based URLs, standard HTTP methods for actions, standard status codes for outcomes, and being stateless between requests." },
      { question: "What's the difference between PUT and PATCH?", answer: "PUT typically replaces an entire resource; PATCH applies a partial update, changing only the specified fields." },
    ],
    relatedTopics: ["http", "client-and-server", "databases"],
    keywords: ["REST", "API", "endpoint", "resource", "CRUD"],
  },
];
