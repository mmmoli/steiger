import { NodeSdk } from "@effect/opentelemetry";
import * as OTLP from "@opentelemetry/exporter-trace-otlp-http";
import * as Base from "@opentelemetry/sdk-trace-base";

export const makeNodeSdkLive = (serviceName: string) =>
  NodeSdk.layer(() => ({
    resource: { serviceName },
    spanProcessor: new Base.BatchSpanProcessor(
      new OTLP.OTLPTraceExporter({ url: "http://localhost:4318/v1/traces" }),
    ),
    // spanProcessor: new Base.BatchSpanProcessor(new Base.ConsoleSpanExporter()),
  }));
