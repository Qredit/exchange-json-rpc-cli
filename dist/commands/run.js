"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exchange_json_rpc_1 = require("@arkecosystem/exchange-json-rpc");
const command_1 = require("./command");
class RunCommand extends command_1.BaseCommand {
    async run() {
        const { flags, paths } = await this.parseWithNetwork(RunCommand);
        flags.whitelist = flags.whitelist.split(",");
        await exchange_json_rpc_1.start({ database: `${paths.data}/exchange-json-rpc.sqlite`, server: flags });
    }
}
RunCommand.description = "Run the JSON-RPC (without pm2)";
RunCommand.examples = [
    `Run the JSON-RPC
$ exchange-json-rpc run
`,
];
RunCommand.flags = {
    ...command_1.BaseCommand.flagsNetwork,
    ...command_1.BaseCommand.flagsConfiguration,
};
exports.RunCommand = RunCommand;
//# sourceMappingURL=run.js.map