### 投资大亨项目

> 项目文档

### 项目开发

**_ 安装开发时所需依赖 _**

```sh
    $ npm i # 安装所有依赖
```

> cocos creator 版本 2.4.2 (引擎有问题，尽快升级)

## 目录结构

```js
.
├── asset                   资源
│   ├── resource            需要代码加载的资源文件（音频、图片等）
│   ├── Scene               场景文件
│   ├── Script              代码文件
│   │   ├── common          项目公共文件
│   │   ├── game            游戏组件文件
│   │   ├── utils           工具库文件
│   └── Texture             图片文件（不需要代码加载）
├── build                   编译完成文件
├── build-templates         编译模板
├── library                 不用管
├── local                   本地creator配置
├── node_modules            node依赖文件
├── settings
├── temp
├── editorconfig.js
├── eslintrc                代码格式化规则
├── tsconfig                typescript配置文件
├── package.json            项目依赖配置
├── project.json            项目配置
└── README.md               项目说明
```

### 项目发布及部署

**_ 图片记得压缩 _**

> creator -> 项目 -> 构建发布
> 发布平台 Web Mobile
> 初始场景 loading.fire
> 设备方向 Portrait 竖屏

> 构建完成 将 build/web-mobile 里文件复制到服务器路径
