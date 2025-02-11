import { pgTable, uniqueIndex, unique, integer, varchar, timestamp, foreignKey, date, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const medium = pgEnum("medium", ['low', 'medium', 'high'])
export const role = pgEnum("role", ['user', 'admin', 'guest'])
export const status = pgEnum("status", ['completed', 'pending'])


export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 256 }),
	email: varchar().notNull(),
	password: varchar().notNull(),
	refreshToken: varchar(),
	role: role().default('user'),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	uniqueIndex("email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	unique("users_email_unique").on(table.email),
]);

export const projects = pgTable("projects", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "projects_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar().notNull(),
	description: varchar().notNull(),
	userId: integer(),
	deadline: date(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "projects_userId_users_id_fk"
		}).onDelete("cascade"),
]);

export const tasks = pgTable("tasks", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "tasks_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	title: varchar().notNull(),
	description: varchar().notNull(),
	userId: integer(),
	projectId: integer(),
	status: status().default('pending'),
	dueDate: date(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	categoryId: integer(),
	priority: varchar().default('medium'),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "tasks_userId_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.id],
			name: "tasks_projectId_projects_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "tasks_categoryId_categories_id_fk"
		}).onDelete("set null"),
]);

export const categories = pgTable("categories", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "categories_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
});
