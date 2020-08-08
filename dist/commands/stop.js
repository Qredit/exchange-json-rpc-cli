"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const cli_ux_1 = __importDefault(require("cli-ux"));
const process_manager_1 = require("../process-manager");
const command_2 = require("./command");
class StopCommand extends command_2.BaseCommand {
    async run() {
        const { flags } = await this.parseWithNetwork(StopCommand);
        const processName = this.getProcessName(flags.token);
        try {
            this.abortMissingProcess(processName);
            this.abortUnknownProcess(processName);
            this.abortStoppedProcess(processName);
            cli_ux_1.default.action.start(`Stopping ${processName}`);
            process_manager_1.processManager[flags.kill ? "delete" : "stop"](processName);
        }
        catch (error) {
            this.error(error.message);
        }
        finally {
            cli_ux_1.default.action.stop();
        }
    }
}
StopCommand.description = "Stop the JSON-RPC";
StopCommand.examples = [
    `Stop the JSON-RPC
$ exchange-json-rpc stop
`,
];
StopCommand.flags = {
    ...command_2.BaseCommand.flagsNetwork,
    kill: command_1.flags.boolean({
        description: "kill the process or daemon",
    }),
};
exports.StopCommand = StopCommand;
//# sourceMappingURL=stop.js.map