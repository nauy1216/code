/*
在默认情况下，Service Worker 必定会每24小时被下载一次，如果下载的文件是最新文件，那么它就会被重新注册和安装，
但不会被激活，当不再有页面使用旧的 Service Worker 的时候，它就会被激活。
*/

this.addEventListener('install', function (event) {
    console.log('serviceWorker insatll 安装成功');
    console.log('event', event)
    event.waitUntil( // ExtendableEvent.waitUntil() 方法扩展了事件的生命周期。在服务工作线程中，延长事件的寿命从而阻止浏览器在事件中的异步操作完成之前终止服务工作线程。
        caches.open('v1').then(function(cache) { // caches也为service worker内部的全局变量
            return cache.addAll([
                '/sw',
                '/sw/index.html',
                '/sw/main.js'
            ]);
        })
    );
});

this.addEventListener('activate', function (event) {
    console.log('ServiceWorker activate 激活成功');
});

this.addEventListener('message', function (event) {
    console.log(event.data); // this message is from page
});