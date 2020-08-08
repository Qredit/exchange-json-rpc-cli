"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const cli_ux_1 = __importDefault(require("cli-ux"));
const process_manager_1 = require("../process-manager");
const command_2 = require("./command");
class StartCommand extends command_2.BaseCommand {
    async run() {
        const { flags } = await this.parseWithNetwork(StartCommand);
        const processName = this.getProcessName(flags.token);
        this.abortRunningProcess(processName);
        await this.runWithPm2({
            name: processName,
            // @ts-ignore
            script: this.config.options.root,
            args: `run ${this.flagsToStrings(flags, ["daemon"])}`,
        }, flags);
    }
    async runWithPm2(options, flags) {
        const processName = options.name;
        try {
            if (process_manager_1.processManager.has(processName)) {
                this.abortUnknownProcess(processName);
                this.abortRunningProcess(processName);
            }
            cli_ux_1.default.action.start(`Starting ${processName}`);
            const flagsProcess = {
                "max-restarts": 5,
                "kill-timeout": 30000,
            };
            if (flags.daemon === false) {
                flagsProcess["no-daemon"] = true;
            }
            flagsProcess.name = processName;
            process_manager_1.processManager.start(options, flagsProcess);
        }
        catch (error) {
            error.stderr ? this.error(`${error.message}: ${error.stderr}`) : this.error(error.message);
        }
        finally {
            cli_ux_1.default.action.stop();
        }
    }
}
StartCommand.description = "Start the JSON-RPC";
StartCommand.examples = [
    `Run a JSON-RPC with a pm2 daemon
$ exchange-json-rpc start --network=mainnet
`,
];
StartCommand.flags = {
    ...command_2.BaseCommand.flagsNetwork,
    ...command_2.BaseCommand.flagsConfiguration,
    daemon: command_1.flags.boolean({
        description: "start the process as a daemon",
        default: true,
        allowNo: true,
    }),
};
exports.StartCommand = StartCommand;
//# sourceMappingURL=start.js.map