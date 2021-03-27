console.log('outer 1')
queueMicrotask(function() {
    console.log('q 1')
})
console.log('outer 2')
queueMicrotask(function() {
    console.log('q 2')
})
console.log('outer 3')

/*
outer 1
outer 2
outer 3
q 1
q 2
*/