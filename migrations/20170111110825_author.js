
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author', function(table){
    table.increments();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.text('biography').notNullable();
    table.text('portrait_url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('author');
};
