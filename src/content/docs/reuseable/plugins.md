---
title: Plugins
description: Plugins
---

### Introduction​
Plugins are self-contained code that usually add app-level functionality to Vue. This is how we install a plugin:

```
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
  /* optional options */
})
```

