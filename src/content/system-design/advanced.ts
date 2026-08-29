import type { Topic } from "../../types/content";

export const systemDesignAdvancedTopics: Topic[] = [
  {
    id: "load-balancing",
    title: "Load Balancing",
    level: "advanced",
    description: "Spreading incoming requests across multiple servers so no single one gets overwhelmed.",
    explanation: `
A single server can only handle so many requests at once. Once traffic
grows beyond that, you need more than one server — but then, how does a
user's request know *which* server to go to? A **load balancer** sits in
front of a group of servers and decides, for every incoming request, which
one should handle it — spreading the work evenly so no single server gets
overloaded while others sit idle.
    `.trim(),
    analogy:
      "A load balancer is like the host at a busy restaurant who seats guests across all the available tables, instead of letting one table get 20 parties while the rest sit empty.",
    examples: [
      {
        title: "Conceptual round-robin balancing",
        code: `const servers = ["server-1", "server-2", "server-3"];
let next = 0;

function pickServer() {
  const server = servers[next];
  next = (next + 1) % servers.length; // cycle back to 0 after the last one
  return server;
}
// Requests get spread evenly: server-1, server-2, server-3, server-1, ...`,
        explanation:
          "This is a simplified version of 'round robin' — one of several strategies real load balancers use to distribute traffic.",
      },
    ],
    howItWorks: `
Every incoming request first reaches the load balancer instead of a
specific server directly. The load balancer picks a healthy server —
using a strategy like round robin, least-connections, or based on server
load — and forwards the request there. It also continuously checks server
health, and stops sending traffic to any server that's down.
    `.trim(),
    diagram: `
          ┌─────────────┐
Requests →│Load Balancer│
          └──────┬──────┘
        ┌────────┼────────┐
        ▼        ▼        ▼
    Server 1  Server 2  Server 3
    `.trim(),
    whyItExists: `
Without load balancing, scaling up would mean building one enormous
server — expensive, and still a single point of failure. Load balancing
lets you add ordinary servers as traffic grows, and keeps the system
running even if one individual server fails.
    `.trim(),
    commonMistakes: [
      "Treating the load balancer itself as unbreakable — it also needs redundancy, or it becomes a single point of failure.",
      "Ignoring 'sticky sessions' concerns when a user's data is only stored on the specific server that first handled them.",
      "Assuming load balancing alone solves scaling — the database or other shared resources behind it can still be the real bottleneck.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Explain, in your own words, why a single server isn't enough for a popular application." },
      { difficulty: "Medium", prompt: "Describe the difference between 'round robin' and 'least connections' as load balancing strategies." },
      { difficulty: "Hard", prompt: "Explain what could go wrong if a load balancer keeps sending traffic to a server that has crashed, and how health checks solve it." },
    ],
    interviewQuestions: [
      { question: "What problem does a load balancer solve?", answer: "It distributes incoming requests across multiple servers so no single server is overwhelmed, and traffic keeps flowing even if one server fails." },
      { question: "What is a health check in load balancing?", answer: "A periodic check the load balancer performs on each server to confirm it's still responsive, so it can stop routing traffic to unhealthy servers." },
      { question: "Can a load balancer itself be a single point of failure?", answer: "Yes — which is why production systems often run multiple load balancers with their own failover mechanism." },
    ],
    relatedTopics: ["scalability", "caching", "queues"],
    keywords: ["load balancer", "round robin", "health check", "scaling"],
  },
  {
    id: "queues",
    title: "Queues",
    level: "advanced",
    description: "Letting one part of a system hand off work to be done later, without waiting around for it.",
    explanation: `
Some tasks don't need to happen instantly while a user waits — sending a
confirmation email, resizing an uploaded image, generating a report. If a
server tried to do all of that immediately during the original request,
users would wait far longer than necessary. Instead, systems often use a
**message queue**: the server drops a description of the task into a
queue and responds to the user right away, while separate worker processes
pick up tasks from the queue and handle them in the background.
    `.trim(),
    analogy:
      "It's like dropping a form into an in-tray at an office instead of waiting at the counter until someone finishes processing it. You move on with your day; a clerk works through the tray in order, at their own pace.",
    examples: [
      {
        title: "Conceptual producer/consumer with a queue",
        code: `// Server (producer) — respond fast, queue the slow work
app.post("/signup", async (req, res) => {
  await createUser(req.body);
  await queue.push({ type: "welcome-email", userId: req.body.id });
  res.send("Signed up!"); // doesn't wait for the email to send
});

// Worker (consumer) — runs separately, processes queued jobs
queue.onMessage(async (job) => {
  if (job.type === "welcome-email") {
    await sendWelcomeEmail(job.userId);
  }
});`,
      },
    ],
    howItWorks: `
A **producer** (like a web server) adds messages describing work to the
queue. One or more **consumers** (worker processes) continuously check the
queue and process messages, often removing each one only after it's
successfully handled — so if a worker crashes mid-task, the message isn't
lost and can be retried.
    `.trim(),
    diagram: `
Producer → [ queue: job1, job2, job3 ] → Consumer(s) process jobs
    `.trim(),
    whyItExists: `
Queues decouple "accepting a request" from "doing the (possibly slow)
work," which keeps user-facing responses fast, smooths out sudden spikes
in traffic, and makes it easier to retry failed work without affecting the
original request.
    `.trim(),
    commonMistakes: [
      "Putting time-sensitive, user-facing work into a queue when the user actually needs to see the result immediately.",
      "Not handling failures — a worker that crashes mid-task should allow the message to be retried, not silently lost.",
      "Letting the queue grow unbounded without enough workers to keep up, causing delays to pile up.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "List three real tasks in a typical web app that are good candidates to run through a queue instead of immediately." },
      { difficulty: "Medium", prompt: "Explain, in your own words, why queues help a system handle sudden traffic spikes better." },
      { difficulty: "Hard", prompt: "Describe how you'd handle a job that fails repeatedly (e.g. a broken email address) so it doesn't get retried forever." },
    ],
    interviewQuestions: [
      { question: "What problem do message queues solve?", answer: "They let a system hand off slow or non-urgent work to be processed later, keeping the original request fast and smoothing out traffic spikes." },
      { question: "What are 'producers' and 'consumers' in a queue system?", answer: "Producers add messages/jobs to the queue; consumers (workers) read and process those messages, usually independently and in parallel." },
      { question: "Why are queues useful for reliability, not just speed?", answer: "Because a message can be safely retried if a worker fails partway through, instead of the work being lost entirely." },
    ],
    relatedTopics: ["load-balancing", "scalability"],
    keywords: ["message queue", "producer", "consumer", "worker", "async processing"],
  },
  {
    id: "cdn",
    title: "CDN",
    level: "advanced",
    description: "A network of servers around the world that deliver content from the location closest to each user.",
    explanation: `
The further data has to travel over the internet, the longer it takes to
arrive. If your only server is in one country, users on the other side of
the world will always experience a noticeable delay. A **CDN** (Content
Delivery Network) solves this by storing copies of your content — images,
videos, scripts, static files — on servers spread across many locations
worldwide, and serving each user from whichever copy is physically
closest to them.
    `.trim(),
    analogy:
      "It's like a chain of grocery stores instead of one giant warehouse. Rather than everyone driving across the country to the single warehouse, each town has a local store stocked with the same goods, so everyone gets what they need quickly.",
    examples: [
      {
        title: "Conceptual CDN request flow",
        code: `// Without a CDN:
// User in Tokyo → server in New York → slow round trip

// With a CDN:
// User in Tokyo → nearby CDN server in Tokyo (already has a copy) → fast`,
      },
    ],
    howItWorks: `
When content is published, it's copied ("cached") across many CDN
servers ("edge locations") around the world. When a user requests that
content, they're automatically routed to the nearest edge location, which
serves the cached copy directly — without needing to contact the original
server at all, unless the content is missing or has expired there.
    `.trim(),
    whyItExists: `
CDNs dramatically reduce load times for users far from the origin server,
and also reduce load on that origin server, since most requests are
served from edge locations instead. They're especially valuable for
content that doesn't change often, like images, videos, and static files.
    `.trim(),
    commonMistakes: [
      "Using a CDN for highly personalized, frequently-changing data that isn't a good fit for caching.",
      "Forgetting to invalidate CDN caches after updating content, so users keep seeing an old version.",
      "Assuming a CDN replaces the need for a fast origin server — it helps most with static content, not every kind of request.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Explain, in your own words, why a user in a different country might experience a slow-loading website without a CDN." },
      { difficulty: "Medium", prompt: "List which parts of a typical website (images, live account data, CSS files) are a good fit for a CDN, and which aren't." },
      { difficulty: "Hard", prompt: "Describe what could go wrong if you don't properly invalidate a CDN cache after deploying a new version of your website's images." },
    ],
    interviewQuestions: [
      { question: "What problem does a CDN solve?", answer: "It reduces the distance content has to travel by serving it from a location physically closer to each user, lowering latency and reducing load on the origin server." },
      { question: "What kind of content is best suited for a CDN?", answer: "Static, rarely-changing content like images, videos, stylesheets, and scripts — not highly personalized or constantly-changing data." },
      { question: "What is an 'edge location'?", answer: "One of many CDN servers distributed geographically, each holding cached copies of content to serve nearby users quickly." },
    ],
    relatedTopics: ["caching", "scalability"],
    keywords: ["CDN", "edge location", "latency", "static content"],
  },
  {
    id: "scalability",
    title: "Scalability",
    level: "advanced",
    description: "A system's ability to keep working well as usage grows — more users, more data, more requests.",
    explanation: `
A system that works fine with a hundred users might completely fail with
a million. **Scalability** is about designing a system so it can keep up
as demand grows, ideally by adding more resources rather than needing a
complete redesign.

There are two main strategies: **vertical scaling** (making a single
server more powerful — more CPU, more memory) and **horizontal scaling**
(adding more servers and spreading the work across them). Most large-scale
systems eventually lean on horizontal scaling, since there's always a
ceiling to how powerful one machine can get.
    `.trim(),
    analogy:
      "Vertical scaling is like hiring one super-employee who can work faster and faster. Horizontal scaling is like hiring more employees and splitting the work among them. At some point, no single employee — no matter how fast — can outpace hiring a team.",
    examples: [
      {
        title: "The idea, not literal code",
        code: `// Vertical scaling: same one server, upgraded hardware
// 4 CPU cores, 8GB RAM → 32 CPU cores, 256GB RAM

// Horizontal scaling: same modest servers, more of them
// 1 server → 10 servers, behind a load balancer`,
      },
    ],
    howItWorks: `
Scalable systems are usually designed so that individual pieces (servers,
in particular) don't hold irreplaceable state that only they know about —
so any of them can handle any request, and more can be added freely. This
often relies on other concepts working together: load balancers to
distribute traffic, caches to reduce repeated work, and databases designed
to handle growing data volumes.
    `.trim(),
    whyItExists: `
User growth is often the whole point of building a successful product —
but a system that can't scale becomes slow, unreliable, or simply falls
over exactly when it matters most: when it's finally popular. Designing
for scalability from the start avoids painful, risky rewrites later.
    `.trim(),
    commonMistakes: [
      "Only ever scaling vertically, until hitting the hard ceiling of the most powerful single machine available.",
      "Storing important state on an individual server (like data in memory) that horizontal scaling then breaks, since other servers don't have access to it.",
      "Over-engineering for a scale the product doesn't remotely need yet, adding needless complexity too early.",
    ],
    exercises: [
      { difficulty: "Easy", prompt: "Explain, in your own words, the difference between vertical and horizontal scaling." },
      { difficulty: "Medium", prompt: "Describe a design decision that would make horizontal scaling harder, and how you'd avoid it." },
      { difficulty: "Hard", prompt: "Sketch (in words) how load balancing, caching, and a scalable database work together to let a system handle 100x more users." },
    ],
    interviewQuestions: [
      { question: "What's the difference between vertical and horizontal scaling?", answer: "Vertical scaling adds more power to a single machine; horizontal scaling adds more machines and spreads the work across them." },
      { question: "Why do most large systems eventually favor horizontal scaling?", answer: "Because there's a physical and cost ceiling to how powerful a single machine can become, while adding more machines can, in principle, continue indefinitely." },
      { question: "Why is storing state only on one server a scalability problem?", answer: "Because other servers can't see that state, so requests must always be routed back to that specific server — breaking the flexibility that horizontal scaling relies on." },
    ],
    relatedTopics: ["load-balancing", "caching", "databases"],
    keywords: ["scalability", "vertical scaling", "horizontal scaling", "stateless"],
  },
];
