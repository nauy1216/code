const config = require('../\\.eslintrc.js')
console.log('config', config)
var eslint = require("eslint");
var ESLint = eslint.ESLint;
var CLIEngine = eslint.CLIEngine;

var cli = new CLIEngine({
    envs: ["browser", "mocha", 'es6'],
    useEslintrc: false,
    globals: [], // globals必须是一个数组
    rules: {
        'no-debugger': 'error',
        'no-console': 'error',
        'no-redeclare': 'error',
        'no-unused-vars': 'error'
    }
});
// var cli = new ESLint(config);

// lint myfile.js and all files in lib/
var report = cli.executeOnFiles(["src/"]);

report.results.forEach(result => {
    console.log('文件路径', result.filePath)
    console.log('errors', result.errorCount)
    result.messages.forEach((message, index) => {
        console.log(`[${index}] ${message.ruleId} 
    line:${message.line}  
    column:${message.line} 
    message: ${message.message}
        `)
    })
})