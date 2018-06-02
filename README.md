# StorageHook

[![npm version](https://badge.fury.io/js/storage-hook.svg)](https://badge.fury.io/js/storage-hook) [![Build Status](https://travis-ci.org/XuPeiYao/storageHook.svg?branch=master)](https://travis-ci.org/XuPeiYao/storageHook) [![Downloads](https://img.shields.io/npm/dm/storage-hook.svg)](https://www.npmjs.com/package/storage-hook) [![license](https://img.shields.io/github/license/xupeiyao/storageHook.svg)](https://github.com/XuPeiYao/storageHook/blob/master/LICENSE)

Subscribable localStorage or sessionStorage.

### NPM

`npm install storage-hook`

### Example

#### Global hook

```typescript
import { StorageProxy } from 'storage-hook';

let storage = StorageProxy.create(sessionStorage);

storage.onChanged.subscribe(x => {
  console.log('result: ' + x['a']);
});

storage.setItem('a', '123');
```

#### Property hook

```typescript
import { StorageProxy } from 'storage-hook';

let storage = StorageProxy.create(sessionStorage);

storage.getPropertyChangeHook('a').subscribe(x => {
  console.log('result: ' + x);
});

storage.setItem('a', '456');
```
