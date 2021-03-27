/**
Buffer.concat(list[, totalLength])
返回一个合并了 list 中所有 Buffer 实例的新 Buffer。
如果 list 中没有元素、或 totalLength 为 0，则返回一个长度为 0 的 Buffer。
如果没有提供 totalLength，则计算 list 中的 Buffer 实例的总长度。 但是这会导致执行额外的循环用于计算 totalLength，因此如果已知长度，则明确提供长度会更快。
如果提供了 totalLength，则会强制转换为无符号整数。 如果 list 中的 Buffer 合并后的总长度大于 totalLength，则结果会被截断到 totalLength 的长度。
 */

 
const buf1 = Buffer.from([1, 2, 3]);
const buf2 = Buffer.from([4, 5, 6]);
const buf3 = Buffer.from([201, 202, 203]);
const totalLength = buf1.length + buf2.length + buf3.length;

console.log(totalLength); // 9
const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
console.log(bufA); // <Buffer 01 02 03 04 05 06 c9 ca cb>
console.log(bufA.length); // 9

