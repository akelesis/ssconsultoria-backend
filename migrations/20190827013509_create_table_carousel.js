
exports.up = function(knex, Promise) {
    return knex.schema.createTable('carousel', carousel => {
        carousel.increments('id').primary()
		carousel.string('url').notNull()
		carousel.string('title').notNull()
		carousel.string('description').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('carousel')
};
