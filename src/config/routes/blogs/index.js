module.exports = [
    {
        method: 'GET',
        path: '/blogs/all',
        config: {
            description: 'Returns list of all blogs.',
            tags: ['api']
        },
        handler: function (request, reply) {
            reply("Got here man.");
        }
    }
]
