import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Runtime from "~lib/shared/infra/make-runtime";
import type { Route } from "./+types/_index";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const routeLayerLive = Layer.empty;

const runtime = Runtime.makeFetchRuntime(routeLayerLive);

export const loader = runtime(
  Effect.fn("http.route")(function* ({
    context: {
      cloudflare: { env },
    },
  }: Route.LoaderArgs) {
    yield* Effect.annotateCurrentSpan({
      message: env.VALUE_FROM_CLOUDFLARE,
    });
    yield* Effect.log("what?");
    yield* Effect.logWarning("hahaha?");
    return {
      message: env.VALUE_FROM_CLOUDFLARE,
    };
  }),
);

export default function Home({ loaderData }: Route.ComponentProps) {
  return <p>{loaderData.message}</p>;
}
