
exports.up = function(knex, Promise) {
    return knex.schema.createTable('news', news => {
        news.increments('id').primary()
        news.date('date').notNull()
        news.string('description').notNull()
        news.string('link').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('news')
};
