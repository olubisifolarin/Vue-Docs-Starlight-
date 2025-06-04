---
title: Tooling
description: Tooling
---

### Try It Online​
You don't need to install anything on your machine to try out Vue SFCs - there are online playgrounds that allow you to do so right in the browser:

- <a href="https://play.vuejs.org/" target="_blank" style="display: inline-flex; align-items: center; text-decoration: none; font-weight: bolder; color: blue;">
  ▶️ Vue SFC Playground.
</a>

    - Always deployed from latest commit
    - Designed for inspecting component compilation results


- [Vue + Vite on StackBlitz](https://stackblitz.com/edit/vitejs-vite-pxsnfk7c?file=index.html&terminal=dev)
    - IDE-like environment running actual Vite dev server in the browser
    - Closest to local setup
It is also recommended to use these online playgrounds to provide reproductions when reporting bugs.

### Project Scaffolding​
#### Vite​

[Vite](https://vite.dev/) is a lightweight and fast build tool with first-class Vue SFC support. It is created by Evan You, who is also the author of Vue!

To get started with Vite + Vue, simply run:

```
npm create vue@latest
```

This command will install and execute [create-vue](https://github.com/vuejs/create-vue), the official Vue project scaffolding tool.

- To learn more about Vite, check out the Vite docs.
- To configure Vue-specific behavior in a Vite project, for example passing options to the Vue compiler, check out the docs for [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme).
Both online playgrounds mentioned above also support downloading files as a Vite project.

#### Vue CLI​
[Vue CLI](https://cli.vuejs.org/) is the official webpack-based toolchain for Vue. It is now in maintenance mode and we recommend starting new projects with Vite unless you rely on specific webpack-only features. Vite will provide superior developer experience in most cases.

For information on migrating from Vue CLI to Vite:

- [Vue CLI-> Vite Migration Guide from VueSchool.io](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Tools / Plugins that help with auto migration](https://github.com/vitejs/awesome-vite#vue-cli)

#### Note on In-Browser Template Compilation​
When using Vue without a build step, component templates are written either directly in the page's HTML or as inlined JavaScript strings. In such cases, Vue needs to ship the template compiler to the browser in order to perform on-the-fly template compilation. On the other hand, the compiler would be unnecessary if we pre-compile the templates with a build step. To reduce client bundle size, Vue provides **different "builds"** optimized for different use cases.

Build files that start with `vue.runtime.*` are runtime-only builds: they do not include the compiler. When using these builds, all templates must be pre-compiled via a build step.

Build files that do not include `.runtime` are full builds: they include the compiler and support compiling templates directly in the browser. However, they will increase the payload by ~14kb.

Our default tooling setups use the runtime-only build since all templates in SFCs are pre-compiled. If, for some reason, you need in-browser template compilation even with a build step, you can do so by configuring the build tool to alias `vue` to `vue/dist/vue.esm-bundler.js` instead.

If you are looking for a lighter-weight alternative for no-build-step usage, check out petite-vue.

### IDE Support​
- The recommended IDE setup is [VS Code](https://code.visualstudio.com/) + [the Vue - Official extension (previously Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar). The extension provides syntax highlighting, TypeScript support, and intellisense for template expressions and component props.

:::tip[TIP]
Vue - Official replaces Vetur, our previous official VS Code extension for Vue 2. If you have Vetur currently installed, make sure to disable it in Vue 3 projects.
:::

- WebStorm also provides great built-in support for Vue SFCs.

- Other IDEs that support the Language Service Protocol (LSP) can also leverage Volar's core functionalities via LSP:

  - Sublime Text support via LSP-Volar.

  - vim / Neovim support via coc-volar.

  - emacs support via lsp-mode

### Browser Devtools​
The Vue browser devtools extension allows you to explore a Vue app's component tree, inspect the state of individual components, track state management events, and profile performance.

TypeScript​
Main article: Using Vue with TypeScript.

Vue - Official extension provides type checking for SFCs using <script lang="ts"> blocks, including template expressions and cross-component props validation.

Use vue-tsc for performing the same type checking from the command line, or for generating d.ts files for SFCs.

Testing