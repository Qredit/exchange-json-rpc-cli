import { CommandFlags, ProcessOptions } from "../types";
import { BaseCommand } from "./command";
export declare class StartCommand extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: CommandFlags;
    run(): Promise<void>;
    protected runWithPm2(options: ProcessOptions, flags: CommandFlags): Promise<void>;
}
