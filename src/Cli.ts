import * as Options from "@effect/cli/Options";
import * as Command from "@effect/cli/Command";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import nodePlop from "node-plop";
import { fileURLToPath } from "url";
import path from "path";

const command = Command.make(
  "generate",
  {
    moduleName: Options.text("module").pipe(
      Options.withDescription("The name of the module to generate"),
      Options.withDefault("core-auth"),
    ),
    aggregateName: Options.text("aggregate").pipe(
      Options.withDescription("The name of the aggregate to generate"),
      Options.withDefault("User"),
    ),
    useCaseName: Options.text("use case").pipe(
      Options.withDescription("The name of a use case to generate"),
      Options.withDefault("Create User"),
    ),
  },
  ({ moduleName, aggregateName, useCaseName }) =>
    Effect.gen(function* () {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const plopfilePath = path.join(__dirname, "plopfile.js");

      const plop = yield* Effect.tryPromise({
        try: () => nodePlop(plopfilePath),
        catch: (error) => {
          return new Error(
            `Failed to load plopfile at ${plopfilePath}: ${error}`,
          );
        },
      });

      const moduleAdd = plop.getGenerator("module");

      const result = yield* Effect.tryPromise({
        try: () =>
          moduleAdd.runActions({
            moduleName,
            aggregateName,
            useCaseName,
          }),
        catch: (cause) => {
          Effect.logError(cause);
          return new Error("Generation failed");
        },
      });

      const failures = Option.fromIterable(result.failures);
      if (Option.isSome(failures)) {
        yield* Effect.die("Generation failed");
      }

      for (const change of result.changes) {
        yield* Effect.log(change.path);
      }
    }),
);

export const run = Command.run(command, {
  name: "Steiger",
  version: "0.1.0",
});
