[![NPM](https://img.shields.io/npm/v/@blackprint/nodes-arweave.svg)](https://www.npmjs.com/package/@blackprint/nodes-arweave)
[![Build Status](https://github.com/Blackprint/nodes-arweave/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Blackprint/nodes-arweave/actions/workflows/build.yml)

## Arweave for Blackprint
This module gives you an ability to use [Arweave](https://arweave.org) with [Blackprint](https://github.com/Blackprint/Blackprint).

### Examples
Please go to [/example](https://github.com/Blackprint/nodes-arweave/tree/main/example) folder and import it with [Blackprint Editor](https://blackprint.github.io/dev.html).

## Import this nodes from URL
Please specify the version to avoid breaking changes.

```js
Blackprint.loadModuleFromURL([
  'https://cdn.jsdelivr.net/npm/@blackprint/nodes-arweave@0.4/dist/nodes-arweave.mjs'
], {
  // Turn this on if you want to load .sf.js, and .sf.css
  // only with single .mjs
  loadBrowserInterface: true // set to "false" for Node.js/Deno
});
```

## Development URL
You can use this link to load unpublished nodes and still under development on GitHub.<br>
https://cdn.jsdelivr.net/gh/Blackprint/nodes-arweave@dist/nodes-arweave.mjs

Replace `dist` with your latest commit hash (from `dist` branch) to avoid cache from CDN.

### License
MIT