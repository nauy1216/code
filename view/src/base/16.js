function noop() {}
class MsgQueue {
  constructor(name, options = {}) {
    this.name = name
    this.message = []
    this.queue = []
    this.sync = true
    this.messageMaxCount = 10
    this.storage = options.storage
    this.message = this.getStorageItem()
  }

  on(fn, options = {}) {
    this.queue.push(fn)
    // 在有历史消息后才会立即执行
    if (options.immediate && this.message.length > 0) {
      fn(...this.message[this.message.length - 1], this.message)
    }
  }

  emit(...data) {
    this.message.push([...data])
    if (this.message.length > this.messageMaxCount) {
      this.message.shift()
    }
    this.setStorageItem()
    this.queue.forEach(fn => queue(...data))
  }

  off(fn) {
    if (!fn) {
      this.queue = []
    } {
      let index = this.queue.indexOf(fn)
      if (index > -1) {
        this.queue.splice(index, 1)
      }
    }
  }

  clearMessage() {
    this.message = []
    this.setStorageItem()
  }

  getStorageItem() {
    let message = []
    if (this.storage) {
      try {
        message = JSON.parse(this.storage.getItem(this.name))
      } catch (e) {
        message = []
        console.error(e)
      }
    }
    return message
  }

  setStorageItem() {
    if (this.storage) {
      this.storage.setItem(this.name, JSON.stringify(this.message))
    }
  }
}

class EventBus {
  constructor() {
    this.events = {}
  }
  on(name, fn, options = {}) {
    let event = this.getEvent(name)
    event.on(fn, options)
  }
  emit(name, ...data) {
    let event = this.getEvent(name)
    event.emit(...data)
  }
  off(name, fn) {
    if (!name && !fn) {
      this.events = {}
    } else {
      let event = this.getEvent(name)
      event.off(fn)
    }
  }
  getEvent(name) {
    if (!this.events[name]) {
      this.events[name] = new MsgQueue(name)
    }
    return this.events[name]
  }
}

let eventBus = new EventBus({
  messageMaxCount: 10
})
eventBus.emit('change', 1234)
eventBus.emit('change', 343)
eventBus.emit('change', 434)
eventBus.emit('change', 433)
eventBus.emit('change', 56765)
eventBus.emit('change', 6756)
eventBus.emit('change', 34543)
eventBus.emit('change', 124543534)
eventBus.emit('change', "sdfsdfsd")
eventBus.emit('change', 124543534)
eventBus.emit('change', "sdfsdfdf")
eventBus.on('change', (data, datalist) => {
  console.log('data', data, datalist)
}, {
  immediate: true
})