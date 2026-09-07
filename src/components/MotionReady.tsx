"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import {
  LOADER_DONE_EVENT,
  LOADER_STORAGE_KEY,
} from "@/lib/session-loader";

export { LOADER_DONE_EVENT, LOADER_STORAGE_KEY };

const MotionReadyContext = createContext(true);

/**
 * Becomes true only after the session loader has finished (or was skipped).
 * ImageReveal waits on this so the wipe does not play under the loader and
 * look like a pop when the overlay lifts.
 */
export function MotionReadyProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduce) {
      setReady(true);
      return;
    }

    try {
      if (sessionStorage.getItem(LOADER_STORAGE_KEY)) {
        // Next frame so clipped ImageReveal state can paint before arming.
        const id = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(id);
      }
    } catch {
      setReady(true);
      return;
    }

    const onDone = () => setReady(true);
    window.addEventListener(LOADER_DONE_EVENT, onDone);
    return () => window.removeEventListener(LOADER_DONE_EVENT, onDone);
  }, [reduce]);

  const value = useMemo(() => ready, [ready]);

  return (
    <MotionReadyContext.Provider value={value}>
      {children}
    </MotionReadyContext.Provider>
  );
}

export function useMotionReady() {
  return useContext(MotionReadyContext);
}

export function signalLoaderDone() {
  try {
    sessionStorage.setItem(LOADER_STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
  document.documentElement.setAttribute("data-loader", "done");
  window.dispatchEvent(new Event(LOADER_DONE_EVENT));
}
