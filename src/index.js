var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8888 });
var routes = require('./config/routes');
server.route(routes);

var pack = require('../package'),
swaggerOptions = {
    basePath: 'http://localhost:8000',
    apiVersion: pack.version
};

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

server.route({
    method: 'GET',
    path: '/',
    config: {
        description: 'Base Api',
        notes: 'Returns Hello World.',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                responseMessages: [
                    { code: 400, message: 'Bad Request' },
                    { code: 500, message: 'Internal Server Error'}
                ]
            }
        }
    },
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
