import { useEffect, useRef, useState } from "react";

export function useStableSpin(isLoading: boolean) {
  const [state, setState] = useState<
    "idle" | "invisible" | "visible" | "expired"
  >("idle");

  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading && state === "idle") {
      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        if (!isLoading) {
          return setState("idle");
        }

        timeout.current = setTimeout(() => {
          setState("expired");
        }, 100);

        setState("visible");
      }, 100);
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
