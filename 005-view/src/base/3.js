// 原型
/**
1、Math内置对象不是通过new创建的。
Math.constructor === Object //  true

function A(){}
A.constructor === Function // true

var oA = new A()
oA.constructor === A


Function.constructor === Function // true

 */