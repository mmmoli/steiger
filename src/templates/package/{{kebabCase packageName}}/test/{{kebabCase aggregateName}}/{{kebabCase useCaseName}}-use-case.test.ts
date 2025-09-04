import { describe, expect, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Domain from "../../src/domain";
import * as UCs from "../../src/infra";
import * as Test from "./../test-layer";

describe("{{ pascalCase useCaseName }}UseCase", () => {
  it.effect("creates a new {{ kebabCase aggregateName }}", () =>
    Effect.gen(function* () {
      const uc = yield* UCs.{{ pascalCase useCaseName }}UseCase;
      const {{ kebabCase aggregateName }} = yield* uc.execute({
        {{ kebabCase aggregateName }}: {
          name: Domain.{{ pascalCase aggregateName }}Name.make("Test {{ pascalCase aggregateName }}"),
        },
      });

      expect({{ kebabCase aggregateName }}).toBeDefined();
      expect({{ kebabCase aggregateName }}.name).toEqual("Test {{ pascalCase aggregateName }}");
    }).pipe(
      Effect.provide(
        UCs.{{ pascalCase useCaseName }}UseCase.Default.pipe(Layer.provide(Test.layer)),
      ),
    ),
  );
});
