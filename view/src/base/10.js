/**
promise
 */
const resolveCallqueue = []
const promsieQueue = []
const Status = {
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected'
}
let isFlush = false

function resolve(data) {
  this.promiseStatus = Status.resolved
  this.promiseValue = data
  resolveCallqueue.push(this)
  flush()
}

function reject(data) {
  // this.promiseStatus = Status.rejected
  // this.promiseValue = data
  // flush()
}


function flush() {
  if (isFlush) {
    return
  }
  isFlush = true
  let p
  setTimeout(() => {
    while (resolveCallqueue.length) {
      p = resolveCallqueue.shift()
      if (p.resolveCall) {
        p.resolveCall(p.promiseValue)
      }
    }
  }, 0);
}

class Promised {
  constructor(callback) {
    this.promiseStatus = Status.pending
    this.promiseValue = undefined
    callback(resolve.bind(this), reject.bind(this))
  }

  then(resolveCall, rejectCall) {
    this.resolveCall = resolveCall
    this.rejectCall = rejectCall
    return new Promised(resolve => {
      resolveCallqueue.push(resolve)
      promsieQueue.push(this)
    })
  }

  catch () {

  }
}

new Promised((resolve, reject) => {
  resolve()
}).then(() => {
  console.log('promise1')
})
setTimeout(() => {
  console.log('setTimeout')
}, 0);
new Promised((resolve, reject) => {
  resolve()
}).then(() => {
  console.log('promise2')
})
console.log('sync')