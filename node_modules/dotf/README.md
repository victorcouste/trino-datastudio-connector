<h1>dotf <a href="https://travis-ci.org/grant/dotf"><img src="https://travis-ci.org/grant/dotf.svg?branch=master" alt="Build Status"></a> <a href="https://www.npmjs.com/package/dotf"><img src="https://img.shields.io/npm/v/dotf.svg" alt="npm Version"></a>
</h1>

Manage multiple dotfiles.

```sh
yarn add dotf
```

## Features

- Supports multiple dotfiles
- Absolute or relative dotfiles

## Example

```js
import dotf from 'dotf';

// Setup dotfiles
let dotglobal = dotf('~', 'myrc'); // Global (~)
let dotlocal = dotf(__dirname, 'myignore'); // Local (./)

// Write
let overwriteGlobal = await dotglobal.write({ myGlobal: 1337 });
let overwriteLocal = await dotlocal.write({ myLocal: 2674 });

// Exists
let globalExists = await dotglobal.exists();
let localExists = await dotlocal.exists();

// Read
let globalRead = await dotglobal.read();
let localRead = await dotlocal.read();
```

## Why not use XXX instead?

- I didn't see support for custom paths in dotfile in other packages (i.e. /dotfile).
- This module provides 1 liner read/write/existance with the modern await syntax.

## Tests (ava)

```sh
yarn
npm test
```
