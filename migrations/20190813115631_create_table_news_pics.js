
exports.up = function(knex, Promise) {
    return knex.schema.createTable('news-pics', newsPics => {
        newsPics.increments('idPic').primary()
        newsPics.integer('idNews').notNull().unsigned()
        newsPics.string('url').notNull()
        newsPics.foreign('idNews').references('id').inTable('news')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('news-pics')
};
