import { useEffect, useRef, useState } from "react";

export function useStableSpin(isLoading: boolean) {
  const [showSpinner, setShowSpinner] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      timeout.current = setTimeout(() => {
        setShowSpinner(true);
      }, 100);
    }
  }, [isLoading]);

  return showSpinner;
}
