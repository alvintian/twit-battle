exports.up = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users')
		.dropTableIfExists('battle')
		.dropTableIfExists('character_battle')
		.then(createCharacterTable)
		.then(createBattleTable)
		// .then(createCharacterBattleTable)
		.then(createDummyData);

	function createCharacterTable() {
		return knex.schema.createTable('users', table => {
			table.increments('id').primary()
			table.string('name')
			table.integer('hp')
			table.integer('attack')
			table.integer('votes')
			table.boolean('eliminated')
			table.integer('matches')
			table.string('picture')
			table.string('description')
		})
	};

	function createBattleTable() {
		return knex.schema.createTable('battle', table => {
			table.increments('id').primary()
			table.integer('red_side_id_fk').references('id').inTable('users')
			table.integer('blue_side_id_fk').references('id').inTable('users')
			table.string('red_side_hp')
			table.string('blue_side_hp')
			table.boolean('active')
			table.integer('timer')
		})
	};

	// function createCharacterBattleTable() {
	// 	return knex.schema.createTable('character_battle', table => {
	// 		table.increments('id').primary();
	// 		table.integer('battle_id').unsigned().references('id').inTable('battle');
	// 		table.integer('character_id').unsigned().references('id').inTable('users');
	// 		// table.increments('battle_id').primary()
	// 		// table.increments('character_id').primary()
	// 	})
	// };

	function createDummyData() {
		return Promise.all([knex('users').insert([{
				name: "DoDo",
				hp: 100,
				attack: 15,
				eliminated: false,
				matches: 1,
				picture: "/images/images.jpg"
			}, {
				name: "Mark",
				hp: 100,
				attack: 5,
				eliminated: true,
				matches: 1,
				picture: "/images/Mark_Zuckerberg.jpg"
			}, {
				name: "Jeff",
				hp: 100,
				attack: 5,
				eliminated: false,
				matches: 0,
				picture: "/images/bezos.jpg"
			}]),
			knex('battle').insert([{
				red_side_id_fk: 1,
				blue_side_id_fk: 2,
				red_side_hp: 14,
				blue_side_hp: 0,
				active:false
			}])
		])
	};
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('character_battle')
		.dropTableIfExists('battle')
		.dropTableIfExists('users')
};

// select users.* from users join battle ON (active=true) where battle.red_side_id=users.id or battle.blue_side_id=users.id;
// select users.* from users join battle ON (active=true AND (battle.red_side_id=users.id or battle.blue_side_id=users.id));
//do not delete