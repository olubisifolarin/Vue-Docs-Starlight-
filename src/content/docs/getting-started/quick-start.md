---
title: Quick Start
description: A quick start in my new Starlight docs site.
---

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


:::tabs

@tab npm
```bash
npm create vue@latest

@tab pnpm
pnpm create vue@latest