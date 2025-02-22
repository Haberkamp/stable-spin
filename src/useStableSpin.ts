import { useState } from "react";

export function useStableSpin(isLoading: boolean) {
  const [showSpinner] = useState(false);

  return showSpinner;
}
