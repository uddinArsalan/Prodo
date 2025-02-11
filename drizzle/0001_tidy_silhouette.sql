CREATE TYPE "public"."medium" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "categoryId" integer;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" varchar DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;