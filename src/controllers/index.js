var feed = require('feed-read');
var request = require('request');

module.exports = blogs;

function blogs () {

}

blogs.getAll = function (req, reply) {
  //TODO: Handle facebook tech blog which probably requires an accept header properly set (see previous commit with other lib)
  //TODO: With website URL, get the proper RSS feed from it.
  //TODO: Store all proper web/rss feeds somewhere
  //TODO: periodically loop through them and get new articles, and store them
  //TODO: Clean up API instead of one monolithic endpoint
  feed("http://yahooeng.tumblr.com/rss", function(err, articles) {
  if (err) throw err;
      var myarticles = [];
      articles.forEach(function (article){
        //console.log('%s - %s (%s)', article.date, article.title, article.link);
        myarticles.push(article.title);
      });
      reply(myarticles);
  // Each article has the following properties:
  //
  //   * "title"     - The article title (String).
  //   * "author"    - The author's name (String).
  //   * "link"      - The original article link (String).
  //   * "content"   - The HTML content of the article (String).
  //   * "published" - The date that the article was published (Date).
  //   * "feed"      - {name, source, link}
  //
  });
};

function parseAtom (err, articles) {
  if (err) throw err;
  console.log("Atom: ", articles);
  // Each article has the following properties:
  //
  //   * "title"     - The article title (String).
  //   * "author"    - The author's name (String).
  //   * "link"      - The original article link (String).
  //   * "content"   - The HTML content of the article (String).
  //   * "published" - The date that the article was published (Date).
  //   * "feed"      - {name, source, link}
  //
};

function parseRSS (err, articles) {
  if (err) throw err;
  console.log("RSS: ", articles);
  // Each article has the following properties:
  //
  //   * "title"     - The article title (String).
  //   * "author"    - The author's name (String).
  //   * "link"      - The original article link (String).
  //   * "content"   - The HTML content of the article (String).
  //   * "published" - The date that the article was published (Date).
  //   * "feed"      - {name, source, link}
  //
};

// function callback (error, meta, articles){
//   if (error) {
//     //TODO: figure out why this is erroring, no matter what the feed. Momemntjs error initially but is that really it?
//     //console.error(error);
//   } else {
//     console.log('Feed info');
//     console.log('%s - %s - %s', meta.title, meta.link, meta.xmlurl);
//     console.log('Articles');
//     articles.forEach(function (article){
//       //console.log('%s - %s (%s)', article.date, article.title, article.link);
//       console.log(article.title);
//     });
//   }
// }
