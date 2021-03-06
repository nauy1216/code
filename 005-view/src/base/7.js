/**
一、任务队列： 宏任务， 微任务, RAF
执行顺序 微任务 > RAF > Channel > 宏任务

执行一个宏任务(先执行同步代码)-->执行所有微任务-->UI render-->执行下一个宏任务-->执行所有微任务-->UI render-->......
根据HTML Standard，一轮事件循环执行结束之后，下轮事件循环执行之前开始进行UI render。
即：macro-task任务执行完毕，接着执行完所有的micro-task任务后，此时本轮循环结束，开始执行UI render。
UI render完毕之后接着下一轮循环。但是UI render不一定会执行，因为需要考虑ui渲染消耗的性能以及有没有ui变动

二、宏任务
setTimeout()

二、微任务
Promise.resolve()、queueMicrotask()、MutationObserver
使用Promise.resolve和queueMicrotask、MutationObserver的优先级是一样的。
1、为什么需要使用微任务？
从微任务本身的概念来说的话，就是当我们期望某段代码，不阻塞当前执行的同步代码，同时又期望它尽可能快地执行时，我们就需要它

三、RAF
requestAnimationFrame()

四、channel
MessageChannel
 */
function Observer(userCallBack) {
  // 选择需要观察变动的节点
  const targetNode = document.createElement('div');

  // 观察器的配置（需要观察什么变动）
  const config = {
    attributes: true,
    childList: true,
    subtree: true
  };

  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    // for (let mutation of mutationsList) {
    //   if (mutation.type === 'childList') {
    //     console.log('A child node has been added or removed.');
    //   } else if (mutation.type === 'attributes') {
    //     console.log('The ' + mutation.attributeName + ' attribute was modified.');
    //     userCallBack()
    //   }
    // }
    userCallBack()
    // 之后，可停止观察
    observer.disconnect();
  };

  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback);

  // 以上述配置开始观察目标节点
  observer.observe(targetNode, config);
  targetNode.id = targetNode.id == 0 ? 1 : 0
}

function channel(callback) {
  var channel = new MessageChannel();
  var port1 = channel.port1;
  var port2 = channel.port2;
  port2.onmessage = function (event) {
    callback()
  }
  port1.postMessage('');
}

setTimeout(() => {
  console.log('setTimeout')
})
channel(() => {
  console.log('channel')
})
requestAnimationFrame(() => {
  console.log('requestAnimationFrame')
})
Promise.resolve().then(() => {
  console.log('Promise')
})

Observer(() => {
  console.log('Observer')
})
queueMicrotask(() => {
  console.log('queueMicrotask')
})


console.log('sync')