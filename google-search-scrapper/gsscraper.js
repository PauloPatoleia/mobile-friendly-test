var scraper = require('google-search-scraper');

var results = []

/**
 * gsscraper
 * @param {object} options
 * @return {Array of results}
 */

var gsscraper = (options) => {
    
            return new Promise((resolve, reject) => {
            
            var i = 0
            
            scraper.search(options, function(err, url) {
            // This is called for each result
            if(err) throw err;
            results.push(url)
            i++
            // resolve only once all api calls have been successful
            if(i === options.limit) resolve(results)
        });
   
    })
}

module.exports = gsscraper
