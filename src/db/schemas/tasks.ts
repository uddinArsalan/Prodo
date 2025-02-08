import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { projectModel } from "./projects";

export const taskModel = pgTable("tasks", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: t.varchar(),
  description: t.varchar(),
  projectId: t.integer().references(() => projectModel.id),
  dueDate: t.date(),
});
