const express = require('express')
const router = require('./router')
const app = express()
const bodyParser = require('body-parser')


app.engine('html',require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public/', express.static('../登录注册/public'));

app.set('views','../登录注册/views')

router(app)

app.listen(3000,function(){
    console.log('running 3000');
})