/// <reference types="node" />
import { PathLike } from 'fs';
import { VizArgs } from '../args';
export interface BuildValues {
    devBucket: string;
    prodBucket: string;
    manifestFile: 'manifest.json';
    cssFile?: string;
    jsonFile: string;
    jsFile?: string;
    tsFile?: string;
    devMode: boolean;
    pwd: string;
    gcsBucket: string;
}
export declare const validateBuildValues: (args: VizArgs) => BuildValues;
export declare const validateManifestFile: (path: PathLike) => boolean;
export declare const validateConfigFile: (path: PathLike) => boolean;
