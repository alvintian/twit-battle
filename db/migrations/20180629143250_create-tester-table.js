exports.up = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users')
		.dropTableIfExists('battle')
		.dropTableIfExists('character_battle')
		.then(createCharacterTable)
		.then(createBattleTable)
		.then(createCharacterBattleTable)
		.then(createDummyData);

	function createCharacterTable() {
		return knex.schema.createTable('users', table => {
			table.increments('id').primary()
			table.string('name')
			table.decimal('hp')
			table.decimal('attack')
			table.integer('votes')
			table.boolean('eliminated')
			table.integer('matches')
			table.string('picture')
		})
	};

	function createBattleTable() {
		return knex.schema.createTable('battle', table => {
			table.increments('id').primary()
			table.string('red_side_name')
			table.string('blue_side_name')
			table.string('red_side_hp')
			table.string('blue_side_hp')
			table.time('timer')
		})
	};

	function createCharacterBattleTable() {
		return knex.schema.createTable('character_battle', table => {
			table.increments('id').primary();
			table.integer('battle_id').unsigned().references('id').inTable('battle');
			table.integer('character_id').unsigned().references('id').inTable('users');
			// table.increments('battle_id').primary()
			// table.increments('character_id').primary()
		})
	};

	function createDummyData() {
		return Promise.all([knex('users').insert([{
				name: "DoDo",
				hp: 100,
				attack: 15,
				eliminated: false,
				matches: 1
			}, {
				name: "CoCo",
				hp: 100,
				attack: 5,
				eliminated: true,
				matches: 1
			}, {
				name: "BoBo",
				hp: 100,
				attack: 5,
				eliminated: false,
				matches: 0
			}]),
			knex('battle').insert([{
				red_side_name: "DoDo",
				blue_side_name: "CoCo",
				red_side_hp: 14,
				blue_side_hp: 0
			}])
		])
	};
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users')
		.dropTableIfExists('battle')
		.dropTable('character_battle')
};