import { CommandFlags } from "../types";
import { BaseCommand } from "./command";
export declare class StatusCommand extends BaseCommand {
    static description: string;
    static examples: string[];
    static flags: CommandFlags;
    run(): Promise<void>;
}
