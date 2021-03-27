var arr = new Uint16Array([1,2,3])

// 遍历每一项
for (var b of arr) {
    console.log(b)
}
/*
1
2
3
*/

// 遍历每一个字节，因为每一项都是16位的整数， 所以会输出6次
for (var b of Buffer.from(arr.buffer)) {
    console.log(b)
}
/*
1
0
2
0
3
0
*/