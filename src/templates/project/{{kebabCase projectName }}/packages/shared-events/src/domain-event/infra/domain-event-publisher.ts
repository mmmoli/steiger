import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import * as Domain from "../domain";

export interface QueueTrait {
  send: (event: Domain.DomainEventEncodedType) => Promise<void>;
}

const encoder = Schema.encode(Domain.DomainEvent);

export const makeCloudflareQueueEventPublisher = (
  queue: QueueTrait,
): Domain.EventPublisherTrait => ({
  publish: Effect.fn("makeCloudflareQueueEventPublisher.publish")(
    function* (event) {
      const encoded = yield* encoder(event).pipe(
        Effect.mapError(
          (cause) => new Domain.InvalidEventPayloadError({ cause }),
        ),
      );

      yield* Effect.tryPromise({
        try: () => queue.send(encoded),
        catch: (cause) => new Domain.EventPublishError({ cause }),
      });
    },
  ),
});

export const makeCloudflareQueueEventPublisherLayer = (
  binding: QueueTrait,
): Layer.Layer<Domain.EventPublisher> => {
  const publisher = makeCloudflareQueueEventPublisher(binding);
  return Layer.succeed(
    Domain.EventPublisher,
    Domain.EventPublisher.of(publisher),
  );
};

export const EventPublisherDummy = Layer.succeed(
  Domain.EventPublisher,
  Domain.EventPublisher.of({
    publish: Effect.fn("EventPublisherDummy.publish")(function* (event) {
      yield* Effect.logInfo("Event published", event);
    }),
  }),
);
