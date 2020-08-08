import Command from "@oclif/command";
import { Paths } from "env-paths";
import { CommandFlags } from "../types";
export declare abstract class BaseCommand extends Command {
    static flagsNetwork: Record<string, object>;
    static flagsConfiguration: Record<string, object>;
    protected flagsToStrings(flags: CommandFlags, ignoreKeys?: string[]): string;
    protected getPaths(flags: CommandFlags): Promise<Paths>;
    protected parseWithNetwork(command: any): Promise<any>;
    protected abortWithInvalidInput(): void;
    protected getNetworks(): string[];
    protected isValidNetwork(network: string): boolean;
    protected getNetworksForPrompt(): any;
    protected restartRunningProcessPrompt(processName: string, showPrompt?: boolean): Promise<void>;
    protected restartProcess(processName: string): void;
    protected abortRunningProcess(processName: string): void;
    protected abortStoppedProcess(processName: string): void;
    protected abortErroredProcess(processName: string): void;
    protected abortUnknownProcess(processName: string): void;
    protected abortMissingProcess(processName: string): void;
    protected getProcessName(token: string): string;
    private getEnvPaths;
}
