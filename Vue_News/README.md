### 项目介绍

- 基于 Vue.js 的新闻类网站(基于组件化的数据驱动开发方式)

### 概念术语

- Vue 实例：通过 new Vue({}) 创建的对象，配置对象中的部分内容会被提取到 Vue 实例中如 data、props、computed、methods 等。
- 挂载：让 Vue 实例控制网页中某个区域的过程，称之为挂载。<br/>
  挂载的方式：
  - 1、通过 el: "CSS 选择器" 进行配置
  - 2、通过 Vue 实例.\$mount("CSS 选择器") 进行配置
- 模板：被 Vue 实例控制的页面片段。<br/>
  模板的作用是为了提高渲染效率，vue 会把模板编译成为虚拟 DOM 树，然后再生成真实的 DOM。
- ES6 模块化(解决全局变量污染，便于管理依赖)
  - 模块就是单个的 js 文件，引入方法如下 <script src="index" type="module"></script>
  - 默认导出和默认导入：`export default function(num){ return a**2 }` 和 `import moduleName from 'path'`，默认导出的模块名可以为任意值但一个文件只能有一个。
  - 具名导出和具名导入：`export function sum(a,b){ return a+b }` 和 `import { sum } from 'path'`，具名导出的名字可以替换，不过建议不变除非命名冲突。
  - 具名导出和默认可以同时存在，导入时使用 `import defaultModuleName, { sum } from 'path'`。
  - 导入所有模块：`import * as obj from 'path'`，尝试 `console.log(obj)` 去观察。
- $router(保存用于页面跳转方法的对象)<br/>
  $route(保存当前匹配到的路由信息对象)
- Vue 生命周期，仔细去看官方提供的图片

````bash
--registry=https://registry.npm.taobao.org

````

### 开发技巧

- 单词
  - omitted 忽略，略去
- ERROR
  - 前端代码的接口要和后端给的文档一致，包括大小写
- TIPS
  - 所有的文件统一按功能划分，文件命名也要按功能命名(如接口类，组件类，工具类)
  - v-model 指令：语法糖，用于实现双向绑定，实际上是自动绑定了 value 属性值和注册了 input 事件

1. markdown 格式中可以采用 HTML 标签，如使用 \<br/> 换行等
2. 变量或文件命名按照统一格式进行，不可中途变换
