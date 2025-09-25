import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import * as Drizzle from "drizzle-orm";
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Schema from "effect/Schema";
import * as Domain from "../../domain";
import * as schema from "./{{kebabCase aggregateName}}-schema";

export const {{pascalCase aggregateName}}RepoLive = Layer.unwrapEffect(
  Effect.gen(function* (_) {
    const db = yield* SqliteDrizzle.make({ schema });

    return Layer.succeed(
      Domain.{{pascalCase aggregateName}}Repo,
      Domain.{{pascalCase aggregateName}}Repo.of({
        delete: Effect.fn("{{pascalCase aggregateName}}Repo.delete")(function* ({{kebabCase aggregateName}}) {
          const tick = yield* Clock.currentTimeMillis;

          yield* _(
            Effect.annotateCurrentSpan({
              "{{kebabCase aggregateName}}.id": {{kebabCase aggregateName}}.id,
            }),
          );

          const now = new Date(tick).toISOString();
          const op = yield* Effect.tryPromise({
            try: () =>
              db
                .update(schema.{{kebabCase aggregateName}}s)
                .set({
                  isDeleted: true,
                  deletedAt: now,
                })
                .where(Drizzle.eq(schema.{{kebabCase aggregateName}}s.id, {{kebabCase aggregateName}}.id)),
            catch: (cause) => new Domain.{{pascalCase aggregateName}}DeleteFailed({ cause }),
          });

          yield* Effect.logDebug("{{pascalCase aggregateName}} Deleted Op", op).pipe(
            Effect.annotateLogs(
              "tag",
              "{{kebabCase packageName}}/{{kebabCase aggregateName}}/infra/{{pascalCase aggregateName}}Repo",
            ),
          );

          yield* Effect.logInfo("{{pascalCase aggregateName}} Deleted", {
            "{{kebabCase aggregateName}}.id": {{kebabCase aggregateName}}.id,
            "{{kebabCase aggregateName}}.name": {{kebabCase aggregateName}}.name,
            "{{kebabCase aggregateName}}.slug": {{kebabCase aggregateName}}.slug,
          }).pipe(
            Effect.annotateLogs(
              "tag",
              "{{kebabCase packageName}}/{{kebabCase aggregateName}}/infra/{{pascalCase aggregateName}}Repo",
            ),
          );
        }),

        save: Effect.fn("{{pascalCase aggregateName}}Repo.save")(function* ({{kebabCase aggregateName}}) {
          const tick = yield* Clock.currentTimeMillis;

          yield* _(
            Effect.annotateCurrentSpan({
              "{{kebabCase aggregateName}}.id": {{kebabCase aggregateName}}.id,
            }),
          );

          const now = new Date(tick).toISOString();
          const op = yield* Effect.tryPromise({
            try: () =>
              db
                .insert(schema.{{kebabCase aggregateName}}s)
                .values({
                  ...{{kebabCase aggregateName}},
                  createdAt: now,
                  updatedAt: now,
                })
                .onConflictDoUpdate({
                  target: schema.{{kebabCase aggregateName}}s.id,
                  set: {
                    ...{{kebabCase aggregateName}},
                    createdAt: {{kebabCase aggregateName}}.createdAt.toISOString(),
                    updatedAt: now,
                  },
                }),
            catch: (cause) => new Domain.{{pascalCase aggregateName}}SaveFailed({ cause }),
          });

          yield* Effect.logDebug("{{pascalCase aggregateName}} Saved Op", op).pipe(
            Effect.annotateLogs(
              "tag",
              "{{kebabCase packageName}}/{{kebabCase aggregateName}}/infra/{{pascalCase aggregateName}}Repo",
            ),
          );

          yield* Effect.logInfo("{{pascalCase aggregateName}} Saved", {
            "{{kebabCase aggregateName}}.id": {{kebabCase aggregateName}}.id,
            "{{kebabCase aggregateName}}.name": {{kebabCase aggregateName}}.name,
            "{{kebabCase aggregateName}}.slug": {{kebabCase aggregateName}}.slug,
          }).pipe(
            Effect.annotateLogs(
              "tag",
              "{{kebabCase packageName}}/{{kebabCase aggregateName}}/infra/{{pascalCase aggregateName}}Repo",
            ),
          );
        }),

        getForId: Effect.fn("{{pascalCase aggregateName}}Repo.getForId")(function* (id) {
          yield* _(
            Effect.annotateCurrentSpan({
              "{{kebabCase aggregateName}}.id": id,
            }),
          );

          const maybe{{pascalCase aggregateName}} = yield* Effect.tryPromise({
            try: () =>
              db.query.{{kebabCase aggregateName}}.findFirst({
                where: (table, { eq }) => eq(table.id, id),
              }),

            catch: (cause) => new Domain.{{pascalCase aggregateName}}GetFailed({ cause }),
          }).pipe(Effect.map((a) => Option.fromNullable(a)));

          if (Option.isNone(maybe{{pascalCase aggregateName}})) {
            yield* Effect.logInfo("{{pascalCase aggregateName}} Not Found", {
              "{{kebabCase aggregateName}}.id": id,
            }).pipe(
              Effect.annotateLogs(
                "tag",
                "{{kebabCase packageName}}/{{kebabCase aggregateName}}/infra/{{pascalCase aggregateName}}Repo",
              ),
            );
            return Option.none();
          }

          const encoded = maybe{{pascalCase aggregateName}}.value;
          const decoder = Schema.decodeUnknown(Domain.{{pascalCase aggregateName}});

          const {{kebabCase aggregateName}} = yield* decoder(encoded).pipe(
            Effect.catchTag(
              "ParseError",
              (error) => new Domain.{{pascalCase aggregateName}}GetFailed({ cause: error }),
            ),
          );

          yield* Effect.logInfo("{{pascalCase aggregateName}} Retrieved", {
            "{{kebabCase aggregateName}}.id": {{kebabCase aggregateName}}.id,
            "{{kebabCase aggregateName}}.name": {{kebabCase aggregateName}}.name,
            "{{kebabCase aggregateName}}.slug": {{kebabCase aggregateName}}.slug,
          }).pipe(
            Effect.annotateLogs(
              "tag",
              "{{kebabCase packageName}}/{{kebabCase aggregateName}}/infra/{{pascalCase aggregateName}}Repo",
            ),
          );

          return Option.some({{kebabCase aggregateName}});
        }),
      }),
    );
  }),
);
