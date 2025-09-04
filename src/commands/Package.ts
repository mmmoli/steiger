import * as Command from "@effect/cli/Command";
import * as Options from "@effect/cli/Options";
import * as Path from "@effect/platform/Path";
import * as Url from "@effect/platform/Url";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Plop from "../Plop.js";

export class PlopRunError extends Data.TaggedError("PlopRunError")<{
  cause: unknown;
}> {}

export const command = Command.make(
  "package",
  {
    moduleName: Options.text("module").pipe(
      Options.withDescription("The name of the module to generate"),
      Options.withDefault("module-auth"),
    ),
    aggregateName: Options.text("aggregate").pipe(
      Options.withDescription("The name of the aggregate to generate"),
      Options.withDefault("User"),
    ),
    useCaseName: Options.text("usecase").pipe(
      Options.withDescription("The name of the Use Case to generate"),
      Options.withDefault("Register User"),
    ),
  },
  ({ moduleName, aggregateName, useCaseName }) =>
    Effect.gen(function* () {
      const path = yield* Path.Path;

      const templatesDir = yield* Url.fromString(import.meta.url).pipe(
        Effect.map((url) => url.pathname),
        Effect.map((f) => path.dirname(f)),
        Effect.map((d) => path.join(d, "../templates")),
      );

      yield* Effect.logDebug({
        templatesDir,
      });

      const here = process.cwd();

      const base = path.join(templatesDir, "package");
      const templateFiles = path.join(templatesDir, "package", "**/*");

      yield* Effect.logDebug({
        here,
        templatesDir,
        base,
        templateFiles,
      });

      const makePlopApi = yield* Plop.SetPlopGenerator;
      const apiName = "package";

      const api = yield* makePlopApi.set(apiName, {
        description: "Generate a new DDD module + Effect",
        prompts: [
          {
            type: "input",
            name: "moduleName",
            message: "Module name (e.g. Auth)",
          },
          {
            type: "input",
            name: "aggregateName",
            message: "Aggregate name (e.g. User)",
          },
          {
            type: "input",
            name: "useCaseName",
            message: "Use Case name (e.g. Create User)",
          },
        ],
        actions: [
          {
            type: "addMany",
            destination: process.cwd(),
            base: base,
            templateFiles: templateFiles,
          },
        ],
      });

      yield* Effect.logDebug({
        api,
      });

      const result = yield* Effect.tryPromise({
        try: () =>
          api.runActions({
            moduleName,
            aggregateName,
            useCaseName,
          }),
        catch: (cause) => {
          console.error(cause);
          return new PlopRunError({ cause });
        },
      });

      yield* Effect.logDebug({
        result,
      });

      const failure = Option.fromNullable(result.failures?.[0]);

      if (Option.isSome(failure)) {
        console.error(failure);
        return Effect.die("nope");
      }

      for (const change of result.changes) {
        yield* Effect.log(change.path);
      }
    }),
);
