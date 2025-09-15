import * as Sdk from "@effect/opentelemetry/NodeSdk";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
// import * as Base from "@opentelemetry/sdk-trace-web";
import * as Base from "@opentelemetry/sdk-trace-node";
import { Config, Effect, Layer, Redacted } from "effect";

export const makeHoneycombSdkLive = (dataset: string) =>
  Layer.unwrapEffect(
    Effect.gen(function* () {
      const apiKey = yield* Config.option(Config.redacted("HONEYCOMB_API_KEY"));
      if (apiKey._tag === "None") {
        const endpoint = yield* Config.option(
          Config.string("OTEL_EXPORTER_OTLP_ENDPOINT"),
        );
        if (endpoint._tag === "None") {
          return Layer.empty;
        }
        return Sdk.layer(() => ({
          resource: {
            serviceName: dataset,
          },
          spanProcessor: new Base.BatchSpanProcessor(
            new OTLPTraceExporter({ url: `${endpoint.value}/v1/traces` }),
          ),
        }));
      }

      const headers = {
        "X-Honeycomb-Team": Redacted.value(apiKey.value),
        "X-Honeycomb-Dataset": dataset,
      };

      return Sdk.layer(() => ({
        resource: {
          serviceName: dataset,
        },
        spanProcessor: new Base.BatchSpanProcessor(
          new OTLPTraceExporter({
            url: "https://api.honeycomb.io/v1/traces",
            headers,
          }),
        ),
      }));
    }),
  );
