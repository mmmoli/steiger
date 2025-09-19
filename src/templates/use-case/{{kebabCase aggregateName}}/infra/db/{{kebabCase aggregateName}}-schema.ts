import { sql } from "drizzle-orm";
import * as Orm from "drizzle-orm/sqlite-core";

export const {{kebabCase aggregateName}}s = Orm.sqliteTable(
  "workspaces_{{kebabCase aggregateName}}s",
  {
    id: Orm.text("id").primaryKey(),
    name: Orm.text("name").notNull(),
    slug: Orm.text("slug").notNull(),
    isDeleted: Orm.integer("isDeleted", { mode: "boolean" })
      .notNull()
      .default(false),
    deletedAt: Orm.text("deleted_at"),
    updatedAt: Orm.text("updated_at")
      .notNull()
      .default(sql`(current_timestamp)`),
    createdAt: Orm.text("created_at").notNull(),
  },
  (table) => [
    Orm.index("workspaces_{{kebabCase aggregateName}}s_created_at_idx").on(table.createdAt),
    Orm.index("workspaces_{{kebabCase aggregateName}}s_is_deleted_idx").on(table.isDeleted),
    Orm.index("workspaces_{{kebabCase aggregateName}}s_name_idx").on(table.name),
    Orm.index("workspaces_{{kebabCase aggregateName}}s_updated_at_idx").on(table.updatedAt),
    Orm.uniqueIndex("workspaces_{{kebabCase aggregateName}}s_slug_idx").on(table.slug),
  ],
);
