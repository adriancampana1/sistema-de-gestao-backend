exports.up = function (knex) {
    // Lógica para aplicar as alterações na migração (ex: criar tabela, adicionar coluna)
    return knex.schema.createTable('businesses', function (table) {
        table.increments('id').primary();
        table.string('name');
        // Outras colunas e definições aqui
    });
};

exports.down = function (knex) {
    // Lógica para desfazer as alterações na migração (ex: excluir tabela, remover coluna)
    return knex.schema.dropTable('businesses');
};
