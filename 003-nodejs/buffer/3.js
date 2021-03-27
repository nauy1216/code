var arr = new Uint32Array(2)
arr[0] = 3000
arr[1] = 4000
// console.log(arr) // Uint32Array [ 3000, 4000 ]
// console.log(arr.buffer) // ArrayBuffer { [Uint8Contents]: <b8 0b 00 00 a0 0f 00 00>, byteLength: 8 }

// 拷贝 `arr` 的内容, 损失了一些数据
var buffer = Buffer.from(arr)
// console.log(buffer) // <Buffer b8 a0>

// 通过使用 TypedArray 对象的 .buffer 属性，可以创建一个与 TypedArray 实例共享相同内存的新 Buffer。
var buffer1 = Buffer.from(arr.buffer)
// console.log(buffer1) // <Buffer b8 0b 00 00 a0 0f 00 00>


// 当使用 TypedArray 的 .buffer 创建 Buffer 时，也可以通过传入 byteOffset 和 length 参数只使用 TypedArray 的一部分。
var arr1 = new Uint16Array(2)  // Uint16Array [ 0, 0 ] 默认值都是0
arr1[0] = 300
arr1[1] = 500
console.log(arr1) // Uint16Array [ 300, 500 ]
console.log(arr1.buffer)// ArrayBuffer { [Uint8Contents]: <2c 01 f4 01>, byteLength: 4 }
console.log(Buffer.from(arr1.buffer, 0, 2)) // <Buffer 2c 01>