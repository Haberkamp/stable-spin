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

test("shows the spinner when the request takes longer than the delay", () => {
  // ARRAGE
  const hook = renderHook(useStableSpin, {
    initialProps: false,
  });

  // ACT
  // Start network request
  hook.rerender(true);

  act(() => {
    vi.advanceTimersByTime(100);
  });

  // ASSERT
  expect(hook.result.current).toBe(true);
});

test("shows the spinner even when the request finishe before the minimum duration", () => {
  // ARRAGE
  const hook = renderHook(useStableSpin, {
    initialProps: false,
  });

  // ACT
  // Start network request
  hook.rerender(true);

  act(() => {
    // Finish network request
    vi.advanceTimersByTime(150);
    hook.rerender(false);
  });

  // ASSERT
  expect(hook.result.current).toBe(true);
});

test("does not show a spinner when the request finishes after the minimum duration", () => {
  // ARRAGE
  const hook = renderHook(useStableSpin, {
    initialProps: false,
  });

  // ACT
  // Start network request
  hook.rerender(true);

  act(() => {
    // Finish network request
    vi.advanceTimersByTime(200);
    hook.rerender(false);
  });

  // ASSERT
  expect(hook.result.current).toBe(false);
});
