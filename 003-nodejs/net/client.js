//chatClient.js
var net = require('net');
process.stdin.resume();
process.stdin.setEncoding('utf8');
var client = net.connect({port: 9988},function(){
    console.log('【本机提示】登录到聊天室');
    process.stdin.on('data',function(data){
        client.write(data);
    })
    client.on("data", function(data) {
        console.log(data.toString());
    });
    client.on('end', function() {
        console.log('【本机提示】退出聊天室');
        process.exit();
    });
    client.on('error', function() {
        console.log('【本机提示】聊天室异常');
        process.exit();
    });

    client.write('hello，我是123')
});