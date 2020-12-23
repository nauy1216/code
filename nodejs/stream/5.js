var {PassThrough} = require('stream')
const pass = new PassThrough();
const writable = new PassThrough();

// pass.pipe(writable);
// pass.unpipe(writable);
// readableFlowing 现在为 false。

// pass.on('data', (chunk) => { console.log(chunk.toString()); });
// pass.write('ok'); // 不会触发 'data' 事件。
// pass.resume(); // 必须调用它才会触发 'data' 事件。

function * generate() {
    yield 'hello';
    yield 'streams';
}

let gen = generate()
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())