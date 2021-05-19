import { FairyEditor } from 'csharp';
import CodeWriter from './CodeWriter';
import { PackageCodeGen } from './PackageCodeGen';

export const genCode = (handler: FairyEditor.PublishHandler) => {
    // convert chinese to pinyin, remove special chars etc.
    const codePkgName = handler.ToFilename(handler.pkg.name);
    const exportCodePath = `${handler.exportCodePath}`;
    const writer = new CodeWriter({ blockFromNewLine: false, usingTabs: true });
    writer.reset();

    const rawPackageCodes = new PackageCodeGen(handler).gen();
    if (!rawPackageCodes.length) return;
    const pkgCodes = rawPackageCodes.map((item) => {
        return `\t${item}`;
    });

    const codes: string[] = [];
    codes.push('/* eslint-disable */');
    codes.push(`declare namespace c`);
    codes.push(`{`);
    codes.push(...pkgCodes);
    codes.push(`}`);

    while (codes.length) {
        writer.writeln(codes.shift());
    }
    writer.save(`${exportCodePath}/${codePkgName}.ts`);
};
