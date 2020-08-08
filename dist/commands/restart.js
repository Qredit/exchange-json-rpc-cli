"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_ux_1 = __importDefault(require("cli-ux"));
const process_manager_1 = require("../process-manager");
const command_1 = require("./command");
class RestartCommand extends command_1.BaseCommand {
    async run() {
        const { flags } = await this.parseWithNetwork(RestartCommand);
        const processName = this.getProcessName(flags.token);
        try {
            this.abortMissingProcess(processName);
            this.abortStoppedProcess(processName);
            cli_ux_1.default.action.start(`Restarting ${processName}`);
            process_manager_1.processManager.restart(processName);
        }
        catch (error) {
            error.stderr ? this.error(`${error.message}: ${error.stderr}`) : this.error(error.message);
        }
        finally {
            cli_ux_1.default.action.stop();
        }
    }
}
RestartCommand.description = "Restart the JSON-RPC";
RestartCommand.examples = [
    `Restart the JSON-RPC
$ exchange-json-rpc restart
`,
];
RestartCommand.flags = {
    ...command_1.BaseCommand.flagsNetwork,
};
exports.RestartCommand = RestartCommand;
//# sourceMappingURL=restart.js.map