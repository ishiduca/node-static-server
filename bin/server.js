#!/usr/bin/env node
'use strict'

// ROOT=$PWD/t/public PORT=3001 node bin/server

var root = process.env.ROOT || __dirname
var port = process.env.PORT || 3000

var path = require('path')
var app  = require(path.join( __dirname, '../server'))({root: root})

app.listen(port, function () {
    console.log('server start to listen on port "%s"', port)
    console.log('root dir - "%s"', root)
})
