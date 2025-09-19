import type * as Drizzle from "drizzle-orm/d1";
import type * as Effect from "effect/Effect";

export interface DbRuntimeTrait<TSchema extends Record<string, unknown>> {
  readonly use: Effect.Effect<Drizzle.DrizzleD1Database<TSchema>>;
}
