"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_ux_1 = __importDefault(require("cli-ux"));
const execa_1 = require("execa");
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const latest_version_1 = __importDefault(require("latest-version"));
const path_1 = require("path");
const semver_1 = __importDefault(require("semver"));
async function getLatestVersion(name) {
    try {
        const version = await latest_version_1.default(name);
        return version;
    }
    catch (error) {
        return undefined;
    }
}
function ensureCacheFile(config) {
    fs_extra_1.ensureDirSync(config.cacheDir);
    const fileName = path_1.join(config.cacheDir, "update");
    fs_1.closeSync(fs_1.openSync(fileName, "w"));
    return fileName;
}
async function installFromChannel(pkg, tag) {
    const { stdout, stderr } = await execa_1.shell(`yarn global add ${pkg}@${tag}`);
    if (stderr) {
        console.error(stderr);
    }
    console.log(stdout);
}
exports.installFromChannel = installFromChannel;
function needsRefresh(config) {
    const cacheFile = ensureCacheFile(config);
    try {
        const { mtime } = fs_1.statSync(cacheFile);
        const staleAt = new Date(mtime.valueOf() + 1000 * 60 * 60 * 24 * 1);
        return staleAt < new Date();
    }
    catch (err) {
        return true;
    }
}
exports.needsRefresh = needsRefresh;
async function checkForUpdates({ config, error, warn }) {
    const state = {
        ready: false,
        name: config.name,
        currentVersion: config.version,
    };
    try {
        const cacheFile = ensureCacheFile(config);
        cli_ux_1.default.action.start(`Checking for updates`);
        const latestVersion = await getLatestVersion(state.name);
        cli_ux_1.default.action.stop();
        if (latestVersion === undefined) {
            error(`We were unable to find any releases.`);
            return state;
        }
        if (semver_1.default.gt(latestVersion, config.version)) {
            return {
                ...state,
                ...{
                    ready: true,
                    updateVersion: latestVersion,
                    cache: cacheFile,
                },
            };
        }
    }
    catch (err) {
        error(err.message);
    }
    finally {
        cli_ux_1.default.action.stop();
    }
    return state;
}
exports.checkForUpdates = checkForUpdates;
//# sourceMappingURL=update.js.map