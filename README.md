## gen-package-defines-plugin
将包中设置为“导出”的组件导出interface定义。

### 使用
- 使用Fairy Editor，将整个目录复制到项目的插件目录。

### 代码做处理，主要是在创建组件时将子对象抽出来方便获取。

##### 1 覆盖fairygui默认组件创建方法：
<script src="https://gist.github.com/daichangxin/6d509e08d67fe2603656d59d329a1549.js"></script>
##### 2 FairySkinBase：
<script src="https://gist.github.com/daichangxin/e910206c4ab218471b4abc2b2f77d999.js"></script>

##### 3 其中getMembersInfo
<script src="https://gist.github.com/daichangxin/dd69b8325e1bd82756432f4681a566f5.js"></script>
