const log = (a) => {
  console.log('eslint', a)
  myGlobal.say()
}

function testEslint () {
  // debugger
  const a = new Set()
  // console.log('eslint', a)
  log(a)
}

var a = new Promise(resolve => {
  resolve()
})
log(a)
testEslint()
