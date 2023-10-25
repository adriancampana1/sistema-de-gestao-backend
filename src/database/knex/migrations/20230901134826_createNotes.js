exports.up = (knex) =>
    knex.schema.createTable('notes', (table) => {
        table.increments('id');
        table.text('title').notNullable();
        table.text('user_id').references('id').inTable('users');
        table.text('description');
        table.timestamp('created_at').default(knex.fn.now());
    });

exports.down = (knex) => knex.schema.dropTable('notes');
