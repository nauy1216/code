var EventEmitter = require('events')

class MyEvent extends EventEmitter {

}

var eventBus = new MyEvent()

eventBus.on('send', function(data) {
    console.log('data', data)
})

eventBus.once('send', function(data) {
    console.log('this', this)
})

// 触发事件， 同步执行回调
eventBus.emit('send', {
    message: 'hhh'
})

eventBus.emit('send', {
    message: 'fff'
})