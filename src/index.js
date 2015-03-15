var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8888 });
var routes = require('./routes');
server.route(routes);

var pack = require('../package'),
swaggerOptions = {
    basePath: 'http://localhost:8000',
    apiVersion: pack.version
};

server.views({
    engines: {
      html: require('hapi-dust')
    },
    compileMode: 'async', // global setting
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layout',
    //helpersPath: './views/helpers'
});

server.register({
    register: require('hapi-swagger'),
    options: swaggerOptions
}, function (err) {
    if (err) {
        server.log(['error'], 'hapi-swagger load error: ' + err)
    }else{
        server.log(['start'], 'hapi-swagger interface loaded')
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
