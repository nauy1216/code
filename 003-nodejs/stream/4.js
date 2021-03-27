var fs = require('fs');


var readStream = fs.createReadStream('./test/1.txt', {
    highWaterMark: 10
}); // 创建可读流
var writeStream = fs.createWriteStream('./test/2.txt', {
    highWaterMark: 1
}); // 创建可写流

readStream.on('data', async function(chunk) { // 当有数据流出时，写入数据
    let flag = writeStream.write(chunk);
    console.log(flag)
});

readStream.on('end', function() { // 当没有数据时，关闭数据流
    // writeStream.end();
    // writeStream.uncork()
});

// cork() 方法强制把所有写入的数据都缓冲到内存中。 当调用 stream.uncork() 或 stream.end() 方法时，缓冲的数据才会被输出。
// 主要目的是为了适应将几个数据快速连续地写入流的情况。 writable.cork() 不会立即将它们转发到底层的目标，而是缓冲所有数据块，直到调用 writable.uncork()，这会将它们全部传给 writable._writev()（如果存在）
writeStream.cork()
writeStream.on('drain', function() {
    console.log('drain')
    readStream.resume()
})