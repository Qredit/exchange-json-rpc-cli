"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_table3_1 = __importDefault(require("cli-table3"));
function renderTable(head, callback) {
    const table = new cli_table3_1.default({
        head,
        chars: { mid: "", "left-mid": "", "mid-mid": "", "right-mid": "" },
    });
    callback(table);
    console.log(table.toString());
}
exports.renderTable = renderTable;
//# sourceMappingURL=utils.js.map