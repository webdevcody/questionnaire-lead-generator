import { text, sqliteTableCreator, integer } from "drizzle-orm/sqlite-core";

const sqliteTable = sqliteTableCreator((name) => `app_${name}`);

export const todos = sqliteTable("todo", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  complete: integer("complete").notNull().default(0),
});

export type Todo = typeof todos.$inferSelect;
