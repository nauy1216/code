/*
hybird

Hybrid App，俗称混合应用，即混合了 Native技术 与 Web技术 进行开发的移动应用。现在比较流行的混合方案主要有三种，主要是在UI渲染机制上的不同：
1、基于 WebView UI 的基础方案，市面上大部分主流 App 都有采用，例如微信JS-SDK，
通过 JSBridge 完成 H5 与 Native 的双向通讯，从而赋予H5一定程度的原生能力。
2、基于Native UI的方案，例如 React-Native、Weex。在赋予 H5 原生API能力的基础上，
进一步通过 JSBridge 将js解析成的虚拟节点树(Virtual DOM)传递到 Native 并使用原生渲染。
3、另外还有近期比较流行的 小程序方案，也是通过更加定制化的 JSBridge，
并使用双 WebView 双线程的模式隔离了JS逻辑与UI渲染，形成了特殊的开发模式，
加强了 H5 与 Native 混合程度，提高了页面性能及开发体验。


参考文档：
https://segmentfault.com/a/1190000015678155
https://segmentfault.com/a/1190000015812582

*/