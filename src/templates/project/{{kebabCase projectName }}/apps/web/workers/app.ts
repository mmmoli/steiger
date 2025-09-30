import { instrument, type ResolveConfigFn } from "@microlabs/otel-cf-workers";
import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

const handler: ExportedHandler<Env> = {
  fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
};

const config: ResolveConfigFn = (env: Env) => {
  return {
    exporter: {
      url: env.OTEL_ENDPOINT,
      // biome-ignore lint/suspicious/noExplicitAny: It might exist
      headers: JSON.parse((env as any).OTEL_HTTP_HEADERS ?? "{}"),
    },
    service: { name: env.OTEL_SERVICE_NAME },
  };
};

export default instrument(handler, config);
