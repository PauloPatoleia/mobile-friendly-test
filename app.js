const axios = require('axios')
const mfCheck = require('./mf-request/test.js')
const gsscraper = require('./google-search-scrapper/gsscraper')

var options = {
  query: "fotostudio%20hambur",
  host: 'www.google.de',
  lang: 'de',
  limit: 10
};

gsscraper(options)
.then((results) => {
    console.log(results)
    return mfCheck(results, 45000)
    .then((testResults) => {
        console.log(testResults)
    }).catch((error) => {
        console.log(error)
    })
})



// var results = mfCheck(links)
