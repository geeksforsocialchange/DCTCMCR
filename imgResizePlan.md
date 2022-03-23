# Plan

Automatically resixe images at build without needing a shortcode or any extra steps for the user

## Phase 1

make a barebones node-script

This sort of works see

```
in.html
out.html
mvp.js
```

# Phase 2

- use https://www.11ty.dev/docs/config/#transforms & https://www.11ty.dev/docs/plugins/image/
- run through the compiled html, look for img tags and pass the urls through eleventy-img

**Question** will running over the same url dump millions of new files into the public folder each time????
_Answer_ stopped passThroughCopy on anything that isn't an SVG, it doesn't generate a new image with different hash each time it runs.
