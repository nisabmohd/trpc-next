import { integer, varchar, pgTableCreator, boolean } from "drizzle-orm/pg-core";

import {} from "drizzle-orm/sql-js";

const pgTable = pgTableCreator((name) => `test_trpc_${name}`);

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  done: boolean().default(false),
});
