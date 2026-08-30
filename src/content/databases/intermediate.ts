import type { Topic } from "../../types/content";

export const databasesIntermediateTopics: Topic[] = [
  {
    id: "joins",
    title: "Joins",
    level: "intermediate",
    description: "Combining matching rows from two or more tables into a single set of results, using the foreign keys that link them.",
    explanation: `
You've split your data across tables on purpose — a \`users\` table and an
\`orders\` table, linked by a \`user_id\` foreign key. That's great for
avoiding duplication, but eventually you need to ask a question that
spans both: "show me each order along with the name of the person who
placed it." Neither table alone has both pieces of information.

A **join** is how SQL answers that. It combines rows from two tables
based on a matching column (usually a foreign key matching a primary
key), producing results that look like the two tables had been "glued
together" side by side, row by row, wherever they match.

The two most common kinds: an **INNER JOIN** returns only rows that
have a match in both tables. A **LEFT JOIN** returns every row from the
left (first) table, filling in empty values when there's no match in
the right table.
    `.trim(),
    analogy:
      "Imagine two spreadsheets: one lists employees and their department ID, another lists department IDs and department names. A join is like a coworker who takes both spreadsheets and hands you one combined sheet where every employee row also shows their department's actual name, matched up by that shared ID.",
    examples: [
      {
        title: "INNER JOIN — only matching rows",
        code: `SELECT orders.id, orders.total_cents, users.name
FROM orders
INNER JOIN users ON orders.user_id = users.id;`,
        explanation: "Returns one row per order, but only for orders whose user_id actually matches a real user — an order with a broken or missing user_id would be left out entirely.",
        walkthrough: [
          { code: "SELECT orders.id, orders.total_cents, users.name", explanation: "Pulls columns from both tables into one result — this is only possible because they're being joined together." },
          { code: "FROM orders", explanation: "Starts from the orders table." },
          { code: "INNER JOIN users ON orders.user_id = users.id;", explanation: "For each order, finds the user row where users.id matches orders.user_id, and glues that row's columns on. Orders with no matching user are dropped." },
        ],
      },
      {
        title: "LEFT JOIN — keep unmatched rows too",
        code: `SELECT users.name, orders.id AS order_id
FROM users
LEFT JOIN orders ON orders.user_id = users.id;`,
        explanation: "Returns every user, even ones who have never placed an order — for those, order_id simply comes back as empty (NULL) instead of the row disappearing.",
      },
    ],
    howItWorks: `
For each row in the first table, the database looks for row(s) in the
second table where the join condition (\`ON ...\`) is true, and produces
one combined result row for every match found. With \`INNER JOIN\`, a row
from the first table with zero matches contributes nothing to the
results. With \`LEFT JOIN\`, a row from the first (left) table with zero
matches still appears once, with the second table's columns filled in as
empty.

Under the hood, the database often uses an index on the joined column
to find matches quickly rather than comparing every row against every
other row.
    `.trim(),
    whyItExists: `
Joins exist because splitting data into separate, non-duplicated tables
(which is exactly what normalization recommends) would be nearly
useless if you couldn't easily bring related pieces back together for a
single question. Joins are what make normalized, non-redundant table
design actually practical to query.
    `.trim(),
    whenToUse: `
Use a join whenever an answer requires information that's split across
two or more related tables — showing an order with the customer's name,
listing a blog post with its author, showing a product with its category.
Use LEFT JOIN specifically when you want to keep rows from the first
table even when there's no match (like showing all users, including
ones with zero orders).
    `.trim(),
    whenNotToUse: `
If you only ever need data from a single table, a join adds unnecessary
complexity and cost. And joining very large tables without a supporting
index can be slow — sometimes it's worth reconsidering the schema (or
adding an index) rather than joining freely everywhere.
    `.trim(),
    commonMistakes: [
      "Forgetting the ON condition, which produces a 'cross join' — every row from the first table paired with every row from the second, a combinatorial explosion.",
      "Using INNER JOIN when you actually wanted to keep unmatched rows, silently losing data (like customers with no orders vanishing from the results).",
      "Not qualifying column names (like using just id instead of orders.id) when both joined tables have a column with the same name, causing ambiguity errors.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Write an INNER JOIN between a products table and a categories table (products has a category_id foreign key) to list each product with its category name." },
      { difficulty: "Medium", prompt: "Write a LEFT JOIN that lists every category along with its products, including categories that currently have zero products." },
      { difficulty: "Hard", prompt: "Explain what result you'd get from joining two tables with an ON condition that's always true (e.g. ON 1 = 1), and why that's usually a mistake." },
    ],
    interviewQuestions: [
      { question: "What's the difference between an INNER JOIN and a LEFT JOIN?", answer: "INNER JOIN returns only rows that have a match in both tables; LEFT JOIN returns every row from the left table, filling in empty values when there's no matching row on the right." },
      { question: "Why are joins necessary if data is split across normalized tables?", answer: "Because normalization intentionally avoids duplicating data across tables, and joins are how you recombine related data from those separate tables when a query needs both." },
      { question: "What happens if you write a join without an ON condition?", answer: "You get a cross join — every row from the first table paired with every row from the second table, which is almost never what's intended." },
    ],
    prerequisites: ["primary-and-foreign-keys", "basic-sql-queries"],
    relatedTopics: ["primary-and-foreign-keys", "normalization", "aggregation"],
    keywords: ["JOIN", "INNER JOIN", "LEFT JOIN", "relational data"],
  },
  {
    id: "aggregation",
    title: "Aggregation",
    level: "intermediate",
    description: "Collapsing many rows down into a single summary value — a count, a total, an average — instead of listing every individual row.",
    explanation: `
Sometimes you don't want the individual rows at all — you want a summary
across them. "How many orders total?" "What's the total revenue?"
"What's the average order value per customer?" These are **aggregation**
questions: turning many rows into one (or a few) summary numbers.

SQL provides aggregate functions like \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, and
\`MAX\` for exactly this. On their own, they summarize an entire table
into one row. Paired with \`GROUP BY\`, they summarize *per group* — one
summary row per distinct value in a column, like "total revenue per
customer" instead of one grand total across everyone.
    `.trim(),
    analogy:
      "If a table of orders is a pile of individual receipts, aggregation is adding them all up on a calculator to get one total. GROUP BY is sorting the receipts into piles by customer first, then running the calculator on each pile separately, giving you one total per customer instead of one total overall.",
    examples: [
      {
        title: "A single summary value",
        code: `SELECT COUNT(*) AS total_orders, SUM(total_cents) AS revenue_cents
FROM orders;`,
        explanation: "Collapses the entire orders table into one row: how many orders exist, and their combined total.",
        walkthrough: [
          { code: "SELECT COUNT(*) AS total_orders,", explanation: "Counts how many rows are in the table, and labels that result column total_orders." },
          { code: "SUM(total_cents) AS revenue_cents", explanation: "Adds up the total_cents column across every row." },
          { code: "FROM orders;", explanation: "Both aggregate functions run over every row of the orders table." },
        ],
      },
      {
        title: "Summarizing per group",
        code: `SELECT user_id, COUNT(*) AS order_count, SUM(total_cents) AS revenue_cents
FROM orders
GROUP BY user_id;`,
        explanation: "Instead of one grand total, this produces one row per distinct user_id — each with that user's own order count and revenue total.",
      },
    ],
    howItWorks: `
Without \`GROUP BY\`, an aggregate function scans every row that survives
any \`WHERE\` clause and folds them into a single result. With
\`GROUP BY <column>\`, the database first buckets rows by that column's
value, then runs the aggregate function separately within each bucket,
producing one result row per bucket.

A \`HAVING\` clause can then filter *those group results* — for example,
"only show customers with more than 5 orders" — which is different from
\`WHERE\`, which filters individual rows *before* grouping happens.
    `.trim(),
    whyItExists: `
Individual rows are often too granular to be useful for decisions —
nobody reads a million individual order rows to understand revenue.
Aggregation exists so the database can do that summarizing work
directly, efficiently, and correctly, instead of every application
pulling all the raw rows and computing totals in its own code.
    `.trim(),
    whenToUse: `
Reach for aggregation any time you need a count, total, average, or
extreme value — dashboards, reports, "top N by revenue" style features,
or any question phrased as "how many," "how much," or "on average."
    `.trim(),
    whenNotToUse: `
If you need the individual rows themselves (not a summary), aggregation
isn't the tool — a plain SELECT with WHERE and ORDER BY is. Aggregating
extremely large tables on every request without caching can also be
slow; some apps precompute and store summaries instead of recalculating
them live every time.
    `.trim(),
    commonMistakes: [
      "Selecting a non-aggregated, non-grouped column alongside an aggregate function, which most databases reject or handle unpredictably.",
      "Using WHERE to try to filter on an aggregate result (like WHERE COUNT(*) > 5) instead of the required HAVING clause.",
      "Forgetting that COUNT(*) counts rows including ones with empty values, while COUNT(column_name) skips rows where that specific column is empty.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Write a query that returns the total number of rows and the average price from a products table." },
      { difficulty: "Medium", prompt: "Write a query using GROUP BY to show the number of orders placed per user_id in an orders table." },
      { difficulty: "Hard", prompt: "Extend the previous query with a HAVING clause that only shows users with more than 3 orders." },
    ],
    interviewQuestions: [
      { question: "What does GROUP BY do?", answer: "It buckets rows by the value of one or more columns, then runs any aggregate functions separately within each bucket, producing one result row per group." },
      { question: "What's the difference between WHERE and HAVING?", answer: "WHERE filters individual rows before grouping happens; HAVING filters the summarized group results after aggregation." },
      { question: "What's the difference between COUNT(*) and COUNT(column_name)?", answer: "COUNT(*) counts every row regardless of empty values; COUNT(column_name) only counts rows where that specific column has a non-empty value." },
    ],
    prerequisites: ["basic-sql-queries", "filtering-and-sorting"],
    relatedTopics: ["filtering-and-sorting", "joins", "indexes"],
    keywords: ["aggregation", "GROUP BY", "COUNT", "SUM", "AVG", "HAVING"],
  },
  {
    id: "indexes",
    title: "Indexes",
    level: "intermediate",
    description: "A separate lookup structure the database maintains so it can jump straight to matching rows instead of scanning the whole table.",
    explanation: `
Picture a \`users\` table with 10 million rows, and you run
\`SELECT * FROM users WHERE email = 'amara@example.com'\`. Without any
help, the database has no shortcut — it has to check every single row's
email column, one by one, until it either finds a match or reaches the
end. On a huge table, that's slow, and it gets slower as the table
grows.

An **index** fixes this. It's a separate, ordered structure — much like
the index at the back of a textbook — that maps values in a specific
column straight to the location of the rows that have them. With an
index on \`email\`, the database can jump almost directly to the matching
row, instead of reading the whole table.
    `.trim(),
    analogy:
      "Without an index, finding a topic in a book means flipping through every page from the start. With an index at the back of the book, you look up the topic alphabetically and it tells you exactly which page to turn to — you skip straight there.",
    examples: [
      {
        title: "Before: scanning every row",
        code: `-- No index on email.
-- The database checks every row's email, one at a time,
-- until it finds (or rules out) a match.
SELECT * FROM users WHERE email = 'amara@example.com';`,
        explanation: "On a table with millions of rows and no index, this query's cost grows directly with the table's size — it's called a 'full table scan.'",
      },
      {
        title: "After: creating an index",
        code: `CREATE INDEX idx_users_email ON users (email);

-- Same query as before, now much faster:
SELECT * FROM users WHERE email = 'amara@example.com';`,
        explanation: "After the index exists, the same query can jump almost directly to the matching row using the index, instead of checking every row in the table.",
        walkthrough: [
          { code: "CREATE INDEX idx_users_email ON users (email);", explanation: "Builds a separate, ordered lookup structure mapping email values to their row locations." },
          { code: "SELECT * FROM users WHERE email = 'amara@example.com';", explanation: "The database recognizes it can use idx_users_email to jump straight to matching rows, instead of scanning the whole table." },
        ],
      },
    ],
    howItWorks: `
Most indexes are built as a **B-tree** — a sorted, tree-shaped structure
that lets the database narrow down to a matching value in a small
number of steps, similar to how you'd find a word in a sorted dictionary
by repeatedly splitting the search space in half, rather than reading
every entry from the start.

The tradeoff: an index isn't free. Every time a row is inserted, updated,
or deleted, every index on that table has to be updated too, which adds
overhead to writes. Indexes also take up extra disk space. That's why
databases don't index every column automatically — indexing is a
deliberate choice, usually made for columns that are frequently searched
or joined on.
    `.trim(),
    whyItExists: `
Without indexes, every query that filters or joins on a non-trivial
condition would need to scan an entire table, and query time would grow
linearly (or worse) with data size. Indexes exist to trade a bit of
extra storage and slightly slower writes for dramatically faster reads
on the columns that matter most.
    `.trim(),
    whenToUse: `
Add an index on columns that are frequently used in WHERE clauses, JOIN
conditions, or ORDER BY clauses — especially on large tables. Foreign
key columns are also strong candidates, since they're joined on often.
    `.trim(),
    whenNotToUse: `
Avoid indexing columns that are rarely searched or that change on
almost every write (since every index update adds write overhead), and
avoid indexing very small tables — scanning a few hundred rows is
already fast enough that an index adds cost without meaningful benefit.
    `.trim(),
    commonMistakes: [
      "Adding an index to every column 'just in case,' which slows down every write without meaningfully speeding up reads that don't use those columns.",
      "Expecting an index to help a query that doesn't filter, join, or sort on the indexed column at all.",
      "Forgetting that foreign key columns often benefit from an index too, since joins on them are common.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Explain in your own words why a full table scan gets slower as a table grows, but an indexed lookup barely does." },
      { difficulty: "Medium", prompt: "Write a CREATE INDEX statement for a status column on an orders table that's frequently filtered by status." },
      { difficulty: "Hard", prompt: "Describe a scenario where adding an index would actually hurt overall performance rather than help it." },
    ],
    interviewQuestions: [
      { question: "What is a database index?", answer: "A separate, ordered lookup structure the database maintains for a column, letting it jump to matching rows instead of scanning the whole table." },
      { question: "What's the tradeoff of adding an index?", answer: "Faster reads on the indexed column, at the cost of extra disk space and slower writes, since every insert, update, or delete has to update the index too." },
      { question: "What data structure do most database indexes use internally?", answer: "A B-tree, which allows narrowing down to a matching value in relatively few steps by keeping data sorted in a tree shape." },
    ],
    prerequisites: ["filtering-and-sorting"],
    relatedTopics: ["filtering-and-sorting", "joins", "query-optimization"],
    keywords: ["index", "B-tree", "full table scan", "performance"],
  },
  {
    id: "normalization",
    title: "Normalization",
    level: "intermediate",
    description: "Organizing tables so each piece of information is stored in exactly one place, instead of copied and repeated everywhere it's needed.",
    explanation: `
Imagine a single \`orders\` table that stores the customer's name and
email directly on every order row, instead of just a \`user_id\`. If that
customer changes their email, you'd need to find and update it on
*every single order they've ever placed* — miss one, and now your data
disagrees with itself about what their email is.

**Normalization** is the practice of restructuring tables so each fact
is stored exactly once, and everything else references it (usually via
a foreign key) instead of copying it. It doesn't eliminate the
relationship between orders and customer info — it just makes sure that
info lives in one authoritative place.
    `.trim(),
    analogy:
      "Storing a customer's email on every order is like writing a friend's phone number on every single letter you send them. Normalization is like writing their name in your address book once, and just referencing 'call the number in my address book' everywhere else — update it once, and every future reference is correct.",
    examples: [
      {
        title: "Before: duplicated data",
        code: `-- orders table (not normalized)
id | customer_name | customer_email      | total_cents
1  | Amara Musa     | amara@example.com  | 4599
2  | Amara Musa     | amara@example.com  | 1200
3  | Amara Musa     | amara@example.com  | 800

-- Amara's email is repeated on every single order.
-- Changing it means updating all 3 rows, and it's easy to miss one.`,
        explanation: "The same customer's name and email are copied into every order row — a change to her email requires finding and fixing every one of these rows.",
      },
      {
        title: "After: normalized into two tables",
        code: `-- users table
id | name        | email
2  | Amara Musa  | amara@example.com

-- orders table (normalized)
id | user_id | total_cents
1  | 2       | 4599
2  | 2       | 1200
3  | 2       | 800

-- Amara's email now lives in exactly one row.
-- Updating it there instantly applies everywhere it's referenced.`,
        explanation: "Now Amara's details exist in exactly one row. Every order just references her by user_id, so updating her email means changing a single row, and every order automatically reflects the correct value through a join.",
      },
    ],
    howItWorks: `
Normalization is usually described in stages called **normal forms**,
each fixing a specific kind of duplication or inconsistency — for
example, making sure a column doesn't hold multiple values at once, or
that non-key columns don't depend on only part of a multi-column key.
In practice, most everyday schema design just applies the core idea
repeatedly: if a fact could change and would require updating more than
one row to stay correct, pull it into its own table and reference it
with a foreign key instead.
    `.trim(),
    whyItExists: `
Duplicated data is a breeding ground for inconsistency — the same fact
stored in ten places will eventually disagree with itself, because
someone updates nine of them and misses one. Normalization exists to
guarantee that each fact has exactly one authoritative home, so there's
never a question of "which copy is correct."
    `.trim(),
    whenToUse: `
Normalize whenever a piece of information logically belongs to one
entity (a customer's email, a product's price) and might change over
time — keeping it in one place makes updates safe and consistent. This
is the default approach for most relational schema design.
    `.trim(),
    whenNotToUse: `
Heavily normalized data requires more joins to reassemble, which can
cost performance on read-heavy systems. Sometimes a deliberate amount
of duplication (**denormalization**) is accepted for speed — for
example, storing a product's name directly on a historical order line
item, so an old receipt still shows the product's name at the time of
purchase even if the product is later renamed.
    `.trim(),
    commonMistakes: [
      "Storing a repeatable value (like a customer's address) directly on every related row instead of referencing it from a single source table.",
      "Over-normalizing every last detail, resulting in so many tables that simple queries require deep chains of joins.",
      "Confusing normalization with just 'having multiple tables' — the goal is eliminating duplicated, update-prone facts, not table count for its own sake.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Explain what could go wrong if a shipping address were duplicated across every order a customer places, instead of stored once." },
      { difficulty: "Medium", prompt: "Take a single 'employees' table that repeats department name and department manager on every employee row, and redesign it into two normalized tables." },
      { difficulty: "Hard", prompt: "Describe a realistic situation where deliberately keeping some duplicated data (denormalization) would be a reasonable tradeoff." },
    ],
    interviewQuestions: [
      { question: "What problem does normalization solve?", answer: "It prevents the same fact from being duplicated across many rows, which would otherwise create the risk of those copies becoming inconsistent with each other." },
      { question: "What's the tradeoff of a highly normalized schema?", answer: "Reassembling related data requires more joins, which can add query complexity and cost compared to having some data duplicated." },
      { question: "What is denormalization?", answer: "A deliberate decision to duplicate some data (accepting the inconsistency risk) in exchange for faster reads or simpler queries." },
    ],
    prerequisites: ["primary-and-foreign-keys", "joins"],
    relatedTopics: ["primary-and-foreign-keys", "joins", "nosql-data-modeling"],
    keywords: ["normalization", "denormalization", "data duplication", "schema design"],
  },
  {
    id: "transactions-and-acid",
    title: "Transactions & ACID",
    level: "intermediate",
    description: "Grouping several database operations into one all-or-nothing unit, so a failure partway through never leaves data half-changed.",
    explanation: `
Imagine transferring money between two bank accounts: subtract $100 from
Account A, then add $100 to Account B. Those are two separate
operations. If the database crashes, or the connection drops, right
after the subtraction but before the addition, Account A just lost $100
that vanished into nowhere.

A **transaction** groups multiple operations into a single all-or-nothing
unit: either every operation in it succeeds and is saved permanently, or
if anything fails partway through, everything in the transaction is
rolled back as if none of it had ever happened. There's no in-between,
half-applied state.

The guarantees transactions provide are usually summarized by the
acronym **ACID**: **Atomicity** (all-or-nothing), **Consistency** (the
data always ends up following the rules you've defined, like foreign
keys), **Isolation** (transactions running at the same time don't see
each other's half-finished work), and **Durability** (once a transaction
is confirmed, it survives even a crash right afterward).
    `.trim(),
    analogy:
      "A transaction is like sealing several steps of a task inside an envelope: either the whole envelope gets delivered exactly as sealed, or it never gets sent at all. Nobody ever receives half an envelope.",
    examples: [
      {
        title: "A money transfer as a transaction",
        code: `BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;`,
        explanation: "Both updates are wrapped between BEGIN and COMMIT. If anything fails after the first UPDATE but before COMMIT, the database can roll the whole thing back, and Account 1's balance is restored as if the transfer never started.",
        walkthrough: [
          { code: "BEGIN;", explanation: "Starts a new transaction — nothing inside it is made permanent yet." },
          { code: "UPDATE accounts SET balance = balance - 100 WHERE id = 1;", explanation: "Subtracts from the first account. Still not permanent — only visible within this transaction so far." },
          { code: "UPDATE accounts SET balance = balance + 100 WHERE id = 2;", explanation: "Adds to the second account." },
          { code: "COMMIT;", explanation: "Confirms both changes together, permanently. If this line is never reached, neither change is kept." },
        ],
      },
      {
        title: "Rolling back on purpose",
        code: `BEGIN;

UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 42;
-- Suppose application code checks the new quantity and finds it went negative:
ROLLBACK;`,
        explanation: "ROLLBACK explicitly undoes every change made since BEGIN, as if the transaction never happened — useful when application logic detects a problem partway through.",
      },
    ],
    howItWorks: `
When a transaction begins, the database tracks every change made within
it but doesn't make those changes visible or permanent to anyone else
yet. \`COMMIT\` tells the database to make all of those changes permanent
at once. \`ROLLBACK\` tells it to discard all of them, restoring the data
to how it was before \`BEGIN\`.

To achieve isolation, the database controls how much (and when) one
transaction's in-progress changes are visible to other transactions
running at the same time, so two transfers happening simultaneously
don't corrupt each other's math.
    `.trim(),
    whyItExists: `
Real-world operations are frequently made of multiple steps that only
make sense together. Without transactions, a crash, a network drop, or
a bug partway through a multi-step operation could leave the database in
a state that no correct sequence of operations would ever produce —
money debited but never credited, an order marked paid with no payment
recorded. Transactions exist to make "partly done" impossible.
    `.trim(),
    whenToUse: `
Wrap operations in a transaction whenever multiple statements need to
succeed or fail together to keep the data correct — financial transfers,
placing an order that also decrements inventory, creating a user account
alongside its related settings row.
    `.trim(),
    whenNotToUse: `
A single, standalone statement doesn't need an explicit transaction —
most databases already treat one statement as its own transaction by
default. Also avoid holding a transaction open for a long time (e.g.
across a slow external API call), since it can block other transactions
from proceeding.
    `.trim(),
    commonMistakes: [
      "Forgetting to COMMIT, leaving changes uncommitted and eventually rolled back or lost.",
      "Doing slow, unrelated work (like calling an external API) inside an open transaction, which can block other operations waiting on the same rows.",
      "Assuming a crash mid-transaction leaves partial changes in place — properly used transactions guarantee it does not.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Explain, in your own words, what would go wrong with a money transfer if it were not wrapped in a transaction and the app crashed halfway through." },
      { difficulty: "Medium", prompt: "Write a transaction that inserts a new order row and decrements a product's stock quantity, so both happen together or not at all." },
      { difficulty: "Hard", prompt: "Explain each of the four ACID properties in your own words, using the money transfer example to illustrate each one." },
    ],
    interviewQuestions: [
      { question: "What does a database transaction guarantee?", answer: "That a group of operations either all succeed and become permanent, or if any part fails, none of them take effect — there's no partially applied state." },
      { question: "What does the 'A' in ACID stand for, and what does it mean?", answer: "Atomicity — all operations in a transaction are treated as a single indivisible unit; either all of them apply or none do." },
      { question: "What is the difference between COMMIT and ROLLBACK?", answer: "COMMIT makes every change in the current transaction permanent; ROLLBACK discards every change made since the transaction began, as if it never happened." },
    ],
    prerequisites: ["basic-sql-queries"],
    relatedTopics: ["basic-sql-queries", "connection-pooling"],
    keywords: ["transaction", "ACID", "atomicity", "commit", "rollback"],
  },
  {
    id: "orms",
    title: "ORMs",
    level: "intermediate",
    description: "A library that lets application code work with database rows as regular objects, generating SQL behind the scenes instead of you writing it by hand.",
    explanation: `
Writing raw SQL strings inside application code works, but it can get
repetitive and error-prone — building queries by concatenating strings,
manually mapping columns back into your programming language's objects,
and re-typing similar SELECT/INSERT/UPDATE patterns over and over.

An **ORM** (Object-Relational Mapper) is a library that bridges that
gap. It lets you work with rows as regular objects in your programming
language — creating a \`User\` object, setting its properties, calling
\`.save()\` — and it translates those actions into the actual SQL
statements behind the scenes. You describe *what* you want in the
language you're already writing in, and the ORM generates the *how* in
SQL.
    `.trim(),
    analogy:
      "An ORM is like a translator at a business meeting between two people who speak different languages. You speak your own language (your application code) and the translator (the ORM) converts your requests into the other language (SQL) that the database actually understands, then translates the reply back.",
    examples: [
      {
        title: "Raw SQL vs. an ORM (JavaScript, using a Prisma-style ORM)",
        code: `// Raw SQL
const result = await db.query(
  "SELECT * FROM users WHERE id = $1",
  [userId]
);
const user = result.rows[0];

// With an ORM
const user = await prisma.user.findUnique({
  where: { id: userId },
});`,
        explanation: "Both approaches fetch the same row, but the ORM version reads like ordinary application code and returns a ready-to-use object, with the SQL generated automatically underneath.",
        walkthrough: [
          { code: 'const result = await db.query("SELECT * FROM users WHERE id = $1", [userId]);', explanation: "Sends a raw SQL string to the database, manually passing userId as a parameter." },
          { code: "const user = result.rows[0];", explanation: "Manually pulls the first matching row out of the raw result." },
          { code: "const user = await prisma.user.findUnique({ where: { id: userId } });", explanation: "The ORM builds the equivalent SQL query itself and returns the row already shaped as a plain object." },
        ],
      },
      {
        title: "Creating and updating a row through an ORM",
        code: `const user = await prisma.user.create({
  data: { name: "Amara", email: "amara@example.com" },
});

await prisma.user.update({
  where: { id: user.id },
  data: { email: "amara@newmail.com" },
});`,
        explanation: "Equivalent to an INSERT followed by an UPDATE statement, but expressed as method calls on objects rather than hand-written SQL strings.",
      },
    ],
    howItWorks: `
An ORM keeps a mapping between your programming language's classes or
object shapes and the database's tables and columns. When you call a
method like \`.create()\` or \`.findUnique()\`, the ORM builds the
corresponding SQL statement, sends it to the database, and converts the
raw rows that come back into objects matching your application's data
shapes.

Most ORMs also handle a related concern called migrations (versioned
scripts that change the schema over time), connection management, and
often let you "drop down" to raw SQL for the rare query that's awkward
to express through the ORM's own API.
    `.trim(),
    whyItExists: `
Hand-writing SQL for every operation in a large application means a lot
of repetitive string-building, manual type conversion, and a bigger
surface for mistakes (like accidentally leaving a query open to SQL
injection). ORMs exist to remove that repetition, let you stay in one
programming language most of the time, and provide safer defaults (like
automatically parameterizing values) out of the box.
    `.trim(),
    whenToUse: `
ORMs are a good fit for the majority of everyday application code —
straightforward CRUD operations, standard relationships, typical
filtering — where the productivity and safety benefits outweigh the
abstraction cost.
    `.trim(),
    whenNotToUse: `
For complex, performance-critical queries — heavy aggregations, deeply
nested joins, database-specific features — an ORM's generated SQL can be
inefficient or awkward to express, and writing raw SQL directly (which
most ORMs still allow as an escape hatch) is often clearer and faster.
    `.trim(),
    commonMistakes: [
      "Assuming an ORM automatically produces efficient SQL — it can generate slow queries (like fetching related rows one at a time in a loop) just as easily as hand-written code can.",
      "Never learning the underlying SQL, which makes debugging a slow or wrong query much harder when the ORM is the only thing understood.",
      "Fighting the ORM to force an awkward query through it, instead of just dropping down to raw SQL for that one case.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Explain, in your own words, what an ORM does between your application code and the database." },
      { difficulty: "Medium", prompt: "Write the raw SQL equivalent of an ORM call that finds all orders where total_cents is greater than 1000." },
      { difficulty: "Hard", prompt: "Describe a scenario where writing raw SQL directly would be a better choice than using an ORM's query builder." },
    ],
    interviewQuestions: [
      { question: "What is an ORM?", answer: "A library that lets you work with database rows as objects in your programming language, translating those object operations into SQL behind the scenes." },
      { question: "What's a downside of relying entirely on an ORM?", answer: "It can generate inefficient SQL for complex queries, and developers who never learn the underlying SQL can struggle to debug or optimize slow queries." },
      { question: "Do ORMs prevent you from writing raw SQL when needed?", answer: "No — most ORMs provide an escape hatch to run raw SQL directly for cases their query API doesn't handle well." },
    ],
    prerequisites: ["basic-sql-queries"],
    relatedTopics: ["basic-sql-queries", "database-migrations", "connection-pooling"],
    keywords: ["ORM", "object-relational mapper", "Prisma", "abstraction"],
  },
];
