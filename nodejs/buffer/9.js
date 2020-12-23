const str = 'abc';
const buf = Buffer.allocUnsafe(str.length);

for (let i = 0; i < str.length; i++) {
  buf[i] = str.charCodeAt(i)
}
// console.log('刘'.charCodeAt(0)) // 21016
console.log(buf) // <Buffer 61 62 63>