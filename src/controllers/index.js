var feedparser = require('ortoo-feedparser');
var request = require('request');

module.exports = blogs;

function blogs () {

}

blogs.getAll = function (req, reply) {
  var reqObj = {
    //'uri': 'https://code.facebook.com/posts/rss',
    'uri': 'http://engineering.pinterest.com/rss',
    'headers': {
      'Accept': 'application/javascript, application/json',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.76 Safari/537.36'
    }
  };
    request(reqObj, function (err, response, body){
      feedparser.parseString(body)
        .on('article', callback);
  });
};

function callback (error, meta, articles){
  if (error) {
    //TODO: figure out why this is erroring, no matter what the feed. Momemntjs error initially but is that really it?
    //console.error(error);
  } else {
    console.log('Feed info');
    console.log('%s - %s - %s', meta.title, meta.link, meta.xmlurl);
    console.log('Articles');
    articles.forEach(function (article){
      //console.log('%s - %s (%s)', article.date, article.title, article.link);
      console.log(article.title);
    });
  }
}
