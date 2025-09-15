import * as Schema from "effect/Schema";

export const DomainEventId = Schema.NonEmptyTrimmedString.pipe(
  Schema.brand("DomainEventId"),
  Schema.annotations({
    identifier: "DomainEventId",
  }),
);
