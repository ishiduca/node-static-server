#!/usr/bin/env node
'use strict'

var path  = require('path')
var minim = require('minimist')
var argv  = minim(process.argv.slice(2), {
    alias: {
        p: 'port'
      , r: 'root'
      , m: 'middles'
      , i: 'index'
    }
  , default: {
        port: 3000
      , root: process.env.PWD
    }
  , string: ['port', 'root', 'index']
})

var required = ['port', 'root']
var extra    = ['index', 'middles']

var params = extra.reduce(function (_params, key) {
    if (argv[key]) _params[key] = argv[key]
    return _params
}
, required.reduce(function (_params, key) {
    if (! argv[key]) throw new Error('"' + key + '" not found')
    _params[key] = argv[key]
    return _params
}, {}))

var typeofMiddles = Object.prototype.toString.call(params.middles)

params.middles = typeofMiddles === '[object Array]'
			   ? params.middles.map(function (middle) {
				     return require(middle)()
			     })
			   : typeofMiddles === '[object String]'
			   ? [ require(params.middles)() ]
			   : []

var app = require(path.join(__dirname , '../server'))(params)

app.listen(params.port, function () {
	console.log(params)
})
