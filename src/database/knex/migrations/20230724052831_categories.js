exports.up = (knex) =>
    knex.schema.createTable('categories', (table) => {
        table.increments('id');
        table.text('title');
        table.timestamp('created_at').default(knex.fn.now());
    });

exports.down = (knex) => knex.schema.dropTable('categories');
