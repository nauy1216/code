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
      if (!DepMap.has(prop) && prop in obj) {
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
    },
    deleteProperty(obj, prop) {
      delete obj[prop]
      let dep = DepMap.get(prop)
      if (dep) {
        dep.notify()
        DepMap.delete(prop)
      }
      console.log('deleteProperty', obj, prop)
    }
  })
}

class Dep {
  constructor() {
    this.subscribe = []
  }
  depend(effect) {
    this.subscribe.push(effect)
    effect.depend(this)
  }
  cancel(effect) {
    let index = this.subscribe.indexOf(effect)
    if (index > -1) {
      this.subscribe.splice(index, 1)
    }
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
Dep.target = null

function effect(callback) {
  if (typeOf(callback) === 'Function' && !callback._effect) {
    const effectObj = {
      value: undefined,
      deps: [],
      depend(dep) {
        this.deps.push(dep)
      },
      cancel() {
        this.deps.forEach((dep) => {
          dep.cancel(this)
        })
        this.deps = []
      }
    }
    callback._effect = effectObj
    effectObj.exec = callback
    Dep.target = effectObj
    callback()
  }
  return () => {
    callback._effect.cancel()
  }
}

let p = Observer({
  a: 1,
  b: {
    c: 1
  }
})
let cancel = effect(() => {
  console.log('effect ===> p.a', p.a)
})
// // console.log('p.b.c', p.b.c)
// // cancel()
setTimeout(() => {
  delete p.a
}, 2000)