
exports.up = function(knex, Promise) {
    return knex.schema.createTable('admin', newsPics => {
        newsPics.increments('id').primary()
        newsPics.string('user').notNull()
        newsPics.string('password').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('admin')
};
