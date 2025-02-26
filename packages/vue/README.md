# @stable-spin/vue

A Vue composable to display spinners in user friendly way.

## Highlights

- Prevents the flickering of loading spinners
- Works with React, Vue, Svelte and Angular
- Easy to use API

## Overview

Sometimes, network requests are too fast. The user clicks on a button, the loading spinner is visible for just 50-100ms, you've got a flickering loading spinner. This is a bad user experience.

To solve the issue we do not show the loading spinner if the request finishes in under 100ms. If the request takes longer than 100ms we display a spinner for at least 200ms. If we don't do that and the request finishes after 150ms, we'll have the flickering spinner again. That's why we show it for at least 200ms.

There are also other packages for [React](https://www.github.com/haberkamp/stable-spin/tree/main/packages/react), Svelte and Angular.

### Author

Hey, I'm Nils. In my spare time [I write about things](https://www.haberkamp.dev/) I learned or I create open source packages, that help me (and hopefully you) to build better apps.

## Usage

```vue
<template>
  <span v-if="showSpinner">Loading...</span>

  <div v-else>
    <!-- Your content -->
  </div>
</template>

<script setup lang="ts">
import { useStableSpin } from "@stable-spin/vue";

const isLoading = ref(false);
const showSpinner = useStableSpin(isLoading);

onMount(() => {
  isLoading.value = true;

  fetch("https://my-endpoint.com")
    .then((res) => res.json())
    .then((res) => (isLoading.value = false));
});
</script>
```

## Installation

You can install the package just with your favorite package manager like: npm, yarn, or pnpm.

Using npm:

```bash
npm install @stable-spin/vue
```

Using yarn:

```bash
yarn add @stable-spin/vue
```

Using pnpm:

```bash
pnpm i @stable-spin/vue
```

## Feedback and Contributing

I highly appreceate your feedback! Please create an [issue](https://github.com/Haberkamp/stable-spin/issues/new), if you've found any bugs or want to request a feature.
