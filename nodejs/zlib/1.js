
// 导入模块
const fs = require('fs');
const zlib = require('zlib');
// 创建文件的可读流
const rs = fs.createReadStream('./data.txt');
 
// 创建文件的可写流
const ws = fs.createWriteStream('./data.txt.gzip');
// 创建gzip压缩 流对象，gzip可读可写
const gzip =zlib.createGzip();
// 管道操作

rs.pipe(gzip).pipe(ws);