
console.log(Buffer.isBuffer(Buffer.alloc(1))) // true
console.log(Buffer.isBuffer(5)) // false

console.log(Buffer.isEncoding('utf8')) // true
console.log(Buffer.isEncoding('utf81')) // false
