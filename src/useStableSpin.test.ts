import { test, expect, beforeAll, vi, afterAll } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useStableSpin } from "./useStableSpin.js";

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

test("does not show the spinner when the request finishes before the delay", () => {
  // ARRAGE
  const hook = renderHook(useStableSpin, {
    initialProps: false,
  });

  // ACT
  // Start network request
  hook.rerender(true);

  // Finish network request
  act(() => {
    vi.advanceTimersByTime(50);
    hook.rerender(true);
  });

  // ASSERT
  expect(hook.result.current).toBe(false);
});
