import { test, expect, vi, afterEach, beforeEach } from "vitest";
import flushPromises from "flush-promises";
import { useStableSpin } from "./useStableSpin.js";
import { ref } from "vue";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

test("does not show the spinner when the request finishes before the delay", async () => {
  // ARRANGE
  const options = {
    delay: 100,
    minDuration: 100,
  };

  const isLoading = ref(false);
  const hook = useStableSpin(isLoading, options);

  // ACT
  // Start network request
  isLoading.value = true;
  await flushPromises();

  // Finish network request
  vi.advanceTimersByTime(50);
  await flushPromises();

  isLoading.value = false;
  await flushPromises();

  // ASSERT
  expect(hook.value).toBe(false);
});

test("shows the spinner when the request takes longer than the delay", async () => {
  // ARRANGE
  const options = {
    delay: 100,
    minDuration: 100,
  };

  const isLoading = ref(false);
  const hook = useStableSpin(isLoading, options);

  // ACT
  // Start the network request
  isLoading.value = true;
  await flushPromises();

  vi.advanceTimersByTime(100);
  await flushPromises();

  // ASSERT
  expect(hook.value).toBe(true);
});

test("shows the spinner when the request finishes before the minimum duration", async () => {
  // ACT
  const options = {
    delay: 100,
    minDuration: 100,
  };

  const isLoading = ref(false);
  const hook = useStableSpin(isLoading, options);

  // Start the network request
  isLoading.value = true;
  await flushPromises();

  // Finish the network request
  vi.advanceTimersByTime(150);
  await flushPromises();

  isLoading.value = false;
  await flushPromises();

  // ASSERT
  expect(hook.value).toBe(true);
});

test("does not show a spinner when the request finishes after the minimum duration", async () => {
  // ARRANGE
  const options = {
    delay: 100,
    minDuration: 100,
  };

  const isLoading = ref(false);
  const hook = useStableSpin(isLoading, options);

  // ACT
  // Start the network request
  isLoading.value = true;
  await flushPromises();

  // Finish the network request
  vi.advanceTimersByTime(200);
  await flushPromises();

  isLoading.value = false;
  await flushPromises();

  // ASSERT
  expect(hook.value).toBe(false);
});

test("shows a spinner when the request takes longer than the minimum duration", async () => {
  // ARRANGE
  const options = {
    delay: 100,
    minDuration: 100,
  };

  const isLoading = ref(false);
  const hook = useStableSpin(isLoading, options);

  // ACT
  // Start the network request
  isLoading.value = true;
  await flushPromises();

  vi.advanceTimersByTime(250);
  await flushPromises();

  // ASSERT
  expect(hook.value).toBe(true);
});

test("it is possible to customise the delay", async () => {
  // ARRANGE
  const options = { delay: 200 };

  const isLoading = ref(false);
  const hook = useStableSpin(isLoading, options);

  // ACT
  // Start network request
  isLoading.value = true;
  await flushPromises();

  vi.advanceTimersByTime(150);
  await flushPromises();

  // ASSERT
  expect(hook.value).toBe(false);

  // ACT
  vi.advanceTimersByTime(50);
  await flushPromises();

  // ASSERT
  expect(hook.value).toBe(true);
});

test("it is possible to customise the minimum duration", async () => {
  // ARRANGE
  const options = { minDuration: 200 };

  const isLoading = ref(false);
  const hook = useStableSpin(isLoading, options);

  // ACT
  // Start network request
  isLoading.value = true;
  await flushPromises();

  vi.advanceTimersByTime(250);
  await flushPromises();

  isLoading.value = false;
  await flushPromises();

  // ASSERT
  expect(hook.value).toBe(true);

  // ACT
  vi.advanceTimersByTime(50);
  await flushPromises();

  // ASSERT
  expect(hook.value).toBe(false);
});
