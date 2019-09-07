
exports.up = function(knex, Promise) {
    return knex.schema.createTable('action-pics', actions => {
		actions.increments('id').primary()
		actions.integer('idAction').unsigned().notNull()
		actions.string('url').notNull()
		actions.foreign('idAction').references('id').inTable('actions')
	})
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('action-pics')
};
