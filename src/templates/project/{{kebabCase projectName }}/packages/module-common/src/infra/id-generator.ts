import API from "@paralleldrive/cuid2";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Domain from "../domain";

export const IDGeneratorLive = Layer.succeed(
  Domain.IDGenerator,
  Domain.IDGenerator.of(() => Effect.sync(API.createId)),
);
