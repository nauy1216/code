/**
  同时支持回调和promsie
 */
function async (success, fail) {
  let p
  if (!success && !fail) {
    p = new Promise((resolve, reject) => {
      success = resolve
      fail = reject
    })
  }
  if (Math.random() > 0.5) {
    success()
  } else {
    fail()
  }
  return p
}
async (() => console.log('success1'), () => console.log('fail1'))
async ().then(() => console.log('success2')).catch(() => console.log('fail2'))