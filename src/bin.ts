#!/usr/bin/env node

import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Logger from "effect/Logger";
import * as LogLevel from "effect/LogLevel";
import { run } from "./Cli.js";
import * as Plop from "./Plop.js";

const appLive = Layer.mergeAll(Plop.SetPlopGenerator.Default);

run(process.argv).pipe(
  Effect.provide(appLive),
  Effect.provide(NodeContext.layer),
  Logger.withMinimumLogLevel(LogLevel.Debug),
  NodeRuntime.runMain({ disableErrorReporting: true }),
);
