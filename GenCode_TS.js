"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genCode = void 0;
const CodeWriter_1 = require("./CodeWriter");
const PackageCodeGen_1 = require("./PackageCodeGen");
const genCode = (handler) => {
    // convert chinese to pinyin, remove special chars etc.
    const codePkgName = handler.ToFilename(handler.pkg.name);
    const exportCodePath = `${handler.exportCodePath}`;
    const writer = new CodeWriter_1.default({ blockFromNewLine: false, usingTabs: true });
    writer.reset();
    const rawPackageCodes = new PackageCodeGen_1.PackageCodeGen(handler).gen();
    if (!rawPackageCodes.length)
        return;
    const pkgCodes = rawPackageCodes.map((item) => {
        return `\t${item}`;
    });
    const codes = [];
    codes.push('/* eslint-disable */');
    codes.push(`namespace c`);
    codes.push(`{`);
    codes.push(...pkgCodes);
    codes.push(`}`);
    while (codes.length) {
        writer.writeln(codes.shift());
    }
    writer.save(`${exportCodePath}/${codePkgName}.ts`);
};
exports.genCode = genCode;
