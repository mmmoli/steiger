import { describe, expect, it, vi } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as Domain from "../../src/domain";
import * as Test from "../test-layer";

describe("DomainEventBus", () => {
  it.effect("creates a new domain-event", () =>
    Effect.gen(function* (_) {
      const eventBus = yield* Domain.EventBus;
      const listenerSpy = vi.fn();

      yield* eventBus.registerListener((events) =>
        Effect.forEach(events, (event) =>
          Effect.sync(() => listenerSpy(event.id)),
        ),
      );

      const fakeEvent = Domain.VersionCreatedEvent.make({
        kind: "VersionCreated",
        id: Domain.DomainEventId.make("test-id"),
        versionId: "v1",
      });

      yield* eventBus.dispatch([fakeEvent]);

      expect(listenerSpy).toHaveBeenCalledWith("test-id");
    }).pipe(Effect.provide(Test.layer)),
  );

  it.effect("dispatching without any listeners is a no-op", () =>
    Effect.gen(function* (_) {
      const eventBus = yield* Domain.EventBus;

      const fakeEvent = Domain.VersionCreatedEvent.make({
        kind: "VersionCreated",
        id: Domain.DomainEventId.make("no-op"),
        versionId: "v1",
      });

      // Should do nothing and not throw
      yield* eventBus.dispatch([fakeEvent]);
    }).pipe(Effect.provide(Test.layer)),
  );
});
