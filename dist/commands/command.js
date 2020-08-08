"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("@arkecosystem/crypto");
const command_1 = __importStar(require("@oclif/command"));
const cli_ux_1 = __importDefault(require("cli-ux"));
const env_paths_1 = __importDefault(require("env-paths"));
const fs_extra_1 = require("fs-extra");
const prompts_1 = require("../helpers/prompts");
const process_manager_1 = require("../process-manager");
const validNetworks = Object.keys(crypto_1.Networks).filter(network => network !== "unitnet");
class BaseCommand extends command_1.default {
    flagsToStrings(flags, ignoreKeys = []) {
        const mappedFlags = [];
        for (const [key, value] of Object.entries(flags)) {
            if (!ignoreKeys.includes(key) && value !== undefined) {
                if (value === false) {
                    continue;
                }
                else if (value === true) {
                    mappedFlags.push(`--${key}`);
                }
                else if (typeof value === "string") {
                    mappedFlags.push(value.includes(" ") ? `--${key}="${value}"` : `--${key}=${value}`);
                }
                else {
                    mappedFlags.push(`--${key}=${value}`);
                }
            }
        }
        return mappedFlags.join(" ");
    }
    async getPaths(flags) {
        const paths = this.getEnvPaths(flags);
        for (const [key, value] of Object.entries(paths)) {
            paths[key] = `${value}/${flags.network}`;
            fs_extra_1.ensureDirSync(paths[key]);
        }
        return paths;
    }
    async parseWithNetwork(command) {
        const { args, flags } = this.parse(command);
        return { args, flags, paths: await this.getPaths(flags) };
    }
    abortWithInvalidInput() {
        this.error("Please enter valid data and try again!");
    }
    getNetworks() {
        return validNetworks;
    }
    isValidNetwork(network) {
        return this.getNetworks().includes(network);
    }
    getNetworksForPrompt() {
        return this.getNetworks().map(network => ({ title: network, value: network }));
    }
    async restartRunningProcessPrompt(processName, showPrompt = true) {
        if (process_manager_1.processManager.isOnline(processName)) {
            if (showPrompt) {
                await prompts_1.confirm(`Would you like to restart the ${processName} process?`, () => {
                    this.restartProcess(processName);
                });
            }
            else {
                this.restartProcess(processName);
            }
        }
    }
    restartProcess(processName) {
        try {
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
    abortRunningProcess(processName) {
        if (process_manager_1.processManager.isOnline(processName)) {
            this.error(`The "${processName}" process is already running.`);
        }
    }
    abortStoppedProcess(processName) {
        if (process_manager_1.processManager.isStopped(processName)) {
            this.error(`The "${processName}" process is not running.`);
        }
    }
    abortErroredProcess(processName) {
        if (process_manager_1.processManager.isErrored(processName)) {
            this.error(`The "${processName}" process has errored.`);
        }
    }
    abortUnknownProcess(processName) {
        if (process_manager_1.processManager.isUnknown(processName)) {
            this.error(`The "${processName}" process has entered an unknown state. (${process_manager_1.processManager.status(processName)})`);
        }
    }
    abortMissingProcess(processName) {
        if (process_manager_1.processManager.missing(processName)) {
            this.error(`The "${processName}" process does not exist.`);
        }
    }
    getProcessName(token) {
        return `${token}-exchange-json-rpc`;
    }
    getEnvPaths(flags) {
        return env_paths_1.default(flags.token, { suffix: "exchange-json-rpc" });
    }
}
BaseCommand.flagsNetwork = {
    network: command_1.flags.string({
        description: "the name of the network that should be used",
        options: validNetworks,
        default: "mainnet",
    }),
    token: command_1.flags.string({
        description: "the name of the token that should be used",
        default: "ark",
    }),
};
BaseCommand.flagsConfiguration = {
    network: command_1.flags.string({
        description: "the name of the network that should be used",
        options: validNetworks,
        default: "mainnet",
    }),
    token: command_1.flags.string({
        description: "the name of the token that should be used",
        default: "ark",
    }),
    host: command_1.flags.string({
        description: "the host that should be used to expose the RPC",
        default: "0.0.0.0",
    }),
    port: command_1.flags.integer({
        description: "the port that should be used to expose the RPC",
        default: 8080,
    }),
    allowRemote: command_1.flags.boolean({
        description: "allow remote connections which are filtered by a whitelist",
        allowNo: true,
        default: false,
    }),
    whitelist: command_1.flags.string({
        description: "a comma separated list of IPs that can access the RPC",
        default: "127.0.0.1,::ffff:127.0.0.1",
    }),
    peer: command_1.flags.string({
        description: "the peer you want to use for communication, defaults to random network peers",
    }),
    maxLatency: command_1.flags.integer({
        description: "the maximum allowed latency of a peer, defaults to 300ms",
        default: 300,
    }),
    peerPort: command_1.flags.integer({
        description: "the public API port of the peer you want to use to load seeds",
        default: 4003,
    }),
};
exports.BaseCommand = BaseCommand;
//# sourceMappingURL=command.js.map