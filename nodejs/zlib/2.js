// 导入模块
const fs = require('fs');
const zlib = require('zlib');
let src;
let dst;
// 获取压缩的源文件和目录文件
if (process.argv[2]) {
    src = process.argv[2];
} else {
    throw new Error('请指定源文件');
}
if (process.argv[3]) {
    dst = process.argv[3];
} else {
    throw new Error('请指定目标文件');
}
// 创建文件的可读流
const rs = fs.createReadStream(src);
// 创建文件的可写流
const ws = fs.createWriteStream(dst);
 
const gzip =zlib.createGzip();
// 管道操作
rs.pipe(gzip).pipe(ws);