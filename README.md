#### 介绍

`ele-tree-virtual` 是一个基于 Vue 2.x、ElementUI 的虚拟树组件，支持大数据量场景

[在线demo](https://el-select-tree.surge.sh/)

#### 安装

<!-- npm -->
npm 安装：
```bash
npm install ele-tree-virtual --save
```

yarn 安装：
```bash
yarn add ele-tree-virtual
```

#### 使用

```javascript
import Vue from 'vue'
import EleTreeVirtual from 'ele-tree-virtual'

Vue.use(EleTreeVirtual)
```
```html
<ele-tree-virtual :data="treeData" :value.sync="select"></ele-tree-virtual>
```

或者可以通过直接引用组件文件使用:

把src/lib-components中的el-tree-select组件复制到你的项目目录, 然后引入index.vue组件使用

### 传参

`EleTreeVirtual` 支持以下属性：

| 属性              | 描述                 | 类型              | 默认值      |
|-------------------|-----------------------|------------------|-------------|
| data              | 必选，树数据         | Array            | []          |
| value.sync           | 可选，选中的数据         | Array           | []        |
| height           | 展开高度         | String           | '200px'        |

#### 本地预览

1.  npm install
2.  npm run serve

#### 截图

<img src="https://user-images.githubusercontent.com/28948108/232951779-9c65c89e-ce35-46e7-8a17-922ddb1ca9b4.png" width="400"/>
