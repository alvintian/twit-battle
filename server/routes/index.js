var express = require('express');
var router = express.Router();

module.exports = function(knex) {
	// router.get('/message', function(req, res, next) {
	//   res.json('Welcome To React rjfoirf');

	// });
    // let insertuser = {
    //   name: req.body.name,
    //   email: req.body.email
    // };

	router.get('/message', (req, res) => {
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
			.insert([{
				"name": username
			}])
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