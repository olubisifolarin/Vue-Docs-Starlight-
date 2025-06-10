---
title: Using Vue with TypeScript
description: 
---

A type system like TypeScript can detect many common errors via static analysis at build time. This reduces the chance of runtime errors in production, and also allows us to more confidently refactor code in large-scale applications. TypeScript also improves developer ergonomics via type-based auto-completion in IDEs.

Vue is written in TypeScript itself and provides first-class TypeScript support. All official Vue packages come with bundled type declarations that should work out-of-the-box.

### Project Setup​
'create-vue', the official project scaffolding tool, offers the options to scaffold a [Vite](https://vite.dev/)-powered, TypeScript-ready Vue project.

#### Overview​
With a Vite-based setup, the dev server and the bundler are transpilation-only and do not perform any type-checking. This ensures the Vite dev server stays blazing fast even when using TypeScript.

During development, we recommend relying on a good IDE setup for instant feedback on type errors.

If using SFCs, use the vue-tsc utility for command line type checking and type declaration generation. vue-tsc is a wrapper around tsc, TypeScript's own command line interface. It works largely the same as tsc except that it supports Vue SFCs in addition to TypeScript files. You can run vue-tsc in watch mode in parallel to the Vite dev server, or use a Vite plugin like vite-plugin-checker which runs the checks in a separate worker thread.

Vue CLI also provides TypeScript support, but is no longer recommended. See notes below.