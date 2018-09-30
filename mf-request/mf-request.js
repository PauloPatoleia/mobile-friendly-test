const axios = require('axios')


// CLACULATE HOW MUCH TIME IT WILL TAKE TO MAKE ALL REQUESTS

var calculateOperationTime = function(arrayLength) {
    
       var time = 15 * (arrayLength + 2)
       var minutes = Math.floor(time / 60)
       var seconds = time - minutes * 60;
       
       if(time <= 60) {
           return 'Tests started, this opration will take less than a minute'
       } else if (time > 61) {
           return `Tests started, this opration will take aproximatly ${minutes} minutes and ${seconds} seconds`
       }
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function mfCheck(arrayOfLinks) {
    
    var results = []
    var timeout = 15000
    
    console.log(calculateOperationTime(arrayOfLinks.length))
    
    
    arrayOfLinks.map((link) => {
            
            setTimeout( () => {
                axios.post('https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key=AIzaSyC8gv_xXhkCUoT6ZA7WAuxMqRaGnpFLRmA', {
                 url: link
                })
                .then((res) => {
                  results.push({ link: link, result: res.data.mobileFriendliness })
                  console.log(res.data.mobileFriendliness)
                })
                .catch((error) => {
                  console.error(error)
                })
            }
                , timeout);
            
            timeout += 15000
    
      })
      
      setTimeout(function() {
          console.log(results)
          return results
      }, 15000 * arrayOfLinks.length + 30000) 
   }
   
  

// EXPORTS
   
   module.exports = mfCheck
   
////////////////////////////////////////////////////////////////////////