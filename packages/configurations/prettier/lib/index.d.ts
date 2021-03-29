import { Options } from 'prettier';

export declare type Override = {
	files: string | string[];
	options: Options;
	excludeFiles?: string | string[];
};
export declare type Config = Options & {
	overrides?: Override[];
};
declare const config: Config;
export default config;

export {};
