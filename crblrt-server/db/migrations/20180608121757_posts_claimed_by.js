
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .dropTable("posts")
      .createTable("posts", function(table) {
        table.increments('id');
        table.integer('user_id').references('users');
        table.string('title');
        table.string('content');
        table.string('image_url');
        table.string('geo_tag');
        table.integer('point_value');
        table.boolean('visible');
        table.integer('claimed_by').references('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .dropTable("posts")
      .createTable("users", function(table) {
          table.increments('id');
          table.integer('user_id').references('users');
          table.string('title');
          table.string('content');
          table.string('image_url');
          table.string('geo_tag');
          table.integer('point_value');
          table.boolean('visible');
          table.timestamp('created_at').defaultTo(knex.fn.now());
      })
  ])
};
