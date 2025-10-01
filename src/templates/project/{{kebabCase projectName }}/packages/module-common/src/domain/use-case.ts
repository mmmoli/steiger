import * as Data from "effect/Data";

export class InvalidInputError extends Data.TaggedError(
  "module-common/domain/use-case/InvalidInputError",
)<{
  cause: unknown;
}> {}
