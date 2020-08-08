import { IConfig } from "@oclif/config";
export declare function installFromChannel(pkg: any, tag: any): Promise<void>;
export declare function needsRefresh(config: IConfig): boolean;
export declare function checkForUpdates({ config, error, warn }: {
    config: any;
    error: any;
    warn: any;
}): Promise<any>;
