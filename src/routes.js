
var blogs = require('./controllers');

module.exports = [
    {
      method: 'GET',
      path: '/blogs/list',
      config: {
          handler: blogs.list,
          description: 'Returns list of all blogs in the system.',
          tags: ['api']
      },
    },
    {
      method: 'GET',
      path: '/blogs/all',
      config: {
          handler: blogs.getAll,
          description: 'Returns articles of all blogs.',
          tags: ['api']
      }
    }
]
