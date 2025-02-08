import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { userModel } from "./users";

export const projectModel = pgTable("projects", {
    id : t.integer().primaryKey().generatedAlwaysAsIdentity(),
    name : t.varchar(),
    description : t.varchar(),
    userId : t.integer().references(() => userModel.id),
    deadline : t.date()
});
