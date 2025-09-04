import * as Common from "@htch/core-common/domain";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as Dogs from "../../dogs/domain";
import * as Domain from "../domain";

export class {{ pascalCase useCaseName }}UseCaseInput extends Schema.Class<{{ pascalCase useCaseName }}UseCaseInput>(
  "{{ kebabCase moduleName }}/{{ kebabCase aggregateName }}/application/{{ pascalCase useCaseName }}UseCaseInput",
)(
  {
    pipeline: Schema.Struct({
      id: Domain.{{ pascalCase aggregateName }}Id.pipe(
        Schema.annotations({
          description: `The ID of the {{ kebabCase moduleName }} you'd like to run e.g. "Picture 1"`,
        }),
      ),
    }),
  },
  [
    {
      identifier: "{{ pascalCase useCaseName }}UseCaseInput",
      description: "Input needed to start an Run",
    },
  ],
) {
  static parse = (input: unknown) =>
  Schema.decodeUnknown({{ pascalCase useCaseName }}UseCaseInput)(input).pipe(
      Effect.mapError((cause) => new Common.InvalidInputError({ cause })),
    );
}

export interface {{ pascalCase useCaseName }}UseCaseImpl {
  execute: (
    params: typeof {{ pascalCase useCaseName }}UseCaseInput.Encoded,
  ) => Effect.Effect<
    Domain.{{ pascalCase aggregateName }},
    | Common.InvalidInputError
    | Domain.{{ pascalCase aggregateName }}GetFailed
  >;
}
