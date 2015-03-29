var feed = require('feed-read');
var request = require('request');
var _ = require('lodash');
var finder  = require('find-rss');
var async = require('async');
var url = require('url'); //had to add this
var logger = require('./../utils/logger');

function blogs () {
}

//TODO: Pull this out into database, obviously
var sites = [
   'https://nodesource.com/blog/', //no feed at all :(
   'http://eng.joingrouper.com', //good
   'http://eng.rightscale.com', //just hangs, I'm assuming can never find feed?
   'https://engineering.linkedin.com/blog', //good
   'http://blog.stackoverflow.com/', //good
   'http://googledevelopers.blogspot.com/', //good
   'http://yahooeng.tumblr.com/', //good
   'http://code.flickr.net/', //good
   'http://engineering.pinterest.com/', //good
   'https://blog.twitter.com/engineering', //good
   'http://blog.42floors.com/', // no rss feed exists in html :(
   'http://engineering.flipboard.com/', //good
   'http://codeascraft.com/', //good
   'http://engineering.foursquare.com/', //good
   'http://instagram-engineering.tumblr.com/', //hangs? http://instagram-engineering.tumblr.com/rss
   'https://code.facebook.com/posts/', //returns null; must provide some specifics in request header and x-header
   'https://labs.spotify.com/', //good
   'http://engineering.voxer.com/', //returns null; go check what error is
   'http://www.ebaytechblog.com/', //good
   'http://tech.gilt.com/', //good
   'http://engineering.heroku.com/', //good
   'http://www.thumbtack.com/engineering/', //good
   'http://engineering.silk.co/', //good
   'https://www.paypal-engineering.com/', //good
   'https://zynga.com/blogs/engineering', //good
   'http://blog.risingstack.com/', //good
   //'https://tech.blog.box.com/', // errors with '{ [Error: unable to verify the first certificate] code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' }'
   'https://engineering.groupon.com/', // times out?
   'http://dev.hubspot.com/blog', //good
   'http://code.hootsuite.com/', //good
   'http://www.buzzfeed.com/techblog', // returns null; go check what error is
   'https://medium.com/medium-eng', //good
   'http://code.mixpanel.com' //good
];

blogs.list = function (req, reply) {
    reply(sites);
    return {
      list: blogs.list
    };
};

blogs.getSlice = function (req, reply) {
    reply('Not implemented yet.');
    return {
      getSlice: blogs.getSlice
    };
};

blogs.getAll = function (req, reply) {
  // TODO: Add in request timeout
    async.map(sites,
      function(site, callback) {
        finder(site, function(error, feeds, body) {
          // If error is an error, then invoke the callback
          // with the error. this is propogated to async's 3rd argument.
          if(_.isError(error))
          {
            logger.error("Error in finding feed for " + site + ": " + error);
            return callback(error);
          }
          if(_.isEmpty(feeds))
          {
            logger.error("Error in feed for " + site + ". Is empty: " + error);
            return callback(null, []);
          }
          // What happens if href is not /atom.xml or /rss/ or /feed.xml?
          var first = _(_.first(feeds).href);
          var fullUrl;
          //TODO: A better test: contains('http(s)://'), if not, then take rel url and concatenate site url and return
          // this is janky, and error-prone the way it's currently done
           if(!first.includes('/atom.xml') || !first.includes('/rss/') || !first.includes('/feed.xml')){
              fullUrl = _.first(feeds).url;
           } else {
              return callback(null, []);
           }

          feed(fullUrl, function(error, articles) {
            if(_.isError(error))
            {
              logger.error("Error with parsing feed: " + error);
              return callback(error);
            }
            var results = _.map(articles, function(article) {
              return {title: article.title, link: article.link, published: article.published, author: article.author, site: article.feed.link};
            });
            // Invoke callback with the completed results
            callback(null, results);
          });
        });
      },
      function(err, results) {
        if(err) {
          logger.error("Error with getting results: " + err);
        }
        var flattened = _.flatten(results); //flatten array
        var sorted = _.sortBy(flattened, "published"); //sort by published
        var revSorted = _(sorted).reverse().value(); // descending order, newest first
        //TODO: logging if errors
        reply(err, revSorted);
      });

  return {
    getAll: blogs.getAll
  };
};

module.exports = blogs;
