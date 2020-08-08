import { Foreman, ProcessIdentifier } from "@faustbrian/foreman";
import { ExecaReturns } from "execa";
declare class ProcessManager extends Foreman {
    restart(id: ProcessIdentifier): ExecaReturns;
    list(): Array<Record<string, any>>;
}
export declare const processManager: ProcessManager;
export {};
