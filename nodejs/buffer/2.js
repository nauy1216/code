// 当字符串数据被存储入 Buffer 实例或从 Buffer 实例中被提取时，可以指定一个字符编码。
var buf = Buffer.from('刘', 'ascii')
console.log(buf) // <Buffer 18>
console.log(buf.toString('ascii')) // 中文使用ascii编码会出现问题
console.log(buf.toString('hex')) // 18

var buf1 = Buffer.from('刘', 'utf-8')
console.log(buf1) // <Buffer e5 88 98>
console.log(buf1.toString('utf-8')) // 刘
console.log(buf1.toString('hex')) // e58898