const { Readable } = require('stream');
   
let i = 0;
    
const rs = Readable({
    encoding: 'utf8',
    // 这里传入的read方法，会被写入_read()
    read: (size) => {
        // size 为highWaterMark大小
        // 在这个方法里面实现获取数据，读取到数据调用rs.push([data])，如果没有数据了，push(null)结束流
        if (i < 6) {
            rs.push(`当前读取数据: ${i++}`);
        } else {
            rs.push(null);
        }
    },
    // 源代码，可覆盖
    destroy(err, cb) {
        rs.push(null);
        cb(err);
    }
});
    
rs.on('data', (data) => {
    console.log(data);
    // 每次push数据则触发data事件
})