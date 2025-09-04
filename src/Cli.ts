import * as Options from "@effect/cli/Options";
import * as Command from "@effect/cli/Command";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import nodePlop from "node-plop";

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
      const plop = yield* Effect.tryPromise({
        try: () => nodePlop(`./src/plopfile.ts`),
        catch: (error) => Effect.logError(error),
      });

      const basicAdd = plop.getGenerator("module");

      const result = yield* Effect.tryPromise({
        try: () =>
          basicAdd.runActions({
            moduleName,
            aggregateName,
            useCaseName,
          }),
        catch: (error) => Effect.logError(error),
      });

      yield* Effect.log("Generation complete", { result: result.failures });
    }),
);

export const run = Command.run(command, {
  name: "Steiger",
  version: "0.0.0",
});
