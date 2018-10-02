const axios = require('axios')

/**
 * req
 * this function takes an api url and uses the fetch api to get the response.
 * if the request worked, it will return the response in a promise
 * @param {string} url
 * @return {Promise}
 */
 
function req(url) {
  return new Promise((resolve, reject) => {
    axios.post('https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key=AIzaSyC8gv_xXhkCUoT6ZA7WAuxMqRaGnpFLRmA', {
                 url: url
                }).then(
                    response => {
                    resolve(response.data.mobileFriendliness);
                     },
                     error => {
                        console.log(error.Error + '1')
                        reject(error);
                 }
              );
          });
        }
        
        
/**
* calculateOperationTime
* @param { array.length } arrayLenght
* @param { integer / seconds } timeout
* @return {string with dinamic time}
*/
        
        
var calculateOperationTime = function(arrayLength, timeout) {
    
       var time = timeout * (arrayLength + 2)
       var minutes = Math.floor(time / 60)
       var seconds = time - minutes * 60;
       
       if(time <= 60) {
           return 'Tests started, this opration will take less than a minute'
       } else if (time > 61) {
           return `Tests started, this opration will take aproximatly ${minutes} minutes and ${seconds} seconds`
       }
    }

/**
 * batchRequest
 * @param {array of strings} urls
 * @param {integer} timeout in ms
 * @return {Promise}
 */
function batchRequest(urls, timeout) {
    
  return new Promise((resolve, reject) => {
    
    console.log(calculateOperationTime(urls.length, timeout/1000))
    let responses = [];
    
    for (let i = 0; i < urls.length; i++) {
        
      setTimeout(() => {
          
        req(urls[i]).then(
          response => {
            responses.push({url: urls[i], result: response});
            // resolve only once all api calls have been successful
            console.log(response)
            if (urls.length === responses.length) {
                resolve(responses);
            }
          },
          
          error => {
             // handle error
             console.log(error + '2')
             responses.push({url: urls[i], result: 'Test failed'});
             if (urls.length === responses.length) {
                resolve(responses);
             }
          }
        );
      }, timeout * (i + 1));
    }
  });
}



// batchRequest(
//  [
//    "https://www.reddit.com",
//    "https://www.youtube.com"
//  ],
//  25000
//).then(all => {
//  console.log(all);
//});

module.exports = batchRequest
