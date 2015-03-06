
var blogs = require('./controllers');

module.exports = [
    {
        method: 'GET',
        path: '/blogs/all',
        config: {
            description: 'Returns list of all blogs.',
            tags: ['api']
        },
        handler: blogs.getAll
    }
]
