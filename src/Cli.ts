import * as Command from "@effect/cli/Command";
import * as Effect from "effect/Effect";
import nodePlop from "node-plop";

const plop = await nodePlop(`./src/plopfile.ts`);

const command = Command.make("generate", {}, () =>
  Effect.gen(function* () {
    const basicAdd = plop.getGenerator("module");

    const result = yield* Effect.tryPromise({
      try: () =>
        basicAdd.runActions({
          moduleName: "core-auth",
          aggregateName: "User",
          useCaseName: "CreateUser",
        }),
      catch: (error) => Effect.logError(error),
    });

    yield* Effect.log("Generation complete", { result });
  }),
);

export const run = Command.run(command, {
  name: "Steiger",
  version: "0.0.0",
});
