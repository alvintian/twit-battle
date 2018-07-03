var Twitter = require('twitter');
require('dotenv').config()
 
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  debugger
  if (!error) {
    console.log(tweets);
  }
      console.log("twitter apiiiiiiiiiiiiiii")
});


// client.get('favorites/list', function(error, tweets, response) {
//   if(error) throw error;
//   console.log(tweets);  // The favorites.
//   console.log(response);  // Raw response object.
// });

// // client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
// //   if(error) throw error;
// //   console.log(tweet);  // Tweet body.
// //   console.log(response);  // Raw response object.
// // });

// client.post('statuses/update', {status: 'I Love Twitter'})
//   .then(function (tweet) {
//     console.log(tweet);
//   })
//   .catch(function (error) {
//     throw error;
//   })


