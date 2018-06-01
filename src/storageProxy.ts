import { BehaviorSubject } from 'rxjs'

export class StorageProxy implements Storage, ProxyHandler<StorageProxy> {
    public onChanged: BehaviorSubject<StorageProxy>;

    public propertyHooks = {} as { [key: string]: BehaviorSubject<string> };

    private constructor(public realStorage: Storage) {
        this.onChanged = new BehaviorSubject<StorageProxy>(this)
    }


    has?(target: StorageProxy, p: PropertyKey): boolean {
        return this.realStorage[p as string] !== undefined;
    }
    get?(target: StorageProxy, p: PropertyKey, receiver: any): any {
        if (this[p]) {
            return this[p];
        }
        return this.realStorage[p as string];
    }
    set?(target: StorageProxy, p: PropertyKey, value: any, receiver: any): boolean {
        this.realStorage[p as string] = value;

        if (this.realStorage[p as string] === value) {
            this.onChanged.next(target);
            if (this.propertyHooks[p as string]) {
                this.propertyHooks[p as string].next(value);
            }
            return true;
        }

        return false;
    }
    deleteProperty?(target: StorageProxy, p: PropertyKey): boolean {
        delete this.realStorage.target[p as string];

        if (this.realStorage.target[p as string] === undefined) {
            this.onChanged.next(target);
            if (this.propertyHooks[p as string]) {
                this.propertyHooks[p as string].next(undefined);
            }
            return true;
        }

        return false;
    }

    get length(): number {
        return this.realStorage.length;
    }

    clear(): void {
        this.realStorage.clear();
        this.onChanged.next(this);
    }
    getItem(key: string): string {
        return this.realStorage.getItem(key);
    }
    key(index: number): string {
        return this.realStorage.key(index);
    }
    removeItem(key: string): void {
        this.realStorage.removeItem(key);
        this.onChanged.next(this);
        if (this.propertyHooks[key as string]) {
            this.propertyHooks[key as string].next(undefined);
        }
    }
    setItem(key: string, value: string): void {
        this.realStorage.setItem(key, value);
        this.onChanged.next(this);
        if (this.propertyHooks[key as string]) {
            this.propertyHooks[key as string].next(value);
        }
    }

    getPropertyChangeHook(key: string): BehaviorSubject<string> {
        this.propertyHooks[key] = this.propertyHooks[key] || new BehaviorSubject<string>(this.getItem(key));

        return this.propertyHooks[key];
    }

    public static create(realStorage: Storage): StorageProxy {
        let proxy = new StorageProxy(realStorage);

        let result = new Proxy(proxy, proxy);

        return result;
    }
}