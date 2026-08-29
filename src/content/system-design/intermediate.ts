import type { Topic } from "../../types/content";

export const systemDesignIntermediateTopics: Topic[] = [
  {
    id: "databases",
    title: "Databases",
    level: "intermediate",
    description: "Where an application's data actually lives, safely, between requests.",
    explanation: `
A running program keeps its variables in memory, but memory disappears the
moment the program stops or restarts — not great for a user's account,
posts, or orders. A **database** is software specifically designed to
store data reliably on disk, retrieve it quickly, and keep it consistent
even when many things are reading and writing at once.

Almost every real application has a database sitting behind its server,
holding the actual persistent data the app depends on.
    `.trim(),
    analogy:
      "If a server is the chef preparing your order, the database is the pantry and fridge — a well-organized place where ingredients (data) are stored so the chef can reliably find and use them, even after the kitchen closes and reopens the next day.",
    examples: [
      {
        title: "A server reading from a database",
        code: `// Simplified example
async function getUser(id) {
  const user = await database.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  return user;
}`,
        explanation:
          "The server doesn't store user data itself — it asks the database, which is responsible for storing and retrieving it reliably.",
        walkthrough: [
          { code: "async function getUser(id) {", explanation: "Defines a function that will fetch one user from the database." },
          { code: 'database.query("SELECT * FROM users WHERE id = ?", [id])', explanation: "Asks the database for the row matching this id, waiting for the (possibly slow) answer." },
          { code: "return user;", explanation: "Sends the result back to whoever called getUser." },
        ],
      },
    ],
    howItWorks: `
A database organizes data (often into tables, or collections of
documents), and provides a query language or API to read and write that
data. It also manages tricky details automatically — like making sure two
simultaneous writes don't corrupt each other, and that data survives a
crash or restart.
    `.trim(),
    whyItExists: `
Applications need data to persist reliably — surviving crashes, restarts,
and simultaneous use by many users at once. Building that reliability from
scratch for every app would be enormously wasteful; databases exist so
every application can rely on the same well-tested foundation.
    `.trim(),
    whenToUse: `
Use a database anytime data needs to survive beyond a single request or
process — user accounts, orders, posts, anything that must still be there
tomorrow, or on a different server entirely.
    `.trim(),
    whenNotToUse: `
For data that's only ever needed for the lifetime of a single request — a
temporary calculation, a value passed between two functions — a database
is unnecessary overhead. Keep that in memory instead.
    `.trim(),
    commonMistakes: [
      "Storing important data only in server memory, losing it whenever the server restarts.",
      "Not thinking about how a database will scale as data grows into the millions of records.",
      "Trusting user input directly in a database query, which can lead to serious security issues (like SQL injection).",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Explain, in your own words, why a to-do list app needs a database instead of just keeping tasks in the browser's memory." },
      { difficulty: "Medium", prompt: "Describe what data you'd store for a simple blog (e.g. posts, authors, comments) and how those pieces might relate to each other." },
      { difficulty: "Hard", prompt: "Explain what could go wrong if two users tried to buy the last item in stock at the exact same moment, and how a database might prevent it." },
    ],
    interviewQuestions: [
      { question: "Why can't an application just keep all its data in server memory?", answer: "Memory is wiped when a process restarts or crashes, and it doesn't scale across multiple servers — a database provides durable, shared storage instead." },
      { question: "What's the difference between reading and writing data in terms of design concerns?", answer: "Reads are typically far more frequent and easier to scale (e.g. via caching or replicas); writes need stronger guarantees around consistency and conflict handling." },
      { question: "What is data persistence?", answer: "The property of data surviving beyond the lifetime of the process that created it — e.g. still being there after a server restarts." },
    ],
    prerequisites: ["rest-apis"],
    relatedTopics: ["sql-vs-nosql", "caching", "rest-apis"],
    keywords: ["database", "persistence", "query", "storage"],
  },
  {
    id: "sql-vs-nosql",
    title: "SQL vs NoSQL",
    level: "intermediate",
    description: "Two different philosophies for organizing and storing data, each suited to different problems.",
    explanation: `
Not all databases organize data the same way. **SQL** (relational)
databases store data in strict tables with predefined columns, and are
very good at representing relationships between different kinds of data
consistently. **NoSQL** databases take a more flexible approach — storing
data as loose documents, key-value pairs, or other shapes — trading some
structure and consistency guarantees for flexibility and easier scaling
across many machines.

Neither is universally "better" — the right choice depends on how
structured your data is and how it needs to scale.
    `.trim(),
    analogy:
      "A SQL database is like a set of strict spreadsheets, each with fixed columns everyone must follow — great for consistency. A NoSQL database is more like a stack of index cards, where each card can have whatever fields make sense for it — great for flexibility.",
    examples: [
      {
        title: "The same data, two different shapes",
        code: `-- SQL: fixed columns, a strict table
-- users(id, name, email)
SELECT * FROM users WHERE id = 1;

// NoSQL (document-style): flexible shape per document
{
  "id": 1,
  "name": "Amara",
  "email": "amara@example.com",
  "preferences": { "theme": "dark" } // easy to add, no schema change needed
}`,
        walkthrough: [
          { code: "-- users(id, name, email)", explanation: "Defines a strict table shape — every row must have exactly these columns." },
          { code: "SELECT * FROM users WHERE id = 1;", explanation: "Reads the row matching id 1 from that fixed table." },
          { code: '{ "id": 1, "name": ..., "preferences": {...} }', explanation: "The same kind of data, stored as a flexible document — new fields can be added without changing every other record." },
        ],
      },
    ],
    howItWorks: `
SQL databases enforce a schema — every row in a table must have the same
columns — and are built around relationships between tables (a user has
many orders, an order has many items). NoSQL databases typically don't
enforce a fixed schema, letting each record's shape vary, and often
sacrifice some cross-record consistency guarantees in exchange for being
easier to spread across many servers.
    `.trim(),
    whyItExists: `
Some data is naturally tabular and relationship-heavy (financial records,
inventory) — a great fit for SQL's structure and guarantees. Other data is
less structured or needs to scale to enormous volume across many servers
(logs, user activity feeds) — where NoSQL's flexibility and scalability
are a better fit.
    `.trim(),
    whenToUse: `
Reach for SQL when your data is naturally tabular and relationships
between records matter a lot (orders belonging to users, items belonging
to orders) and you want strong consistency guarantees. Reach for NoSQL
when your data's shape varies a lot, changes frequently, or needs to
scale out across many machines more easily than a single relational
database can.
    `.trim(),
    whenNotToUse: `
Don't pick NoSQL just because it feels more modern — if your data is
genuinely relational, fighting that in a document store often means
reinventing SQL's features yourself. And don't force rigid SQL tables onto
data that changes shape constantly; frequent schema migrations become
their own maintenance burden.
    `.trim(),
    commonMistakes: [
      "Assuming NoSQL is always 'faster' or 'more modern' — it's a different trade-off, not a strict upgrade.",
      "Using a rigid SQL schema for data that changes shape constantly, causing painful migrations.",
      "Using a NoSQL database for data with many strict relationships, and then re-implementing relational logic manually in application code.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "List two examples of data that fit naturally into SQL tables, and two that fit better as flexible NoSQL documents." },
      { difficulty: "Medium", prompt: "Explain, in your own words, what a 'schema' is and why enforcing one has both benefits and costs." },
      { difficulty: "Hard", prompt: "Describe a scenario where you might use both a SQL and a NoSQL database in the same application, and why." },
    ],
    interviewQuestions: [
      { question: "What's the main structural difference between SQL and NoSQL databases?", answer: "SQL databases enforce a fixed schema and organize data into related tables; NoSQL databases typically allow flexible, schema-less structures like documents or key-value pairs." },
      { question: "When would you choose NoSQL over SQL?", answer: "When your data doesn't fit neatly into fixed tables, needs to scale horizontally across many servers, or its structure changes frequently." },
      { question: "Does choosing NoSQL mean giving up data consistency entirely?", answer: "Not entirely — but many NoSQL systems trade some strong consistency guarantees for availability and scalability, following what's sometimes called 'eventual consistency'." },
    ],
    prerequisites: ["databases"],
    relatedTopics: ["databases", "scalability"],
    keywords: ["SQL", "NoSQL", "relational", "schema", "document database"],
  },
  {
    id: "caching",
    title: "Caching",
    level: "intermediate",
    description: "Keeping a copy of frequently-needed data somewhere much faster to access, so you don't redo expensive work every time.",
    explanation: `
Some operations are expensive — a complex database query, a slow
calculation, a request to another service far away. If the same result is
needed again and again, redoing that expensive work every single time is
wasteful. **Caching** means storing a copy of the result somewhere fast
(often in memory) so future requests can just reuse it instead of
recomputing it.
    `.trim(),
    analogy:
      "It's like keeping a jar of pre-made coffee in the fridge instead of brewing a fresh pot every single time someone wants a cup. It's faster to grab an existing cup — you just have to remember to refill the jar occasionally.",
    examples: [
      {
        title: "A simple cache in front of a slow lookup",
        code: `const cache = new Map();

async function getUser(id) {
  if (cache.has(id)) {
    return cache.get(id); // fast — no database call
  }

  const user = await database.query("SELECT * FROM users WHERE id = ?", [id]);
  cache.set(id, user);
  return user;
}`,
        walkthrough: [
          { code: "const cache = new Map();", explanation: "A simple in-memory cache, empty to start." },
          { code: "if (cache.has(id)) { return cache.get(id); }", explanation: "If this id's result is already cached, return it immediately — no database call." },
          { code: 'const user = await database.query(...);', explanation: "Only runs on a cache miss — the expensive lookup." },
          { code: "cache.set(id, user);", explanation: "Stores the result for next time, before returning it." },
        ],
      },
    ],
    howItWorks: `
Before doing expensive work, the system checks the cache first. If the
data is there (a "cache hit"), it's returned immediately. If not (a "cache
miss"), the expensive work runs, and the result is stored in the cache for
next time. Cached data is usually also given an expiration time, so it
doesn't become permanently stale.
    `.trim(),
    diagram: `
Request comes in
       ↓
 Is it in the cache?
   ↓yes            ↓no
return cached    do expensive work
  value             ↓
                store result in cache
                     ↓
                return result
    `.trim(),
    whyItExists: `
Caching dramatically reduces load on slow or expensive resources (like
databases) and makes responses feel instant to users, at the cost of
occasionally serving slightly outdated data — a trade-off that's usually
well worth it for data that doesn't change every second.
    `.trim(),
    whenToUse: `
Reach for caching when the same expensive result is requested repeatedly
and doesn't need to be perfectly fresh every single time — a product
page, a popular search result, a computed report.
    `.trim(),
    whenNotToUse: `
Don't cache data that must always be perfectly up to date and changes
constantly — a live account balance mid-transaction, for instance — or
if you do, keep the cache lifetime extremely short and invalidate it
deliberately whenever the underlying data changes.
    `.trim(),
    commonMistakes: [
      "Caching data that changes frequently without a short enough expiration, leading to users seeing stale information.",
      "Forgetting to invalidate (clear) a cached value when the underlying data changes.",
      "Caching sensitive or user-specific data in a shared cache without properly separating it per user.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Explain, in your own words, the difference between a 'cache hit' and a 'cache miss'." },
      { difficulty: "Medium", prompt: "Add an expiration time to the cache example above, so cached values are only reused for 60 seconds." },
      { difficulty: "Hard", prompt: "Describe a real scenario where caching stale data could cause a real user-facing problem, and how you'd mitigate it." },
    ],
    interviewQuestions: [
      { question: "What is caching, in simple terms?", answer: "Storing a copy of a result somewhere fast to access, so repeated requests for the same thing don't redo expensive work." },
      { question: "What is cache invalidation, and why is it considered hard?", answer: "It's the process of removing or updating cached data once it's no longer accurate — hard because you must reliably track every place a cached value could become stale." },
      { question: "What's a trade-off caching introduces?", answer: "It can serve slightly outdated ('stale') data for a period of time, in exchange for much faster responses and less load on the underlying system." },
    ],
    prerequisites: ["databases"],
    relatedTopics: ["databases", "load-balancing", "cdn"],
    keywords: ["cache", "cache hit", "cache miss", "invalidation", "TTL"],
  },
];
