import { useEffect, useRef, useState } from "react";

export function useStableSpin(isLoading: boolean) {
  const [state, setState] = useState<"idle" | "invisible" | "visible">("idle");

  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      setState("invisible");

      timeout.current = setTimeout(() => {
        setState("visible");

        timeout.current = setTimeout(() => {
          setState("idle");
        }, 100);
      }, 100);
    }
  }, [isLoading]);

  return state === "visible";
}
