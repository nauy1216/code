const {exec, execSync} = require('child_process')

execCommandSync('git status')

execCommandSync('git status')
function execCommand(command) {
    exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
    })
}
function execCommandSync(command) {
    try {
        var r = execSync(command)
        console.log(r.toString('utf8', 0, r.length - 1))
    } catch(e) {
        console.log('error: '+ command)
    }
}