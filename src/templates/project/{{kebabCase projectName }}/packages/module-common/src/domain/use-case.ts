import * as Data from "effect/Data";

export class InvalidInputError extends Data.TaggedError(
  "core-common/domain/use-case/InvalidInputError",
)<{
  cause: unknown;
}> {}
