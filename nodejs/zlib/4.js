//导入模块
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
//创建http服务
http.createServer((req, res) => {
    const rs = fs.createReadStream('./index.html');
    //判断 浏览器是否需要 压缩版的
    if (req.headers['accept-encoding'].indexOf('gzip') != -1) {
        console.log('压缩')
        //设置响应头
        res.writeHead(200, {
           'content-encoding': 'gzip'
        });
        rs.pipe(zlib.createGzip()).pipe(res);
    } else {
        //不压缩
        rs.pipe(res);
    }
}).listen(8080, () => {
    console.log('http server is running on port 8080');
});