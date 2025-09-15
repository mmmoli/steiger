import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ParseResult from "effect/ParseResult";
import * as Ref from "effect/Ref";
import * as Schema from "effect/Schema";
import * as Domain from "../domain";

export const EventsFromUnknownArray = Schema.transformOrFail(
  Schema.Array(Schema.Unknown),
  Schema.Array(Domain.DomainEvent),
  {
    strict: true,
    decode: (list) => {
      const events = Schema.decodeUnknownSync(Schema.Array(Domain.DomainEvent))(
        list,
      );
      return ParseResult.succeed(events);
    },
    encode: (events) =>
      ParseResult.fail(
        new ParseResult.Unexpected(
          events,
          "Conversion to unknown is unnecessary",
        ),
      ),
  },
);

export const EventBusLive = Layer.effect(
  Domain.EventBus,
  Effect.gen(function* () {
    const ref = yield* Ref.make<ReadonlyArray<Domain.EventBusCallback>>([]);

    const registerListener: Domain.EventBusTrait["registerListener"] =
      Effect.fn("EventBusLive.registerListener")(function* (cb) {
        return yield* ref.modify((callbacks) => [
          void 0,
          [...callbacks, cb] as const,
        ]);
      });

    const dispatch: Domain.EventBusTrait["dispatch"] = Effect.fn(
      "EventBusLive.dispatch",
    )(function* (input) {
      const events = yield* Schema.decode(EventsFromUnknownArray)(input).pipe(
        Effect.mapError((cause) => new Domain.InvalidBatchError({ cause })),
      );

      const callbacks = yield* ref.get;

      yield* Effect.forEach(callbacks, (cb) => cb(events), {
        concurrency: "inherit",
      });

      return events;
    });

    return {
      registerListener,
      dispatch,
    } satisfies Domain.EventBusTrait;
  }),
);
