import { useEffect, useRef, useState } from "react";

export const DEFAULT_DELAY = 100;
export const DEFAULT_MIN_DURATION = 400;

const DEFAULT_OPTIONS = {
  delay: DEFAULT_DELAY,
  minDuration: DEFAULT_MIN_DURATION,
  isSSR: false,
};

function useIsSSR() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return isSSR;
}

export function useStableSpin(
  isLoading: boolean,
  options?: Partial<typeof DEFAULT_OPTIONS>
) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);

  const isSSR = useIsSSR() && config.isSSR;

  const [state, setState] = useState<"idle" | "delay" | "show" | "expired">(
    isSSR && isLoading ? "show" : "idle"
  );

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading && (state === "idle" || isSSR)) {
      if (timeout.current) clearTimeout(timeout.current);
      if (!isSSR) setState("delay");

      const delay = isSSR ? 0 : config.delay;
      timeout.current = setTimeout(() => {
        setState("show");

        timeout.current = setTimeout(() => {
          setState("expired");
        }, config.minDuration);
      }, delay);
    }

    if (!isLoading && state !== "show") {
      if (timeout.current) clearTimeout(timeout.current);
      setState("idle");
    }
  }, [isLoading, state, config.delay, config.minDuration]);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return ["show", "expired"].includes(state);
}
