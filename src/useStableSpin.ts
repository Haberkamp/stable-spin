import { useEffect, useRef, useState } from "react";

export function useStableSpin(
  isLoading: boolean,
  options: { delay: number; minDuration: number } = {
    delay: 100,
    minDuration: 400,
  }
) {
  const [state, setState] = useState<
    "idle" | "invisible" | "visible" | "expired"
  >("idle");

  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading && state === "idle") {
      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setState("visible");

        timeout.current = setTimeout(() => {
          setState("expired");
        }, options.minDuration);
      }, options.delay);
    }

    if (!isLoading && state !== "visible") {
      if (timeout.current) clearTimeout(timeout.current);
      setState("idle");
    }
  }, [isLoading, state]);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return ["visible", "expired"].includes(state);
}
