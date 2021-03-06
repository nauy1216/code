/**
 */

function throttle(callback, time, context) {
  let timer
  let lastTime
  let dist
  return function (args) {
    if (!lastTime) {
      lastTime = +new Date()
      return callback.call(context, ...args)
    } else {
      dist = +new Date() - lastTime
      if (dist >= time) {
        lastTime = +new Date()
        return callback.call(context, ...args)
      }
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        callback.call(context, ...args)
      }, time - dist)
    }
  }
}

function debounce(callback, time, context) {
  let timer
  return function (args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback.call(context, ...args)
    }, time)
  }
}

// Promise