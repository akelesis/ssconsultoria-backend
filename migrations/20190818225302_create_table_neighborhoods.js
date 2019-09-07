exports.up = function(knex, Promise) {
    return knex.schema.createTable('neighborhoods', neighborhoods => {
		neighborhoods.increments('id').primary()
		neighborhoods.string('name').notNull()
	})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('neighborhoods')
};