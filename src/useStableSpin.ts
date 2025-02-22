import { useEffect, useRef, useState } from "react";

const DEFAULT_OPTIONS = {
  delay: 100,
  minDuration: 400,
};

export function useStableSpin(
  isLoading: boolean,
  options?: Partial<typeof DEFAULT_OPTIONS>
) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  const [state, setState] = useState<"idle" | "delay" | "show" | "expired">(
    "idle"
  );

  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading && state === "idle") {
      if (timeout.current) clearTimeout(timeout.current);
      setState("delay");

      timeout.current = setTimeout(() => {
        setState("show");

        timeout.current = setTimeout(() => {
          setState("expired");
        }, config.minDuration);
      }, config.delay);
    }

    if (!isLoading && state !== "show") {
      if (timeout.current) clearTimeout(timeout.current);
      setState("idle");
    }
  }, [isLoading, state]);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return ["show", "expired"].includes(state);
}
