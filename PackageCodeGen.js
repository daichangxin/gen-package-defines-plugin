"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageCodeGen = void 0;
class PackageCodeGen {
    constructor(handler) {
        const ns = 'fgui';
        const settings = handler.project.GetSettings('Publish').codeGeneration;
        const classes = handler.CollectClasses(settings.ignoreNoname, settings.ignoreNoname, ns);
        this._classInfoDic = {};
        this._classList = [];
        classes.ForEach((item) => {
            this._classInfoDic[item.className] = item;
            this._classList.push(item);
        });
        this._allClassCodes = [];
    }
    createClassCodes(classInfo) {
        const members = classInfo.members;
        if (!members.Count)
            return;
        if (classInfo.isCreateCode)
            return;
        classInfo.isCreateCode = true;
        // console.log(`Gen Class Code : ${classInfo.className}`);
        const classCodes = [];
        classCodes.push(`export interface ${classInfo.className} {`);
        classInfo.members.ForEach((item) => {
            const itemType = item.type;
            // 检查是否是fgui的组件，如果不是则额外创建type
            if (itemType.indexOf('fgui') === 0) {
                classCodes.push(`\t${item.varName}: ${item.type};`);
            }
            else {
                const itemTypeClassInfo = this._classInfoDic[item.type];
                if (itemTypeClassInfo) {
                    this.createClassCodes(itemTypeClassInfo);
                    classCodes.push(`\t${item.varName}: ${itemTypeClassInfo.superClassName} & { $skin: ${item.type} };`);
                }
                else {
                    classCodes.push(`\t${item.varName}: fgui.GObject;`);
                }
            }
        });
        classCodes.push(`}`);
        // add to allClassCodes
        this._allClassCodes.push(...classCodes, '\n');
    }
    gen() {
        // 开始生成所有导出的组件定义
        this._classList.forEach((classInfo) => {
            if (!classInfo.res.exported)
                return;
            this.createClassCodes(classInfo);
        });
        return this._allClassCodes;
    }
}
exports.PackageCodeGen = PackageCodeGen;
