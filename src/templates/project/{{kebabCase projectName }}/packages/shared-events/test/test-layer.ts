import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Domain from "../src/domain";
import * as DomainEventsLayers from "../src/layers";

const EventPublisherTest = Layer.effect(
  Domain.EventPublisher,
  Effect.gen(function* (_) {
    const eventBus = yield* Domain.EventBus;
    return Domain.EventPublisher.of({
      publish: Effect.fn("EventPublisherTest.publish")(function* (event) {
        yield* Effect.logInfo("Event published", event);
        // Get event bus and dispatch to it so listeners receive the event
        yield* eventBus
          .dispatch([event])
          .pipe(
            Effect.mapError((cause) => new Domain.EventPublishError({ cause })),
          );
      }),
    });
  }).pipe(Effect.provide(DomainEventsLayers.SharedEventsInfraLayer)),
);

export const layer = Layer.mergeAll(
  DomainEventsLayers.SharedEventsInfraLayer,
  EventPublisherTest,
);
