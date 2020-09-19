/**
  defineProperty与Proxy的区别
 */

function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

function Observer(data) {
  const DepMap = new Map()
  return new Proxy(data, {
    set(obj, prop, value) {
      // console.log('set', obj, prop, value)
      let oldValue = obj[prop]
      let newValue = obj[prop] = typeOf(value) === 'Object' ? Observer(value) : value
      if (oldValue !== newValue) {
        let dep = DepMap.get(prop)
        if (dep) {
          dep.notify()
        }
      }
    },
    get(obj, prop) {
      // console.log('get', obj, prop)
      if (!DepMap.has(prop)) {
        DepMap.set(prop, new Dep())
      }
      let dep = DepMap.get(prop)
      let value = obj[prop]
      if (typeOf(value) === 'Object') {
        value = Observer(value)
      }
      if (Dep.target) {
        dep.depend(Dep.target)
      }
      return value
    }
  })
}

class Dep {
  constructor() {
    this.subscribe = []
  }
  depend(effect) {
    this.subscribe.push(effect)
  }
  notify() {
    let arr = this.subscribe.slice()
    for (let effect of arr) {
      try {
        effect.exec()
      } catch (e) {
        console.error(e)
      }
    }
  }
}

function effect(callback) {
  if (typeOf(callback) === 'Function' && !callback._effect) {
    const effectObj = {
      value: undefined
    }
    callback._effect = effectObj
    effectObj.exec = callback
    Dep.target = effectObj
    callback()
  }
}

Dep.target = null

let p = Observer({
  a: 1,
  b: {
    c: 1
  }
})

effect(() => {
  console.log('effect ===> p.a', p.a)
})
// console.log('p.b.c', p.b.c)

setTimeout(() => {
  p.a = 123
}, 2000)