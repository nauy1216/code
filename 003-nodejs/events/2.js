var EventEmitter = require('events')

class MyEvent extends EventEmitter {

}

var eventBus = new MyEvent()

eventBus.on('send', function(data) {
    throw new Error('抛出错误')
    console.log('data', data)
})

eventBus.on('error', function(err) {
    console.log('error')
})

// 触发事件， 同步执行回调
eventBus.emit('send', {
    message: 'hhh'
})

console.log('end')