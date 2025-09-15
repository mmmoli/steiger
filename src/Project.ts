import * as Command from "@effect/cli/Command";
import * as Options from "@effect/cli/Options";
import * as Path from "@effect/platform/Path";
import * as Url from "@effect/platform/Url";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Generate from "./Generate.js";
import * as Plop from "./Plop.js";

export class PlopRunError extends Data.TaggedError("PlopRunError")<{
  cause: unknown;
}> {}

export const command = Command.make(
  "project",
  {
    projectName: Options.text("module").pipe(
      Options.withDescription("The name of the module to generate"),
      Options.withDefault("module-auth"),
    ),
  },
  ({ projectName }) =>
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const { destination } = yield* Generate.command;
      const where = path.join(process.cwd(), destination);

      const templatesDir = yield* Url.fromString(import.meta.url).pipe(
        Effect.map((url) => url.pathname),
        Effect.map((f) => path.dirname(f)),
        Effect.map((d) => path.join(d, "../dist/templates")),
      );

      yield* Effect.logDebug({
        templatesDir,
      });

      const base = path.join(templatesDir, "project");
      const templateFiles = path.join(base, "**/*");

      yield* Effect.logDebug({
        meta: import.meta,
        destination: where,
        templatesDir,
        base,
        templateFiles,
      });

      const makePlopApi = yield* Plop.SetPlopGenerator;
      const apiName = "project";

      const api = yield* makePlopApi.set(apiName, {
        description: "Generate a new DDD module + Effect",
        prompts: [
          {
            type: "input",
            name: "projectName",
            message: "Module name (e.g. Auth)",
          },
        ],
        actions: [
          {
            type: "addMany",
            destination,
            base,
            templateFiles,
            force: true,
          },
        ],
      });

      const result = yield* Effect.tryPromise({
        try: () =>
          api.runActions({
            projectName,
          }),
        catch: (cause) => {
          console.error(cause);
          return new PlopRunError({ cause });
        },
      });

      const failure = Option.fromNullable(result.failures?.[0]);

      if (Option.isSome(failure)) {
        return yield* Effect.die(new Error(failure.value.error));
      }

      for (const change of result.changes) {
        yield* Effect.log(change.path);
      }
    }),
);
