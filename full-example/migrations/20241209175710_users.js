exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.uuid('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('first_name');
        table.string('last_name')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
