export declare const createFakeInjectable: () => {
    provide: import("@rxdi/core/dist/container/Token").Token<string>;
    useValue: {};
}[];
export declare class TestFactoryService {
    createFakeInjectable(): {
        provide: import("@rxdi/core/dist/container/Token").Token<string>;
        useValue: {};
    }[];
}
