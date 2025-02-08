import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";

export const rolesEnum = pgEnum("role", ["user", "admin", "guest"]);

export const userModel = pgTable(
  "users",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({ length: 256 }),
    email: t.varchar().notNull().unique(),
    password : t.varchar().notNull(),
    refreshToken : t.varchar(),
    role: rolesEnum().default("user"),
    ...timestamps,
  },
  (table) => [t.uniqueIndex("email_idx").on(table.email)]
);
