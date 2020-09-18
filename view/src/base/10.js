/**
promise
 */
const callQueue = []
const Status = {
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected'
}
let isFlush = false

function flush() {
  if (isFlush) {
    return
  }
  isFlush = true
  let promise, callback
  setTimeout(() => {
    while (callQueue.length) {
      promise = callQueue.shift()
      callback = callQueue.shift()
      try {
        if (typeof promise[callback] === 'function') {
          promise[callback](promise.promiseValue)
        } else if (typeof callback === 'function') {
          callback(promise.promiseValue)
        }
      } catch (e) {
        console.error(e)
      }
    }
    isFlush = false
  }, 0);
}

class Promised {
  constructor(callback) {
    this.promiseStatus = Status.pending
    this.promiseValue = undefined
    this.returnValue = undefined

    function resolve(data) {
      if (this.promiseStatus === Status.pending) {
        this.promiseStatus = Status.resolved
        this.promiseValue = data
        callQueue.push(this, 'resolveCall')
        flush()
      }
    }

    function reject(data) {
      if (this.promiseStatus === Status.pending) {
        this.promiseStatus = Status.rejected
        this.promiseValue = data
        callQueue.push(this, 'rejectCall')
        flush()
      }
    }
    try {
      this.returnValue = callback(resolve.bind(this), reject.bind(this))
    } catch (e) {
      reject.call(this, e)
    }
  }

  then(resolveCall, rejectCall) {
    this.resolveCall = resolveCall
    this.rejectCall = rejectCall
    return new Promised(resolve => {
      callQueue.push(this, () => {
        // console.log('this.returnValue', this.returnValue)
        resolve()
      })
    })
  }

  catch (rejectCall) {
    this.rejectCall = rejectCall
    return new Promised(resolve => {
      callQueue.push(this, () => {
        // console.log('this.returnValue', this.returnValue)
        resolve()
      })
    })
  }
}

// new Promised((resolve, reject) => {
//   console.log('this ===> ', this)
//   resolve('promise1 data')
// }).then(data => {
//   console.log('promise1', data)
// }).then(data => {
//   console.log('promise3', data)
// })
// setTimeout(() => {
//   console.log('setTimeout')
// }, 0);
debugger
new Promised((resolve, reject) => {
  // resolve()
  // reject()
  throw new Error("选择标识无效")
}).then(data => {
  console.log('promise2 resolve', data)
}).catch(err => {
  console.log('promise2 catch', err)
})
console.log('sync')