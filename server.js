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

    return http.createServer(function _onRequest (req, res) {
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
}
