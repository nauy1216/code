/**
 * 测试setTimeout的执行时间
 */
(function() {
  const t1 = Date.now()
  setTimeout(() => {
    const t2 = Date.now()
    // 理论上这里应该打印1000, 但是打印出来的值大于1000
    // 打印1003，几乎和1000差不多
    console.log(t2 - t1)
  }, 1000)
}())


/**
 * 测试当事件循环阻塞时setTimeout的执行时间
 * 1. timer1和timer2几乎是同时执行的， 并没有间隔1000ms，这是因为事件循环被阻塞了，
 * 导致两个定时器都没有在指定的时间点执行
 * 2. timer4并没有受到影响。
 */
(function() {
  const t1 = Date.now()

  // timer1
  setTimeout(() => {
    const t2 = Date.now()
    // 打印9454, 理论值是1000
    console.log(t2 - t1)
  }, 1000)

  // timer2
  setTimeout(() => {
    const t2 = Date.now()
    // 打印9454, 理论值是2000
    console.log(t2 - t1)
  }, 2000)

    // timer3
    setTimeout(() => {
      const t2 = Date.now()
      // 打印9454, 理论值是9400
      console.log(t2 - t1)
    }, 9400)

    // timer4
    setTimeout(() => {
      const t2 = Date.now()
      // 打印1005, 理论值是1000
      console.log(t2 - t1)
    }, 10000)


  // 下面这段代码的执行时间大约微9454
  let sum = 0
  for(let i=0; i<999999; i++) {
    sum += i;
    for(let i=0; i<9999; i++) {
      sum += i;
    }
  }
}())


/**
 * 测试setInterval
 * 打印
 * 1001
 * 10457
 * 19863
 * 29256
 * 38651
 * 48055
 * 
 */
(function() {
  const t1 = Date.now()

  setInterval(() => {
    const t2 = Date.now()
    console.log(t2 - t1)

    // 下面这段代码的执行时间大约微9454
    let sum = 0
    for(let i=0; i<999999; i++) {
      sum += i;
      for(let i=0; i<9999; i++) {
        sum += i;
      }
    }
  }, 1000)

}())


/**
 * 测试setInterval
 * 打印
 * 1001
 * 10457
 * 19863
 * 29256
 * 38651
 * 48055
 * 
 */
 (function() {
  const t1 = Date.now()

  setInterval(() => {
    const t2 = Date.now()
    // 理论上这里应该打印1000, 但是打印出来的值大于1000
    // 打印1003，几乎和1000差不多
    console.log(t2 - t1)

    // 下面这段代码的执行时间大约微9454
    let sum = 0
    for(let i=0; i<999999; i++) {
      sum += i;
      for(let i=0; i<9999; i++) {
        sum += i;
      }
    }
  }, 9000)

}())