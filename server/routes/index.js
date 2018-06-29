var express = require('express');
var router = express.Router();

module.exports = function(knex) {
	// router.get('/message', function(req, res, next) {
	//   res.json('Welcome To React rjfoirf');

	// });

	router.get('/message', (req, res) => {
		knex
			.select('*')
			.from('users')
			.then(results => {
        console.log(results)
				res.json(results);
			});
	});

	return router;
};

