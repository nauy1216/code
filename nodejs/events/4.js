var EventEmitter = require('events')

class MyEvent extends EventEmitter {

}

var eventBus = new MyEvent()



function fn() {

}

// MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 ev1 listeners added to [MyEvent]. Use emitter.setMaxListeners() to increase limit
// 默认1个事件最多绑定10个回调
// 局部修改
// eventBus.setMaxListeners(eventBus.getMaxListeners() + 11)

// 全局修改 慎用
// EventEmitter.defaultMaxListeners
for (var i=0; i < 20; i++) {
    eventBus.on('ev' + i, fn)
}

//  返回所有的事件名
console.log(eventBus.eventNames())