module.exports = function () {
    var url = require('url')
    return function (req, res, next) {
        var pathname = url.parse(req.url).pathname
        if (pathname !== '/xhr') return next()

        var d = ''
        req.on('data', function (c) { d += c })
        req.on('end', function () {
            var parsed
            try {
                parsed = JSON.parse(d)
            } catch (err) {
                res.writeHead(500, {'content-type': 'application/json'})
                res.end(JSON.stringify({error: err.messsage}))
                return console.error(err)
            }

            parsed.error  = 0
            parsed.result = 'ok'

            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(parsed))

            console.log( '%s "%s" -> response "%s"'
              , req.method.toUpperCase()
              , pathname
              , JSON.stringify(parsed, null, 2)
            )
        })
    }
}
