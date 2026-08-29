import type { ProgressStatus } from "./content";

/** Map of topic id -> progress status, persisted in localStorage. */
export type ProgressMap = Record<string, ProgressStatus>;

export const PROGRESS_STORAGE_KEY = "engineering-os:progress";
export const BOOKMARKS_STORAGE_KEY = "engineering-os:bookmarks";
export const RECENT_TOPICS_STORAGE_KEY = "engineering-os:recent-topics";

export interface RecentTopicEntry {
  subjectId: string;
  topicId: string;
  visitedAt: number;
}
