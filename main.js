"use strict";
// FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDestroy = exports.onPublish = void 0;
const GenCode_TS_1 = require("./GenCode_TS");
const onPublish = (handler) => {
    if (!handler.genCode)
        return;
    handler.genCode = false;
    GenCode_TS_1.genCode(handler);
};
exports.onPublish = onPublish;
const onDestroy = () => {
    // do cleanup here
};
exports.onDestroy = onDestroy;
