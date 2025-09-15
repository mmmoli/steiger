import * as Context from "effect/Context";
import * as Data from "effect/Data";
import type * as Effect from "effect/Effect";
import type * as Domain from "./domain-event";

export class InvalidBatchError extends Data.TaggedError(
  "shared-events/domain-event/domain/InvalidBatchError",
)<{
  cause: unknown;
}> {}

export class EventBusCallbackError extends Data.TaggedError(
  "shared-events/domain-event/domain/EventBusCallbackError",
)<{
  cause: unknown;
}> {}

export type EventBusCallback = (
  events: ReadonlyArray<Domain.DomainEventType>,
) => Effect.Effect<void, EventBusCallbackError>;

export interface EventBusTrait {
  registerListener: (cb: EventBusCallback) => Effect.Effect<void>;
  dispatch: (
    events: ReadonlyArray<unknown>,
  ) => Effect.Effect<ReadonlyArray<Domain.DomainEventType>, InvalidBatchError>;
}

export class EventBus extends Context.Tag(
  "shared-events/domain-event/domain/EventBus",
)<EventBus, EventBusTrait>() {}
