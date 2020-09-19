/**
 deepClone、shallowClone
 1、JSON.parse(JSON.stringify())
  (1) 深拷贝, 
 （2) 属性值不支持Function、Regexp、Date、undefined, 
  (3)没有对象识别, 
  (4)对象不能循环引用
 2、递归
 深拷贝
 3、Object.assign()、扩展运算符
 浅拷贝
 */

function deepCloneByJSON(obj) {
  return JSON.parse(JSON.stringify(obj))
}

console.log(deepCloneByJSON({
  number: 1,
  string: 'www',
  bool: false,
  nullK: null,
  undefinedK: undefined, // 值是undefined时会过滤掉
  symbol: Symbol('123'), // 被过滤掉
  arr: [
    [1, 2], 3
  ],
  func: function () {}, //  值是function时会过滤掉
  reg: /\d/g, //  变成 {}
  date: new Date() // 变成 "2020-09-19T03:31:42.124Z"
}))


function deepClone(obj) {
  let type = typeOf(obj)
  console.log(type)
  switch (type) {
    // 基本类型直接返回
    case 'String':
    case 'Number':
    case 'Boolean':
    case 'Undefined':
    case 'Null':
    case 'Symbol': {
      return obj
    }

    case 'Date': {
      return new Date(obj.getTime())
    }

    case 'RegExp': {
      let args = '' + (obj.global ? 'g' : '') + (obj.ignoreCase ? 'i' : '') + (obj.multiline ? 'm' : '')
      let reg = new RegExp(obj.source, args)
      reg.lastIndex = obj.lastIndex
      return reg
    }

    // 函数类型直接返回
    case 'Function': {
      return obj
    }

    case 'Array': {
      return obj.map(item => deepClone(item))
    }

    case 'Object': {
      let Ctor = obj.constructor
      let res = Ctor ? new Ctor() : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          res[key] = deepClone(obj[key])
        }
      }
      return res
    }

    default: {
      return obj
    }
  }

  function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }
}

function Person() {
  this.name = 'liu'
  this.age = 14
}

console.log(deepClone(new Person()))

console.log(deepClone({
  number: 1,
  string: 'www',
  bool: false,
  nullK: null,
  undefinedK: undefined,
  symbol: Symbol('123'),
  func: function () {},
  arr: [
    [1, 2], 3
  ],
  date: new Date(),
  reg: /\d/g
}))

// debugger
console.log(deepClone('jj'))
console.log(deepClone(1))
console.log(deepClone(false))
console.log(deepClone(undefined))
console.log(deepClone(null))
console.log(deepClone(Symbol('1233')))