// Core content types for the Engineering OS knowledge base.
// All learning content (JavaScript, DSA, System Design) is described
// using these shapes, so pages/components never hardcode subject content.

export type SubjectId = "javascript" | "dsa" | "system-design";

export type TopicLevel = "beginner" | "intermediate" | "advanced";

export type ProgressStatus =
  | "not-started"
  | "learning"
  | "completed"
  | "needs-review";

export interface CodeExample {
  /** Optional short caption shown above the code block. */
  title?: string;
  code: string;
  language?: string;
  /** Optional explanation shown below the code. */
  explanation?: string;
}

export interface Exercise {
  difficulty: "Easy" | "Medium" | "Hard";
  prompt: string;
}

export interface InterviewQuestion {
  question: string;
  answer: string;
}

export interface Topic {
  id: string;
  title: string;
  level: TopicLevel;
  /** One-line summary used in topic lists and search. */
  description: string;
  /** Section 1: What is it? Plain language, assumes no prior knowledge. */
  explanation: string;
  /** Section 2: Explain Like I'm 10 — a short real-world analogy. */
  analogy: string;
  /** Section 3: Simple, beginner-friendly code example(s). */
  examples: CodeExample[];
  /** Section 4: How It Works — internals, optionally with a text diagram. */
  howItWorks: string;
  /** Optional plain-text diagram rendered in a monospace block. */
  diagram?: string;
  /** Section 5: Why Does This Exist? */
  whyItExists: string;
  /** Section 6: Common beginner mistakes. */
  commonMistakes: string[];
  /** Section 7: Practice exercises. */
  exercises: Exercise[];
  /** Section 8: Interview questions, shown collapsed. */
  interviewQuestions: InterviewQuestion[];
  /** Section 9: Related topic ids (within the same subject unless prefixed). */
  relatedTopics: string[];
  /** Extra searchable keywords beyond the title/description. */
  keywords?: string[];
}

export interface Subject {
  id: SubjectId;
  title: string;
  description: string;
  topics: Topic[];
}
