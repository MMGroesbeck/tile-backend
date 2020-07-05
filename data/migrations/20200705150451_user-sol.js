
exports.up = function(knex) {
  return (
    knex.schema
        //users table
        .createTable("users", (tbl) => {
            tbl.increments();
            tbl.text("username", 128).unique().notNullable().index();
            tbl.text("email").notNullable();
            tbl.text("passhash").notNullable();
        })
        //solutions table
        .createTable("solutions", (tbl) => {
            tbl.increments();
            tbl.text("solution").notNullable().index();
            tbl.datetime("added").defaultTo(knex.fn.now()).notNullable();
            tbl
                .integer("user_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("RESTRICT");
        })
  );
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("solutions")
    .dropTableIfExists("users");
};
