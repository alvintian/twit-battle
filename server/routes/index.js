var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
const getBearerToken = require('get-twitter-bearer-token')

const twitter_consumer_key = 'TwLpS2IZT9mzyCpd31C6f2Ykk'
const twitter_consumer_secret = 'nxs5IONxiEdp6CBQEvL48KRju1CMAgQaB6rCbqUyTtyJAvWa4U'
let  twitter_bearer_token = 'AAAAAAAAAAAAAAAAAAAAAHCS6wAAAAAAUrdisbS22LUsBJCl%2BzV%2B2qaEse0%3DFHxzYB2mSY487EtCGN0Il3PdxfdmiLL9M0UCDcVKjUKxCPTbhZ';

getBearerToken(twitter_consumer_key, twitter_consumer_secret, (err, res) => {
	if (err) {
	  // handle error
	} else {
	
	  // bearer token
	  console.log(res.body.access_token)
	  twitter_bearer_token = res.body.access_token;
	}
  })
  

module.exports = function(knex) {
	// router.get('/message', function(req, res, next) {
	//   res.json('Welcome To React rjfoirf');

	// });
    // let insertuser = {
    //   name: req.body.name,
    //   email: req.body.email
	// };
	
	var client = new Twitter({
		consumer_key: 'TwLpS2IZT9mzyCpd31C6f2Ykk',
		consumer_secret: 'nxs5IONxiEdp6CBQEvL48KRju1CMAgQaB6rCbqUyTtyJAvWa4U',
		bearer_token: twitter_bearer_token,
	  });
	
	  var params = {screen_name: 'nodejs'};
	  
	

	router.get('/message', (req, res) => {
		client.get('users/show', params, function(error, tweets, response) {
				if (error){
					console.log(error)
				}

			if (!error) {
			  console.log(tweets);
			}
		  });
		knex
			.select('*')
			.from('users')
			.then(results => {
				console.log(results)
				res.json(results);
			});
	});
	router.get('/character', (req, res) => {
		knex
			.select('*')
			.from('users')
			.then(results => {
				console.log(results)
				res.json(results);
			});
	});
	router.get('/character/:id', (req, res) => {
		//let user_id = req.session.;
		knex
			.select('id')
			.from('users')
			.then(results => {
				console.log(results)
				res.json(results);
			});
	});
	router.get('/battle', (req, res) => {
		knex
			.select('*')
			.from('battle')
			.then(results => {
				console.log(results)
				res.json(results);
			});
	});
	router.get('/battle/:id', (req, res) => {
		knex
			.select('id')
			.from('battle')
			.then(results => {
				console.log(results)
				res.json(results);
			});
	});
	router.post('/NewChar', (req, res) => {
		console.log(req.body,"what is req.body?");
		knex('users')
			.insert({
				name: req.body.character
			})
			.then(results => {
				console.log(results)
				res.json(results);
			});
	});
	router.post('/battle', (req, res) => {
		knex('battle')
			.insert([{
				"red_side_name": redName,
				"blue_side_name": blueName
			}])
			.then(results => {
				console.log(results)
				res.json(results);
			});
	});
	return router;
};