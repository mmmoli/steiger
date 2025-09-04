import * as Options from "@effect/cli/Options";
import * as Command from "@effect/cli/Command";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import { LocalPlopFile } from "./Plop.js";

const command = Command.make(
  "generate",
  {
    moduleName: Options.text("module").pipe(
      Options.withDescription("The name of the module to generate"),
    ),
    aggregateName: Options.text("aggregate").pipe(
      Options.withDescription("The name of the aggregate to generate"),
      Options.withDefault("User"),
    ),
    useCaseName: Options.text("useCase").pipe(
      Options.withDescription("The name of a use case to generate"),
      Options.withDefault("Create User"),
    ),
  },
  ({ moduleName, aggregateName, useCaseName }) =>
    Effect.gen(function* () {
      const Plop = yield* LocalPlopFile;
      const plop = yield* Plop.make("./plopfile.js");

      const aggregateAdd = plop.getGenerator("aggregate");

      const result = yield* Effect.tryPromise({
        try: () =>
          aggregateAdd.runActions({
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
