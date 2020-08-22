// @ts-check
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();


// logger

app.use(async (ctx, next) => {
    console.log("logger before==> ")
    await next();
    const rt = ctx.response.get('X-Response-Time');
    // console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    // console.log("ctx.path ==> ", ctx.path)
    console.log("logger ==> ")
    ctx.body += ' logger';
});
  
// x-response-time
app.use(async (ctx, next) => {
    console.log("x-response-time before==> ")
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    ctx.body += 'x-response-time';
    console.log("x-response-time ==> ")
});
  
// response
// app.use(async ctx => {
//     ctx.body = ctx.body + 'response ';
//     console.log("response ==> ")
// });

router.get('/test', (ctx, next) => {
    ctx.body = 'gg  '
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(9576);