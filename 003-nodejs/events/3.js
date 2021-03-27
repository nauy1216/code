var EventEmitter = require('events')

class MyEvent extends EventEmitter {

}

var eventBus = new MyEvent()

eventBus.on('newListener', (event, listener) => {
    console.log('注册事件', event, listener)
})

eventBus.on('removeListener', (event, listener) => {
    console.log('移除事件', event, listener)
})


function fn(data) {
    console.log('data', data)
}
eventBus.on('send', fn)

eventBus.off('send', fn)