exports.up = function (knex) {
    return knex.schema.createTable('notes', function (table) {
        table.increments('id').primary();
        table.text('user_id').references('id').inTable('users');
        table.text('business_id').references('id').inTable('businesses');
        table.text('title').notNullable();
        table.text('description');
        table.timestamp('created_at').default(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('notes');
};
