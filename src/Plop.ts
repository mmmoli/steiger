import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import nodePlop from "node-plop";

export class PlopApiError extends Data.TaggedError("PlopApiError")<{
  cause: unknown;
}> {}

export class Plop extends Effect.Service<Plop>()("Plop", {
  effect: Effect.gen(function* () {
    const path = yield* Path.Path;
    const fs = yield* FileSystem.FileSystem;

    const make = Effect.fn("Plop.make")(function* () {
      const plop = yield* Effect.tryPromise({
        try: () => nodePlop(),
        catch: (error) => {
          return new PlopApiError({
            cause: error,
          });
        },
      });

      // plop.setGenerator("aggregate", {
      //   description: "Generate a new DDD module + Effect",
      //   prompts: [
      //     {
      //       type: "input",
      //       name: "aggregateName",
      //       message: "Aggregate name:",
      //     },
      //     {
      //       type: "input",
      //       name: "useCaseName",
      //       message: "Use case name:",
      //     },
      //   ],
      //   actions: [
      //     {
      //       type: "addMany",
      //       destination: process.cwd(),
      //       base: path.join(templatesDir, "package"),
      //       templateFiles: path.join(templatesDir, "package", "**/*"),
      //     },
      //   ],
      // });

      return plop;
    });

    return { make } as const;
  }),
}) {}
