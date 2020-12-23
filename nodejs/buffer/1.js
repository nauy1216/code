// 创建一个长度为10，且用0填充的Buffer, Buffer的每一个字节都是8位
var buffer1 = Buffer.alloc(10)
// console.log(buffer1) // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 长度为10，用255填充的的Buffer
var buffer2 = Buffer.alloc(10, -254)
// console.log(buffer2) // <Buffer ff ff ff ff ff ff ff ff ff ff>

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
var buffer3 = Buffer.allocUnsafe(10)
// console.log(buffer3)


var buffer4 = Buffer.from([255, 2, 3])
// console.log(buffer4) // <Buffer 01 02 03>

var buffer5 = Buffer.from('刘a')
// console.log(buffer5) // <Buffer e5 88 98 61> 这里的e5是16进制

/**
 如果 size 小于或等于 Buffer.poolSize 的一半，则 Buffer.allocUnsafe() 返回的 Buffer 实例可能是从共享的内部内存池中分配。 
 Buffer.allocUnsafeSlow() 返回的实例则从不使用共享的内部内存池。
*/
var buffer6 = Buffer.allocUnsafeSlow(10)
console.log(buffer6)