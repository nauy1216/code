let p1 = new Promise((resolve, reject) => {
  // resolve()
  // reject()
  throw new Error("选择标识无效")
})

let p2 = p1.then(data => {
  console.log('promise2 resolve', data)
})