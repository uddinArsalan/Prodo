import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { userModel } from "./users";
import { timestamps } from "./helpers";

export const projectModel = pgTable("projects", {
    id : t.integer().primaryKey().generatedAlwaysAsIdentity(),
    title : t.varchar().notNull(),
    description : t.varchar().notNull(),
    userId : t.integer().references(() => userModel.id, { onDelete: "cascade" }),
    deadline : t.date({mode : "date"}),
    ...timestamps
});
