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
  const options = {
    delay: 100,
    minDuration: 100,
  };

  const hook = renderHook(
    ({ isLoading, options }) => useStableSpin(isLoading, options),
    {
      initialProps: {
        isLoading: false,
        options,
      },
    }
  );

  // ACT
  // Start network request
  hook.rerender({ isLoading: true, options });

  // Finish network request
  act(() => {
    vi.advanceTimersByTime(50);
    hook.rerender({ isLoading: false, options });
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
  const options = {
    delay: 100,
    minDuration: 100,
  };

  const hook = renderHook(
    ({ isLoading, options }) => useStableSpin(isLoading, options),
    {
      initialProps: {
        isLoading: false,
        options,
      },
    }
  );

  // ACT
  // Start network request
  hook.rerender({ isLoading: true, options });

  act(() => {
    // Finish network request
    vi.advanceTimersByTime(150);
    hook.rerender({ isLoading: false, options });
  });

  // ASSERT
  expect(hook.result.current).toBe(true);
});

test("does not show a spinner when the request finishes after the minimum duration", () => {
  // ARRAGE
  const options = {
    delay: 100,
    minDuration: 100,
  };

  const hook = renderHook(
    ({ isLoading, options }) => useStableSpin(isLoading, options),
    {
      initialProps: {
        isLoading: false,
        options,
      },
    }
  );

  // ACT
  // Start network request
  hook.rerender({ isLoading: true, options });

  act(() => {
    // Finish network request
    vi.advanceTimersByTime(200);
    hook.rerender({ isLoading: false, options });
  });

  // ASSERT
  expect(hook.result.current).toBe(false);
});

test("shows a spinner when the request takes longer than the minimum duration", () => {
  // ARRAGE
  const options = {
    delay: 100,
    minDuration: 100,
  };

  const hook = renderHook(
    ({ isLoading, options }) => useStableSpin(isLoading, options),
    {
      initialProps: {
        isLoading: false,
        options,
      },
    }
  );

  // ACT
  // Start network request
  hook.rerender({ isLoading: true, options });

  act(() => {
    vi.advanceTimersByTime(250);
  });

  // ASSERT
  expect(hook.result.current).toBe(true);
});
