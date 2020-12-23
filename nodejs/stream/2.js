var fs = require('fs');
var readStream = fs.createReadStream('./test/1.txt', {
    highWaterMark: 10
}); // 创建可读流
var writeStream = fs.createWriteStream('./test/2.txt', {
    highWaterMark: 1
}); // 创建可写流

readStream.on('data', async function(chunk) { // 当有数据流出时，写入数据
    // let flag = await new Promise((resolve) => {
    //     let f = writeStream.write(chunk);
    //     resolve(f)
    // }).catch(err => console.log(err))
    // console.log(flag)

    let flag = writeStream.write(chunk);
    console.log(flag)
    if(!flag){
        readStream.pause()
    }
    // console.log(chunk.toString(), '\n==============')
    // console.log(writeStream.writableBuffer)
    // console.log(readStream.readableBuffer)
});

readStream.on('end', function() { // 当没有数据时，关闭数据流
    writeStream.end();
});

writeStream.on('drain', function() {
    console.log('drain')
    readStream.resume()
})