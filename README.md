## gen-package-defines-plugin
将包中设置为“导出”的组件导出interface定义。

### 使用
使用Fairy Editor，将整个目录复制到项目的插件目录。

代码做处理，主要是在创建组件时将子对象抽出来方便获取。
```
export function getMembersInfo(skin: fairygui.GComponent) {
    const result = {};
    //children
    let i, len = 0;
    for (i = 0, len = skin.numChildren; i < len; i++) {
        const child = skin.getChildAt(i);
        const childName = child.name;
        //忽略空命名
        if (isDefaultName(childName)) continue;
        result[childName] = child;
    }
    //transition
    let t_arr: fairygui.Transition[] = skin['_transitions'];
    for (i = 0, len = t_arr.length; i < len; i++) {
        const t = t_arr[i];
        const tName = t.name;
        //忽略空命名
        if (isDefaultName(tName)) continue;
        result[tName] = t;
    }
    //controller
    let c_arr: fairygui.Controller[] = skin['_controllers'];
    for (i = 0, len = c_arr.length; i < len; i++) {
        const c = c_arr[i];
        const cName = c.name;
        //忽略空命名
        if (isDefaultName(cName)) continue;
        result[cName] = c;
    }
    return result;
}

export function isDefaultName(name: string) {
    if (!name) return true;
    const first_char = name.charAt(0);
    if (first_char == 'n' || first_char == 'c' || first_char == 't') {
        return !isNaN(parseInt(name.substr(1)));
    }
    return false;
}
```
