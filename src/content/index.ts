import type { Subject, SubjectId, Topic } from "../types/content";
import { javascriptSubject } from "./javascript";
import { dsaSubject } from "./dsa";
import { systemDesignSubject } from "./system-design";

export const subjects: Subject[] = [
  javascriptSubject,
  dsaSubject,
  systemDesignSubject,
];

const subjectsById: Record<SubjectId, Subject> = {
  javascript: javascriptSubject,
  dsa: dsaSubject,
  "system-design": systemDesignSubject,
};

export function getSubject(id: string): Subject | undefined {
  return subjectsById[id as SubjectId];
}

export function getTopic(subjectId: string, topicId: string): Topic | undefined {
  return getSubject(subjectId)?.topics.find((t) => t.id === topicId);
}

/** Find a topic across all subjects by id (used for related-topics links). */
export function findTopicAnywhere(
  topicId: string,
): { subject: Subject; topic: Topic } | undefined {
  for (const subject of subjects) {
    const topic = subject.topics.find((t) => t.id === topicId);
    if (topic) return { subject, topic };
  }
  return undefined;
}

export { javascriptSubject, dsaSubject, systemDesignSubject };
