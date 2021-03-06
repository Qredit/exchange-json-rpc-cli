"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(require("prompts"));
async function confirm(message, yesCallback, noCallback) {
    const { confirm } = await prompts_1.default([
        {
            type: "confirm",
            name: "confirm",
            message,
        },
    ]);
    if (confirm) {
        await yesCallback();
    }
    else if (noCallback) {
        await noCallback();
    }
}
exports.confirm = confirm;
//# sourceMappingURL=prompts.js.map