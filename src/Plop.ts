import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Lib from "node-plop";

export class PlopApiError extends Data.TaggedError("PlopApiError")<{
  cause: unknown;
}> {}

export class PlopApi extends Effect.Service<PlopApi>()("PlopApi", {
  succeed: Effect.gen(function* () {
    const plop = yield* Effect.tryPromise({
      try: () => Lib.default(),
      catch: (error) => {
        return new PlopApiError({
          cause: error,
        });
      },
    });

    return plop;
  }),
}) {}

export class SetPlopGenerator extends Effect.Service<SetPlopGenerator>()(
  "SetPlopGenerator",
  {
    dependencies: [PlopApi.Default],
    effect: Effect.gen(function* () {
      const makePlopApi = yield* PlopApi;
      const plop = yield* makePlopApi;

      const set = Effect.fn("SetPlopGenerator.set")(function* (
        name: string,
        config: Partial<Lib.PlopGeneratorConfig>,
      ) {
        return yield* Effect.sync(() => plop.setGenerator(name, config));
      });

      return {
        set,
      } as const;
    }),
  },
) {}
