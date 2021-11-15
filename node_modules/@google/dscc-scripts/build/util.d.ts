import { CommonOptions } from 'execa';
export declare const assertNever: (x: never) => never;
export declare const format: {
    green: import("chalk").Chalk & {
        supportsColor: import("chalk").ColorSupport;
    };
    blue: import("chalk").Chalk & {
        supportsColor: import("chalk").ColorSupport;
    };
    yellow: import("chalk").Chalk & {
        supportsColor: import("chalk").ColorSupport;
    };
    red: import("chalk").Chalk & {
        supportsColor: import("chalk").ColorSupport;
    };
};
export declare const invalidConnectorConfig: (path: "production" | "latest") => Error;
export declare const invalidVizConfig: (path: "gcsDevBucket" | "gcsProdBucket" | "jsFile" | "tsFile" | "jsonFile" | "cssFile" | "print") => Error;
export declare const pipeStdIO: CommonOptions;
