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