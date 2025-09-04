import * as Effect from "effect/Effect";
import * as Data from "effect/Data";
import * as Path from "@effect/platform/Path";
import * as Url from "@effect/platform/Url";
import * as FileSystem from "@effect/platform/FileSystem";
import nodePlop from "node-plop";

export class LocalPlopfileFoundError extends Data.TaggedError(
  "LocalPlopfileFoundError",
)<{
  cause: unknown;
}> {}

export class PlopApiError extends Data.TaggedError("PlopApiError")<{
  cause: unknown;
}> {}

export class LocalPlopFile extends Effect.Service<LocalPlopFile>()(
  "LocalPlopFile",
  {
    effect: Effect.gen(function* () {
      const path = yield* Path.Path;
      const fs = yield* FileSystem.FileSystem;

      const make = Effect.fn("LocalPlopFile.api")(function* (
        pathToPlopfile = "./plopfile.js",
      ) {
        const plopfilePath = yield* Url.fromString(import.meta.url).pipe(
          Effect.map((url) => url.pathname),
          Effect.map((file) => path.dirname(file)),
          Effect.map((dir) => path.join(dir, pathToPlopfile)),
        );

        const exists = yield* fs
          .exists(plopfilePath)
          .pipe(
            Effect.mapError(
              (error) => new LocalPlopfileFoundError({ cause: error }),
            ),
          );

        yield* Effect.logInfo("Found Plopfile");

        if (!exists)
          return yield* Effect.fail(
            new LocalPlopfileFoundError({
              cause: `Plopfile not found at "${plopfilePath}"`,
            }),
          );

        const plop = yield* Effect.tryPromise({
          try: () => nodePlop(plopfilePath),
          catch: (error) => {
            return new PlopApiError({
              cause: error,
            });
          },
        });

        return plop;
      });

      return { make } as const;
    }),
  },
) {}
