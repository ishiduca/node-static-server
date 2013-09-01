function decode (str) {
   return str.split('/').map(function (str) { return decodeURIComponent(str) }).join('/')
}

module.exports = function createServer (params) {
    'use strict'

    if (! params || ! params.root)
        throw new Error('not found "root"')

    var path  = require('path')
    var url   = require('url')
    var http  = require('http')
    var filed = require('filed')

    var typeIsMiddlewares = Object.prototype.toString.call(params.middles)
    var middles = typeIsMiddlewares === '[object Array]'
                ? params.middles.filter(function (middle) {
                      return typeof middle === 'function'
                  })
                : typeIsMiddlewares === '[object Function]'
                ? [ params.middles ]
                : []


    middles.push(function statics (req, res) {
        var pathname = url.parse(req.url).pathname
        if (pathname === '/')
            pathname = params.index || '/index.html'

        var filepath = path.join(params.root, decode(pathname))

        filed(filepath).pipe(res)

        console.log( '%s "%s" -> "%s"'
          , req.method.toUpperCase()
          , pathname
          , filepath
        )
    })


    return http.createServer(function onRequest (req, res) {
        var next = function (n) {
            if (typeof middles[n] !== 'function') return
            middles[n](req, res, function _next () { next(n + 1) })
        }
        next(0)
    })
}
