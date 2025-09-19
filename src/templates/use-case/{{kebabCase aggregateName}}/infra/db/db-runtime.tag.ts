import type * as DbRuntime from "@htch/core-common/infra/db-runtime.js";
import * as Drizzle from "drizzle-orm/d1";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as schema from "./{{kebabCase aggregateName}}-schema";

export class {{pascalCase aggregateName}}DbRuntimeTag extends Context.Tag(
  "core-workspaces/infra/db/{{pascalCase aggregateName}}DbRuntimeTag",
)<{{pascalCase aggregateName}}DbRuntimeTag, DbRuntime.DbRuntimeTrait<typeof schema>>() {}

export const make{{pascalCase aggregateName}}DbRuntimeLayer = (db: Drizzle.AnyD1Database) =>
  Layer.succeed(
    {{pascalCase aggregateName}}DbRuntimeTag,
    {{pascalCase aggregateName}}DbRuntimeTag.of({
      use: Effect.sync(() => Drizzle.drizzle(db, { schema })),
    }),
  );
