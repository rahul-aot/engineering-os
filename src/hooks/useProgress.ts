import { useCallback, useSyncExternalStore } from "react";
import type { ProgressStatus } from "../types/content";
import {
  PROGRESS_STORAGE_KEY,
  RECENT_TOPICS_STORAGE_KEY,
  type ProgressMap,
  type RecentTopicEntry,
} from "../types/progress";

// A tiny external store for progress, shared across every component that
// calls useProgress(). Using useSyncExternalStore (rather than local
// component state) means a "mark as completed" click on the Topic page is
// instantly reflected in the Sidebar, Subject page, and Home page too.

function readProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

let progressState: ProgressMap = readProgress();
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return progressState;
}

function persist(next: ProgressMap) {
  progressState = next;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage may be unavailable (private mode, quota) — state still
    // updates in-memory for this session even if it can't be saved.
  }
  notify();
}

function readRecent(): RecentTopicEntry[] {
  try {
    const raw = localStorage.getItem(RECENT_TOPICS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentTopicEntry[]) : [];
  } catch {
    return [];
  }
}

function writeRecent(entries: RecentTopicEntry[]) {
  try {
    localStorage.setItem(RECENT_TOPICS_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // ignore
  }
}

/**
 * Reads and updates per-topic progress, persisted in localStorage and
 * shared across every component in the app.
 */
export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot);

  const getStatus = useCallback(
    (topicId: string): ProgressStatus => progress[topicId] ?? "not-started",
    [progress],
  );

  const setStatus = useCallback((topicId: string, status: ProgressStatus) => {
    persist({ ...progressState, [topicId]: status });
  }, []);

  const markCompleted = useCallback(
    (topicId: string) => setStatus(topicId, "completed"),
    [setStatus],
  );

  const recordVisit = useCallback((subjectId: string, topicId: string) => {
    // Visiting a topic that hasn't been started yet moves it to "learning".
    if (!progressState[topicId]) {
      persist({ ...progressState, [topicId]: "learning" });
    }

    const entries = readRecent().filter(
      (e) => !(e.subjectId === subjectId && e.topicId === topicId),
    );
    entries.unshift({ subjectId, topicId, visitedAt: Date.now() });
    writeRecent(entries.slice(0, 10));
  }, []);

  const getRecent = useCallback((limit = 3) => readRecent().slice(0, limit), []);

  const getSubjectCompletion = useCallback(
    (topicIds: string[]) => {
      if (topicIds.length === 0) return 0;
      const done = topicIds.filter((id) => progress[id] === "completed").length;
      return Math.round((done / topicIds.length) * 100);
    },
    [progress],
  );

  return {
    progress,
    getStatus,
    setStatus,
    markCompleted,
    recordVisit,
    getRecent,
    getSubjectCompletion,
  };
}
