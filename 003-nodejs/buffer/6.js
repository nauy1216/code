const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('2123');
const arr = [buf1, buf2];

// 比较两个buffer
// console.log(arr.sort(Buffer.compare)); // [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
console.log(Buffer.compare(buf1, buf2)) // 1

