


import { StorageProxy } from '.';
import * as mockStorage from 'storage-mock';

async function sleep(time: number): Promise<void> {
    return new Promise<void>((res, rej) => {
        setTimeout(res, time);
    });
}

async function testOnChanged() {
    console.log('=====testOnChanged=====')

    let fackStorage = mockStorage.localStorage

    let storage = StorageProxy.create(fackStorage);

    let storageChange;
    storage.onChanged.subscribe(x => {
        console.log('result: ' + x['a'])
        storageChange = x;
    })

    storage.setItem('a', '123');
    await sleep(1000); //停止一秒

    console.assert(storageChange.a === '123');
}

async function testOnPropertyChanged() {
    console.log('=====testOnPropertyChanged=====')

    let fackStorage = mockStorage.localStorage

    let storage = StorageProxy.create(fackStorage);

    let value;
    storage.getPropertyChangeHook('a').subscribe(x => {
        console.log('result: ' + x)
        value = x;
    })

    storage.setItem('a', '456');
    await sleep(1000); //停止一秒

    console.assert(value === '456');
}

async function test() {
    await testOnChanged();
    await testOnPropertyChanged();
}

test();
