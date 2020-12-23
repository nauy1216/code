const fs = require('fs');
const zlib = require('zlib');
// 判断存在参数
if (!process.argv[2] && !process.argv[3]) {
    throw new Error('请指定参数');
}
// 创建文件的可读流
const rs = fs.createReadStream(process.argv[2]);
// 创建文件的可写流
const ws = fs.createWriteStream(process.argv[3]);
const gzip =zlib.createGunzip();
// 管道操作
rs.pipe(gzip).pipe(ws);
console.log('解压成功'); 