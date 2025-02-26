<template>
  <span v-if="showSpinner">Loading...</span>

  <span v-else>Display data</span>
</template>

<script setup lang="ts">
import { useStableSpin } from "@stable-spin/vue";

const isLoading = ref(true);
const showSpinner = useStableSpin(isLoading, { isSSR: true });
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

onMounted(() => {
  timeout.value = setTimeout(() => {
    isLoading.value = false;
  }, 2_000);
});

onUnmounted(() => {
  if (timeout.value) clearTimeout(timeout.value);
});
</script>
