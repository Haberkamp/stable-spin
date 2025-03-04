# stable-spin

A framework agnostic helper to display spinners.

## Highlights

- Prevents the flickering of loading spinners
- Works with React, Vue, Svelte and Angular
- Easy to use API

## Overview

Sometimes, network requests are too fast. The user clicks on a button, the loading spinner is visible for just 50-100ms, you've got a flickering loading spinner. This is a bad user experience.

To solve the issue we do not show the loading spinner if the request finishes in under 100ms. If the request takes longer than 100ms we display a spinner for at least 200ms. If we don't do that and the request finishes after 150ms, we'll have the flickering spinner again. That's why we show it for at least 200ms.

There already exist a popular [package for React](https://github.com/smeijer/spin-delay). But, I decided to create my own package, to support other frameworks like Vue, Svelte and Angular.

### Author

Hey, I'm Nils. In my spare time [I write about things](https://www.haberkamp.dev/) I learned or I create open source packages, that help me (and hopefully you) to build better apps.

## Installation

The installation process differs slighty for each package. For a full guide see:

- [React installation guide](./packages/react/)
- [Vue installation guide](./packages/vue)

## Feedback and Contributing

I highly appreceate your feedback! Please create an [issue](https://github.com/Haberkamp/stable-spin/issues/new), if you've found any bugs or want to request a feature.
