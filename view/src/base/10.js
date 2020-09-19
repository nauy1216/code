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
        if (callback === 'resolveCall' || callback === 'rejectCall') {

          promise.returnValue = promise[callback](promise.promiseValue)
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
    this.resolveCall = []
    this.rejectCall = []

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
      callback(resolve.bind(this), reject.bind(this))
    } catch (e) {
      reject.call(this, e)
    }
  }

  then(resolveCall, rejectCall) {
    let _this = this
    return new Promised((resolve, reject) => {
      let result
      if (resolveCall) {
        if (_this.promiseStatus === Status.pending) {
          this.resolveCall.push(_this, function () {
            try {
              result = resolveCall()
            } catch (e) {
              reject(e)
            }
          })
        } else if (_this.promiseStatus === Status.resolved) {
          try {
            result = resolveCall()
          } catch (e) {
            reject(e)
          }
        }
      }
      if (rejectCall) {
        if (_this.promiseStatus === Status.pending) {
          this.rejectCall.push(_this, function () {
            try {
              rejectCall()
            } catch (e) {
              reject(e)
            }
          })
        } else if (_this.promiseStatus === Status.rejected) {
          try {
            result = resolveCall()
          } catch (e) {
            reject(e)
          }
        }
      }
    })
  }

  catch (rejectCall) {
    return this.then(null, rejectCall)
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