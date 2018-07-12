var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
const multer = require('multer');
var fs = require('fs');
var request = require('request');

const getBearerToken = require('get-twitter-bearer-token');
const twitter_consumer_key = 'TwLpS2IZT9mzyCpd31C6f2Ykk';
const twitter_consumer_secret =
	'nxs5IONxiEdp6CBQEvL48KRju1CMAgQaB6rCbqUyTtyJAvWa4U';
let twitter_bearer_token =
	'AAAAAAAAAAAAAAAAAAAAAHCS6wAAAAAAUrdisbS22LUsBJCl%2BzV%2B2qaEse0%3DFHxzYB2mSY487EtCGN0Il3PdxfdmiLL9M0UCDcVKjUKxCPTbhZ';

getBearerToken(twitter_consumer_key, twitter_consumer_secret, (err, res) => {
	if (err) {
		// handle error
	} else {
		// bearer token
		console.log(res.body.access_token);
		twitter_bearer_token = res.body.access_token;
	}
});

module.exports = function(knex) {
	// router.get('/message', function(req, res, next) {
	//   res.json('Welcome To React rjfoirf');
	// });

	const multerConf = {
		storage: multer.diskStorage({
			destination: function(req, file, next) {
				next(null, './public/images');
			},
			filename: function(req, file, next) {
				const ext = file.mimetype.split('/')[1];
				next(null, file.fieldname + '-' + Date.now() + '.' + ext);
			},
		}),
		fileFilter: function(req, file, next) {
			if (!file) {
				next();
			}
			const image = file.mimetype.startsWith('image/');
			if (image) {
				next(null, true);
			} else {
				next(
					{
						message: 'File type not supported',
					},
					false
				);
			}
		},
	};

	var client = new Twitter({
		consumer_key: 'TwLpS2IZT9mzyCpd31C6f2Ykk',
		consumer_secret: 'nxs5IONxiEdp6CBQEvL48KRju1CMAgQaB6rCbqUyTtyJAvWa4U',
		bearer_token: twitter_bearer_token,
	});
	// var params = { screen_name: 'nodejs' };

	router.get('/message', (req, res) => {
		// client.get('users/show', params, function(error, tweets, response) {
		// 	if (error) {
		// 		console.log(error);
		// 	}
		// 	if (!error) {
		// 		console.log(tweets);
		// 	}
		// });
		knex
			.select('*')
			.from('users')
			.then(results => {
				res.json(results);
			});
	});
	router.get('/AllChar', (req, res) => {
		knex
			.select('*')
			.from('users')
			.then(results => {
				res.json(results);
			});
	});
	router.get('/AllChar/:id', (req, res) => {
		//let user_id = req.session.;
		knex
			.select('*')
			.from('users')
			.where('id', '=', parseInt(req.params.id))
			.then(results => {
				res.json(results);
			})
	});
	router.get('/AllChar/:id/battles', (req, res) => {
		knex
			.select('users.name', 'users.id','battle.id AS BATTLEID', 'red_side_id_fk', 'blue_side_id_fk','red_side_hp',
				'blue_side_hp',
				'active',
				'timer')
			.from('users')
			.join('battle', function() {
				this.on('battle.red_side_id_fk', '=', 'users.id').orOn('battle.blue_side_id_fk', '=', 'users.id')
			})
			.where('active', '=', false) //.andWhere('users.id', '=', parseInt(req.params.id))
			.then(results => {
				res.json(results);
			})
	})

	router.get('/CurBattle', (req, res) => {
		//		 select users.* from users join battle ON (active=true AND (battle.red_side_id=users.id or battle.blue_side_id=users.id));
		knex
			.select(
				'battle.id AS BATTLEID',
				'red_side_id_fk',
				'blue_side_id_fk',
				'red_side_hp',
				'blue_side_hp',
				'active',
				'timer',
				'users.id',
				'users.name',
				'users.hp',
				'users.attack',
				'users.picture'
			)
			.from('users')
			.join('battle', function() {
				this.on('battle.red_side_id_fk', '=', 'users.id').orOn(
					'battle.blue_side_id_fk',
					'=',
					'users.id'
				);
			})
			.where('active', '=', true)
			.orderBy('BATTLEID')
			.then(results => {
				console.log(results);
				res.json(results);
				//				res.json(results.rows);
			});
	});
	router.get('/CurBattle/:id', (req, res) => {
		knex
			.select(
				'battle.id AS BATTLEID',
				'red_side_id_fk',
				'blue_side_id_fk',
				'users.id',
				'users.name',
				'users.hp',
				'users.attack',
				'users.picture'
			)
			.from('users')
			.join('battle', function() {
				this.on('battle.red_side_id_fk', '=', 'users.id').orOn(
					'battle.blue_side_id_fk',
					'=',
					'users.id'
				);
			})
			.where('active', '=', true)
			.andWhere('battle.id', '=', parseInt(req.params.id))
			.then(results => {
				res.json(results);
			});
	});

	router.post('/CurBattle/:id', (req, res) => {
		knex('battle')
			.where('id', '=', parseInt(req.body.id))
			.update('active', false)
			.then(results => {
				res.json(results);
			});
	});

	//	router.post('/NewChar', multer(multerConf).any(),(req, res) => {
	router.post('/NewChar', multer(multerConf).any(), (req, res) => {
		console.log(req.body, 'O or T');
		console.log(req.file, 'is file empty??');
		console.log(req.files, 'is files empty?');
		// console.log(req.files[0].path, "is the data empty as well??")
		if (req.body.select === 'Tp') {
			let param = {
				screen_name: req.body.character,
			};
			client.get('users/show', param, function(error, tweets, response) {
				if (error) {
					console.log(error, 'stopped at error');
					// if(typeof(tweets.statuses_count)===undefined){
				}
				if (!error) {
					let twitterImage = tweets.profile_image_url.replace(
						'normal',
						'400x400'
					);
					return res.json({
						twitterImage: twitterImage,
					});
				}
			});
		} else if (req.body.select === 'T') {
			let param = {
				screen_name: req.body.character,
			};
			client.get('users/show', param, function(error, tweets, response) {
				if (error) {
					console.log(error);
					// if(typeof(tweets.statuses_count)===undefined){
				}
				if (!error) {
					let profile_image_url = tweets.profile_image_url.replace(
						'normal',
						'400x400'
					);
					let fileExtension = '';
					if (
						profile_image_url.substr(profile_image_url.length - 3) === 'jpg'
					) {
						fileExtension = '.jpg';
					} else {
						fileExtension = '.png';
					}
					request(profile_image_url).pipe(
						fs.createWriteStream(
							'./public/images/' + tweets.screen_name + fileExtension
						)
					);
					knex('users')
						.insert({
							name: req.body.character,
							hp: tweets.followers_count,
							description: tweets.description,
							attack: tweets.statuses_count,
							eliminated: false,
							matches: 0,
							picture: '/images/' + tweets.screen_name + fileExtension,
						})
						.then(results => {
							res.json(results);
						});
				}
			});
		} else if (req.body.select === "O") {
			let imagePath = req.files[0].path.replace("public", "")
			knex('users')
				.insert({
					name: req.body.name,
					description: req.body.desc,
					picture: imagePath,
					hp: 100,
					attack: 5,
					eliminated: false,
					matches: 0,
				})
				.then(results => {
					res.json(results);
				});
		}
		// 		let health=tweets.statuses_count;
		// let attack=tweets.followers_count;
		// knex('users')
		// 	.insert({
		// 		name: req.body.character,
		// 		hp: health,
		// 		att: attack,
		// 	})
		// 	.then(results => {
		// 		console.log(results);
		// 		return res.json(results);
		// 	});

		// return res.status(200).json(polls);
	});

	router.post('/CurBattle', (req, res) => {
		knex('battle')
			.insert([
				{
					red_side_id_fk: req.body.teamRed,
					blue_side_id_fk: req.body.teamBlue,
					active: true,
				},
			]).returning('id')
      .then((result) => {
    //  	console.log(result[0],"did i return id????")
    //    res.redirect(`/CurBattle/`+JSON.stringify(result[0]));
     res.json(result[0]);
      });
	});
	// router.post('/updateChar', (req, res) => {
	// 	knex('users')
	// 		.where({ id: req.body.character || 'lol' })
	// 		.update({ eliminated: true })
	// 		.then(x => {
	// 			console.log('user', x);
	// 		});

	// 	knex('battle')
	// 		.where({ id: req.body.battleID || 0 })
	// 		.update({ active: false })
	// 		.then(x => {
	// 			console.log('battle update', x);
	// 			res.send('ok');
	// 		});
	router.post('/updateChar', (req, res) => {
		knex('users')
			.where('id','=', req.body.character)
			.update({'eliminated':true}).then(x => {
				console.log('update char');});

			knex('users')
			.where('id','=', req.body.charWinner)
			.increment('matches', 1).then(x => {
				console.log('increment charWinner')});

			knex('users')
			.where('id','=', req.body.charWinner)
			.increment('attack', 15).then(x => {
				console.log('increment charWinner attack')});

			knex('users')
			.where('id','=', req.body.character)
			.increment('matches', 1).then(x => {
				console.log('increment char')});

			knex('battle')
			.where('id','=', req.body.battleID)
			.update({'active': false,
					'red_side_hp':req.body.red_side_hp,
					'blue_side_hp':req.body.blue_side_hp,
					'timer':req.body.time})
		.then((result) => {
console.log(result,"update battle active")})
	



		// knex('battle')
		// 	.where({ id: req.body.battleID || 0 })
		// 	.update({ active: false })
		// 	.then(results => {
		// 		console.log(results);
		// 		//res.json(results);
		// 	});
		// knex
		// 	.multiQuery([
		// 		knex
		// 			.update('users')
		// 			.set({ eliminated: true })
		// 			.where({ name: req.body.character }),
		// 		knex
		// 			.update('battle')
		// 			.set({ active: false })
		// 			.where({ id: req.body.battleID }),
		// 	])
		// 	.spread((resultA, resultB) => {
		// 		console.log(resultA, resultB);
		// 		res.send('ok')

		// 	}).then(x => {
		// 		console.log(x)

		// 	})
	});
	return router;
};
