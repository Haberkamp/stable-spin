"use client";

import { useEffect, useRef, useState } from "react";
import { useStableSpin } from "stable-spin";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const showSpinner = useStableSpin(loading, { isSSR: true });
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setLoading(false);
    }, 2_000);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  if (showSpinner) {
    return <span>Loading...</span>;
  }

  return <span>Display data</span>;
}
