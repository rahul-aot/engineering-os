import { useMemo } from "react";
import { subjects } from "../content";
import type { Subject, Topic } from "../types/content";

export interface SearchResult {
  subject: Subject;
  topic: Topic;
}

interface SearchableEntry extends SearchResult {
  haystack: string;
}

function buildIndex(): SearchableEntry[] {
  return subjects.flatMap((subject) =>
    subject.topics.map((topic) => ({
      subject,
      topic,
      haystack: [
        topic.title,
        topic.description,
        topic.explanation,
        ...(topic.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase(),
    })),
  );
}

// Built once per module load — the content set is static, so there's no
// need to rebuild this on every render or every keystroke.
const searchIndex = buildIndex();

/** Simple client-side search over topic titles, descriptions, and keywords. */
export function searchTopics(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return searchIndex
    .filter((entry) => entry.haystack.includes(q))
    .map(({ subject, topic }) => ({ subject, topic }))
    .slice(0, 20);
}

/** Hook form, memoizing results as the query changes. */
export function useSearch(query: string): SearchResult[] {
  return useMemo(() => searchTopics(query), [query]);
}
