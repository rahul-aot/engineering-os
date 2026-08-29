import { useCallback, useSyncExternalStore } from "react";
import { BOOKMARKS_STORAGE_KEY } from "../types/progress";

export interface BookmarkEntry {
  subjectId: string;
  topicId: string;
}

function readBookmarks(): BookmarkEntry[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BookmarkEntry[]) : [];
  } catch {
    return [];
  }
}

let bookmarksState: BookmarkEntry[] = readBookmarks();
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return bookmarksState;
}

function persist(next: BookmarkEntry[]) {
  bookmarksState = next;
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  notify();
}

/** Bookmarked topics, persisted in localStorage and shared app-wide. */
export function useBookmarks() {
  const bookmarks = useSyncExternalStore(subscribe, getSnapshot);

  const isBookmarked = useCallback(
    (topicId: string) => bookmarks.some((b) => b.topicId === topicId),
    [bookmarks],
  );

  const toggleBookmark = useCallback((subjectId: string, topicId: string) => {
    const exists = bookmarksState.some((b) => b.topicId === topicId);
    if (exists) {
      persist(bookmarksState.filter((b) => b.topicId !== topicId));
    } else {
      persist([...bookmarksState, { subjectId, topicId }]);
    }
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark };
}
