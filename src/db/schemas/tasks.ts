import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { projectModel } from "./projects";
import { userModel } from "./users";
import { timestamps } from "./helpers";

export const taskStatus = t.pgEnum("status", ["completed", "pending"]);

export const taskModel = pgTable("tasks", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: t.varchar().notNull(),
  description: t.varchar().notNull(),
  userId: t.integer().references(() => userModel.id, { onDelete: "cascade" }),
  projectId: t.integer().references(() => projectModel.id, { onDelete: "cascade" }),
  status: taskStatus().default("pending"),
  dueDate: t.date({mode : "date"}),
  ...timestamps
});
