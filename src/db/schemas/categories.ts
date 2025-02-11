import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";

export const categoryModel = pgTable("categories", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar().notNull(),
  ...timestamps,
});
