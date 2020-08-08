"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@oclif/parser");
const dayjs_1 = __importDefault(require("dayjs"));
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const process_manager_1 = require("../process-manager");
const utils_1 = require("../utils");
const command_1 = require("./command");
class StatusCommand extends command_1.BaseCommand {
    async run() {
        const { flags } = await this.parseWithNetwork(StatusCommand);
        const processName = this.getProcessName(flags.token);
        this.abortMissingProcess(processName);
        utils_1.renderTable(["ID", "Name", "Version", "Status", "Uptime", "CPU", "RAM"], (table) => {
            const app = process_manager_1.processManager.describe(processName);
            // @ts-ignore
            table.push([
                app.pid,
                app.name,
                // @ts-ignore
                app.pm2_env.version,
                app.pm2_env.status,
                // @ts-ignore
                pretty_ms_1.default(dayjs_1.default().diff(app.pm2_env.pm_uptime)),
                `${app.monit.cpu}%`,
                pretty_bytes_1.default(app.monit.memory),
            ]);
        });
    }
}
StatusCommand.description = "Show the JSON-RPC status";
StatusCommand.examples = [`$ exchange-json-rpc status`];
StatusCommand.flags = {
    token: parser_1.flags.string({
        description: "the name of the token that should be used",
        default: "ark",
    }),
};
exports.StatusCommand = StatusCommand;
//# sourceMappingURL=status.js.map