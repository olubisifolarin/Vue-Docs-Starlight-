---
title: Quick Start
description: A quick start in my new Starlight docs site.
---
import { Tabs, Tab } from '@astrojs/starlight/components';
### Try Vue Online​
- To quickly get a taste of Vue, you can try it directly in our [▶️ Playground](https://play.vuejs.org/). 

- If you prefer a plain HTML setup without any build steps, you can use this [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/) as your starting point.

- If you are already familiar with Node.js and the concept of build tools, you can also try a complete build setup right within your browser on [StackBlitz](https://stackblitz.com/edit/vitejs-vite-aqtpcdyk?file=index.html&terminal=dev).

### Creating a Vue Application
:::note[Prerequisites]
- Familiarity with the command line
- Install Node.js version 18.3 or higher
:::

In this section we will introduce how to scaffold a Vue [Single Page Application]() on your local machine. The created project will be using a build setup based on [Vite](https://vite.dev/) and allow us to use Vue [Single-File Components (SFCs)]().

Make sure you have an up-to-date version of [Node.js](https://nodejs.org/en) installed and your current working directory is the one where you intend to create a project. Run the following command in your command line (without the $ sign):

<Tabs>
  <Tab label="npm">
    ```bash
    npm create vue@latest
    ```
  </Tab>
  <Tab label="pnpm">
    ```bash
    pnpm create vue@latest
    ```
  </Tab>
  <Tab label="yarn">
    ```bash
    yarn create vue@latest
    ```
  </Tab>
  <Tab label="bun">
    ```bash
    bun create vue@latest
    ```
  </Tab>
</Tabs>


This command will install and execute [create-vue](), the official Vue project scaffolding tool. You will be presented with prompts for several optional features such as TypeScript and testing support:

```
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

If you are unsure about an option, simply choose No by hitting enter for now. Once the project is created, follow the instructions to install dependencies and start the dev server:

```
```

You should now have your first Vue project running! Note that the example components in the generated project are written using the [Composition API]() and `<script setup>`, rather than the [Options API](). Here are some additional tips:

- The recommended IDE setup is Visual Studio Code + Vue - Official extension. If you use other editors, check out the IDE support section.
- More tooling details, including integration with backend frameworks, are discussed in the Tooling Guide.
- To learn more about the underlying build tool Vite, check out the Vite docs.
- If you choose to use TypeScript, check out the TypeScript Usage Guide.
When you are ready to ship your app to production, run the following: