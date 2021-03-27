/**
  动画
  1、requestAnimationFrame()、cancelAnimationFrame()
  你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，
  该回调函数会在浏览器下一次重绘之前执行。
  当你准备更新动画时你应该调用此方法。
  这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)。
  回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。
  为了提高性能和电池寿命，因此在大多数浏览器里，当requestAnimationFrame() 运行在后台标签页或者隐藏的<iframe> 里时，
  requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。

  2、重排重绘
  文档：
  https://www.imooc.com/article/45936

  HTML渲染大致分为如下几步：
  （1）HTML被HTML解析器解析成DOM Tree, css则被css解析器解析成CSSOM Tree。
  （2）DOM Tree和CSSOM Tree解析完成后，被附加到一起，形成渲染树（Render Tree）。
  （3）节点信息计算(重排)，这个过程被叫做Layout(Webkit)或者Reflow(Mozilla)。即根据渲染树计算每个节点的几何信息。
  （4）渲染绘制(重绘)，这个过程被叫做(Painting 或者 Repaint)。即根据计算好的信息绘制整个页面。

  重排:
  节点信息计算(重排)，这个过程被叫做Layout(Webkit)或者Reflow(Mozilla)。即根据渲染树计算每个节点的几何信息。
  重绘：
  渲染绘制(重绘)，这个过程被叫做(Painting 或者 Repaint)。即根据计算好的信息绘制整个页面。

  理论上，每一次的dom更改或者css几何属性更改，都会引起一次浏览器的重排/重绘过程，而如果是css的非几何属性更改，则只会引起重绘过程。
  所以说重排一定会引起重绘，而重绘不一定会引起重排。

  3、与setTimeout的区别
 */
(function () {
  var callback = data => {
    var time = +new Date()
    while (+new Date() - time < 1000) {}
    console.log('data', data)
    requestAnimationFrame(callback)
  }
  requestAnimationFrame(callback)
})()