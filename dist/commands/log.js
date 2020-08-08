"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const clear_1 = __importDefault(require("clear"));
const nodejs_tail_1 = __importDefault(require("nodejs-tail"));
const read_last_lines_1 = __importDefault(require("read-last-lines"));
const process_manager_1 = require("../process-manager");
const command_2 = require("./command");
class LogCommand extends command_2.BaseCommand {
    async run() {
        const { flags } = await this.parseWithNetwork(LogCommand);
        const processName = this.getProcessName(flags.token);
        this.abortMissingProcess(processName);
        const { pm2_env } = process_manager_1.processManager.describe(processName);
        const file = flags.error ? pm2_env.pm_err_log_path : pm2_env.pm_out_log_path;
        clear_1.default();
        this.log(`Tailing last ${flags.lines} lines for [${processName}] process (change the value with --lines option)`);
        this.log((await read_last_lines_1.default.read(file, flags.lines)).trim());
        const log = new nodejs_tail_1.default(file);
        log.on("line", this.log);
        log.watch();
    }
}
LogCommand.description = "Show the log";
LogCommand.examples = [`$ exchange-json-rpc log`];
LogCommand.flags = {
    ...command_2.BaseCommand.flagsNetwork,
    error: command_1.flags.boolean({
        description: "only show error output",
    }),
    lines: command_1.flags.integer({
        description: "number of lines to tail",
        default: 15,
    }),
};
exports.LogCommand = LogCommand;
//# sourceMappingURL=log.js.map