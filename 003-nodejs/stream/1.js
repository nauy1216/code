// https://www.jianshu.com/p/4eb9077a8956
// https://www.jianshu.com/p/8738832e7515
const stream = require('stream');
var EventEmitter = require('events')
const fs = require('fs')

let readStream = fs.createReadStream('./test/1.txt')
let writeStream = fs.createWriteStream('./test/a.txt')

writeStream.on('finish', (err, data) => {
    console.log('finish')
})


// class MyWritableStream extends EventEmitter{
//     write(a, b, c, d) {
//         console.log(a, b, c, d)
//     }
//     end(a, b, c, d) {
//         console.log(a, b, c, d)
//     }
// }

let write = writeStream.write
writeStream.write = function(data) {
    let str = data.toString()
    str = str.replace(/[0-9]/g, '*')
    console.log(str)
    data = Buffer.from(str)

    write.call(this, data)
}

readStream.pipe(writeStream)
// readStream.pipe(new MyWritableStream()) // .pipe(writeStream)