exports.up = (knex) =>
    knex.schema.createTable('businesses', (table) => {
        table.increments('id');
        table.text('title').notNullable();
        table.text('user_id').references('id').inTable('users');
        table.text('description');
        table.integer('negotiated_value');
        table.text('products');
        table.timestamp('created_at').default(knex.fn.now());
    });

exports.down = (knex) => knex.schema.dropTable('businesses');
