
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', actions => {
		actions.increments('id').primary()
		actions.string('title').notNull()
		actions.string('description').notNull()
		actions.string('mainPic').notNull()
		actions.string('video')
	})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('actions')
};
