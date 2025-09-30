import * as Resource from "@effect/opentelemetry/Resource";
import * as Tracer from "@effect/opentelemetry/Tracer";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ManagedRuntime from "effect/ManagedRuntime";
import type { AppLoadContext } from "react-router";

export const makeFetchRuntime = <R, E>(live: Layer.Layer<R, E, never>) => {
  const TracingLive = Tracer.layerGlobal.pipe(
    Layer.provide(Resource.layerEmpty),
  );
  const runtime = ManagedRuntime.make(live);

  const wrapRuntime =
    <A, E2, TArgs extends { context: AppLoadContext }>(
      body: (args: TArgs) => Effect.Effect<A, E2, R>,
    ) =>
    async (args: TArgs): Promise<A> => {
      const program = body(args);
      const runnable = Effect.withConfigProvider(
        program.pipe(Effect.provide(TracingLive)),
        ConfigProvider.fromJson(args.context.cloudflare.env),
      );
      return runtime.runPromise(runnable);
    };

  return wrapRuntime;
};
