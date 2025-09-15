import * as Context from "effect/Context";
import * as Data from "effect/Data";
import type * as Effect from "effect/Effect";
import type * as Domain from "./domain-event";

export class EventPublishError extends Data.TaggedError(
  "shared-events/domain-event/domain/EventPublishError",
)<{
  cause: unknown;
}> {}

export class InvalidEventPayloadError extends Data.TaggedError(
  "shared-events/domain-event/domain/InvalidEventPayloadError",
)<{
  cause: unknown;
}> {}

export interface EventPublisherTrait {
  publish: (
    event: Domain.DomainEventType,
  ) => Effect.Effect<void, EventPublishError | InvalidEventPayloadError>;
}

export class EventPublisher extends Context.Tag(
  "shared-events/domain-event/domain/EventPublisher",
)<EventPublisher, EventPublisherTrait>() {}
