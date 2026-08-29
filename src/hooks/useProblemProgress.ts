import { useCallback, useSyncExternalStore } from "react";

// Tracks solved DSA problems, kept separate from topic progress
// (useProgress.ts) since problems and topics are different content types
// with their own id spaces.

const STORAGE_KEY = "engineering-os:problem-progress";

function readSolved(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

let solvedState: Record<string, boolean> = readSolved();
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return solvedState;
}

function persist(next: Record<string, boolean>) {
  solvedState = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage may be unavailable — state still updates in-memory.
  }
  notify();
}

/** Which DSA problems have been marked solved, persisted in localStorage and shared app-wide. */
export function useProblemProgress() {
  const solved = useSyncExternalStore(subscribe, getSnapshot);

  const isSolved = useCallback((problemId: string) => Boolean(solved[problemId]), [solved]);

  const toggleSolved = useCallback((problemId: string) => {
    const next = { ...solvedState, [problemId]: !solvedState[problemId] };
    persist(next);
  }, []);

  const getCategorySolvedCount = useCallback(
    (problemIds: string[]) => problemIds.filter((id) => solved[id]).length,
    [solved],
  );

  return { solved, isSolved, toggleSolved, getCategorySolvedCount };
}
