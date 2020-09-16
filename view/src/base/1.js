// call
Function.prototype._call = function() {
    let args = Array.prototype.slice.call(arguments)
    let _this = args[0]
    _this = _this || window
    _this.callFunc = this
    _this.callFunc(...args.slice(1))
    delete _this.callFunc
}
Function.prototype._bind = function() {
    let obj = arguments[0]
    let _this = this
    return function() {
        let args = Array.prototype.slice.call(arguments)
        console.log('args', args)
        return _this._call(obj, ...args)
    }
}
function test(arg1, arg2) {
    console.log(this, arg1, arg2)
}

// test._call({a:1})
test._bind({a:1})(1, 2)