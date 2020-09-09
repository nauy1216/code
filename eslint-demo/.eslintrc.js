/**
  找到eslint报错的位置，有两种方式：
  1、运行eslint命令他检查指定的文件，会将警告和错误信息输出到控制台
  2、安装vscode eslint插件，将会在编辑器有问题代码下面显示一条红色的线，鼠标移入会有具体的信息。
  3、在集成webpack的时候， 在eslint-loader中配置fix修复
  使用的场景:
  1、开发的时候建议使用vscode插件, 并配合vscode配置成保存代码的时候自动修复报错。
  2、提交代码的时候防止未检查过的代码提交，可以结合git hooks进行代码校验。
  修复eslint报错的的方式：
  1、安装vscode eslint插件，优点：可以不用怎么配置。缺点： 只能修复js。在vue单文件中不能格式化template和css
  2、安装vetur插件, 优点：可以格式化所有代码。 缺点: 需要根据eslint配置的规则在vetur配置相应的规则。
 */
/**
  参考文档： https://blog.csdn.net/landiyaaa/article/details/105410748
  eslint 的原理是，先解析代码 AST 语法树，再对其分析以发现代码质量和风格问题。
 */
module.exports = {
  root: true, // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  // parser: 'Espree', // 指定解析器 esprima
  extends: [
    // 'eslint:recommended',
    // 'plugin:prettier/recommended',
    'standard',
    'plugin:vue/essential'
    // 'plugin:prettier/recommended'
    // 'prettier '
    // 'plugin:prettier/recommended'
  ],
  //  脚本在执行期间访问的额外的全局变量。
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    myGlobal: 'readonly' // 增加全局变量myGlobal后, 在代码中直接使用myGlobal才不会报错
    // Promise: 'off' // 全局禁用Promise
  },
  parserOptions: {
    ecmaVersion: 6, // 2018
    sourceType: 'module', // script | module
    ecmaFeatures: { // 这是个对象，表示你想使用的额外的语言特性
      globalReturn: true, // 允许在全局作用域下使用 return 语句
      impliedStrict: true, // 启用全局 strict mode
      jsx: true // 启用 JSX
    },
    parser: '@typescript-eslint/parser' // 另一方面，我们还得让 eslint 理解 typescript  的语法。
  },
  parser: 'vue-eslint-parser', // 一方面，我们得让 eslint  理解 vue 的语法。因此 parser 的值需要设置为 'vue-eslint-parser', 这里有个需要注意的地方，parser 不能再指定别的值，否则会报错 "Use the latest vue-eslint-parser"
  // parser: '@typescript-eslint/parser',
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    // 'prettier/prettier': 'error',
    semi: 'error'
  }
}
