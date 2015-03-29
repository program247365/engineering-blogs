var logger = require('./utils/logger');
var Hapi = require('hapi');
var wreck = require('wreck');
var Handlebars = require('handlebars');

var server = new Hapi.Server();
server.connection({ port: 8888 });
var routes = require('./routes');
server.route(routes);

var pack = require('../package'),
swaggerOptions = {
    apiVersion: pack.version
};

server.register({
    register: require('hapi-swagger'),
    options: swaggerOptions
}, function (err) {
    if (err) {
        logger.error("Error in registering swagger: " + err);
        server.log(['error'], 'hapi-swagger load error: ' + err)
    }else{
        logger.log('hapi-swagger interface loaded.');
        server.log(['start'], 'hapi-swagger interface loaded')
    }
});

server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    //layoutPath: './views/layout',
    //helpersPath: './views/helpers'
});

server.route({
    method: 'GET',
    path: '/',
    config: {
        description: 'Returns all results in one page.'
    },
    handler: function (request, reply) {
      var url = server.info.uri + '/blogs/all';

      wreck.get(url, function (err, res, payload) {
        if(payload){
          payload = JSON.parse(payload);
          reply.view('index', {payload: payload});
        } else {
          reply.view('index', err);
        }
      });
    }
});

server.start(function () {
    logger.log('Server running at:', server.info.uri);
    console.log('Server running at:', server.info.uri);
});
