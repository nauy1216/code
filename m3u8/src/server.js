const express = require('express')
const app = express()

app.use('/f',express.static(__dirname + '/static'));

app.listen(9527, err => {
    if (!err) {
        console.log('9527')
    }
})