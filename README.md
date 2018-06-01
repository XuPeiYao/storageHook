StorageHook
=====
### Sample
#### Global hook
```typescript
let storage = StorageProxy.create(sessionStorage);

storage.onChanged.subscribe(x => {
    console.log('result: ' + x['a'])
})

storage.setItem('a', '123');
```

#### Property hook
```typescript
let storage = StorageProxy.create(sessionStorage);

storage.getPropertyChangeHook('a').subscribe(x => {
    console.log('result: ' + x)
})

storage.setItem('a', '456');
```