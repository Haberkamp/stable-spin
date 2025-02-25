import { computed, ref, watch, type Ref } from "vue";

export const DEFAULT_DELAY = 100;
export const DEFAULT_MIN_DURATION = 100;

const DEFAULT_OPTIONS = {
  delay: DEFAULT_DELAY,
  minDuration: DEFAULT_MIN_DURATION,
};

export function useStableSpin(
  isLoading: Ref<boolean>,
  options?: Partial<typeof DEFAULT_OPTIONS>
) {
  // TODO: add SSR support
  const config = Object.assign({}, DEFAULT_OPTIONS, options);

  const state = ref<"idle" | "delay" | "show" | "expired">("idle");
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

  watch([isLoading, state], () => {
    if (isLoading.value && state.value === "idle") {
      if (timeout.value) clearTimeout(timeout.value);
      state.value = "delay";

      timeout.value = setTimeout(() => {
        state.value = "show";

        timeout.value = setTimeout(() => {
          state.value = "expired";
        }, config.minDuration);
      }, config.delay);
    }

    if (!isLoading.value && state.value !== "show") {
      state.value = "idle";
    }
  });

  const showSpinner = computed(() => ["show", "expired"].includes(state.value));

  // TODO: clear timout when unmounting the component

  return showSpinner;
}
