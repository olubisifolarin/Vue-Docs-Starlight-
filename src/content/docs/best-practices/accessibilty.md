---
title: Accessibility
description: Accessibility
---

Web accessibility (also known as a11y) refers to the practice of creating websites that can be used by anyone, be that a person with a disability, a slow connection, outdated or broken hardware or simply someone in an unfavorable environment. For example, adding subtitles to a video would help both your deaf and hard-of-hearing users and your users who are in a loud environment and can't hear their phone. Similarly, making sure your text isn't too low contrast will help both your low-vision users and your users who are trying to use their phone in bright sunlight.

Ready to start but aren’t sure where?

Checkout the [Planning and managing web accessibility guide](https://www.w3.org/WAI/planning-and-managing/) provided by [World Wide Web Consortium (W3C)](https://www.w3.org/)

### Skip link​
You should add a link at the top of each page that goes directly to the main content area so users can skip content that is repeated on multiple Web pages.

Typically this is done on the top of App.vue as it will be the first focusable element on all your pages:

```
<span ref="backToTop" tabindex="-1" />
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink" class="skip-link">Skip to main content</a>
  </li>
</ul>
```