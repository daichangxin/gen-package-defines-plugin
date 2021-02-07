## gen-package-defines-plugin
将包中设置为“导出”的组件导出interface定义。适合typescript项目，如Egret、Laya、CocosCreator...

## 使用
### 使用Fairy Editor，将整个目录复制到项目的插件目录。

### 代码做处理，主要是在创建组件时将子对象抽出来方便获取。

- 1 覆盖fairygui默认组件创建方法：
https://gist.github.com/daichangxin/6d509e08d67fe2603656d59d329a1549

- 2 FairySkinBase：
https://gist.github.com/daichangxin/e910206c4ab218471b4abc2b2f77d999

- 3 其中getMembersInfo
https://gist.github.com/daichangxin/dd69b8325e1bd82756432f4681a566f5

## 代码导出风格如下：
1、每个fairygui的包，导出对应一个文件，如包名为farm，则导出的文件是`${设置的导出目录}/farm.ts`

2、为了方便区分定义导出，所有文件默认添加`namespace c`作为命名空间。

3、例子
```
export interface itemCountUI {
    txt_count: fgui.GTextField;
}

export interface dele_plantItem {
    state: fgui.Controller;
    bg: fgui.GLoader;
    btn_plant: fgui.GButton;
    txt_time: fgui.GTextField;
    txt_reward: fgui.GTextField;
    btn_vipPlant: fgui.GButton;
    itemCountUI: fgui.GComponent & { $skin: itemCountUI };
    icon_crop: fgui.GLoader;
    beanIcon: fgui.GImage;
}
```
其中，`dele_plantItem`是设置为导出类型的自定义组件，组件的子对象`itemCountUI`也是一个自定义组件，虽然未设置导出，但因为被引用到也会被导出出来。
