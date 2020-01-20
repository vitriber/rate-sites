var Crawler = require('simplecrawler');

var port = 80;
var exclude = ['gif', 'jpg', 'jpeg', 'png', 'ico', 'bmp', 'ogg', 'webp',
  'mp4', 'webm', 'mp3', 'ttf', 'woff', 'json', 'rss', 'atom', 'gz', 'zip',
  'rar', '7z', 'css', 'js', 'gzip', 'exe'];
var exts = exclude.join('|');
var regex = new RegExp('\.(' + exts + ')', 'i'); // This is used for filtering crawl items.
var crawler = new Crawler('www.website.com'); 

var pages = []; // This array will hold all the URLs

// Crawler configuration
crawler.initialPort = port;
crawler.initalPath = '/';

crawler.addFetchCondition(function (parsedURL) {
  return !parsedURL.path.match(regex); // This will reject anything that's not a link.
});

// Run the crawler
crawler.start();

crawler.on('fetchcomplete', function(item, responseBuffer, response) {
  pages.push(item.url); // Add URL to the array of pages
});