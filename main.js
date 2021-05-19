"use strict";
// FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDestroy = exports.onPublish = void 0;
const GenCode_TS_1 = require("./GenCode_TS");
exports.onPublish = (handler) => {
    if (!handler.genCode)
        return;
    handler.genCode = false;
    GenCode_TS_1.genCode(handler);
};
exports.onDestroy = () => {
    // do cleanup here
};
