exports.up = (knex) =>
    knex.schema.createTable('products', (table) => {
        table.increments('id');
        table.text('title').notNullable();
        table.text('description');
        table.integer('price');
        table.text('category_id').references('id').inTable('categories');
        table.timestamp('created_at').default(knex.fn.now());
    });

exports.down = (knex) => knex.schema.dropTable('products');
