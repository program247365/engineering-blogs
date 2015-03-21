
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
    },
    {
      method: 'GET',
      path: '/blogs/page/{pageId}/per/{count}',
      config: {
          handler: blogs.getSlice,
          description: '[Not implemented yet] Returns articles of all blogs, that allows you to page through them.',
          tags: ['api']
      }
    }
]
