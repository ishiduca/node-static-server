# node-static-server

Serve static files to test

## install

    $ npm install https://github.com/ishiduca/node-static-server/tarball/master -g

## usage

    $ static-server -p 3000 -r $PWD -m ./app.js
    # -p ... port number
    # -r ... root directory
    # -m ... path to middleware files

### example

    $ cd example
    $ static-server -r $PWD/public/ -m $PWD/lib/xhr.js

    # { port: 3000,
    #   root: /path/to/app/public
    #   middles: [ [Function] ] }
