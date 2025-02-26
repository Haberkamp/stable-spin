import { computed, onMounted, ref, watch, type Ref } from "vue";

export const DEFAULT_DELAY = 100;
export const DEFAULT_MIN_DURATION = 100;

const DEFAULT_OPTIONS = {
  delay: DEFAULT_DELAY,
  minDuration: DEFAULT_MIN_DURATION,
  isSSR: false,
};

function useIsSSR() {
  const isSSR = ref(true);

  onMounted(() => {
    isSSR.value = false;
  });

  return isSSR;
}

export function useStableSpin(
  isLoading: Ref<boolean>,
  options?: Partial<typeof DEFAULT_OPTIONS>
) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);

  const _isSSR = useIsSSR();
  const isSSR = _isSSR && config.isSSR;

  const state = ref<"idle" | "delay" | "show" | "expired">(
    isSSR && isLoading ? "show" : "idle"
  );

  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

  watch(
    [isLoading, state],
    () => {
      if (isLoading.value && (state.value === "idle" || isSSR)) {
        if (timeout.value) clearTimeout(timeout.value);
        if (!isSSR) state.value = "delay";

        const delay = isSSR ? 0 : config.delay;
        timeout.value = setTimeout(() => {
          state.value = "show";

          timeout.value = setTimeout(() => {
            state.value = "expired";
          }, config.minDuration);
        }, delay);
      }

      if (!isLoading.value && state.value !== "show") {
        if (timeout.value) clearTimeout(timeout.value);
        state.value = "idle";
      }
    },
    { immediate: true }
  );

  const showSpinner = computed(() => ["show", "expired"].includes(state.value));

  // TODO: clear timout when unmounting the component

  return showSpinner;
}
