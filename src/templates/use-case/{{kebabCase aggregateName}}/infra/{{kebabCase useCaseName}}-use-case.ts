import * as Common from "@htch/core-common/domain";
import * as Infra from "@htch/core-common/infra";
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as Domain from "../../domain";
import * as App from "../application";

export class {{ pascalCase useCaseName }}UseCase extends Effect.Service<{{ pascalCase useCaseName }}UseCase>()(
  "{{ kebabCase packageName }}/{{ kebabCase aggregateName }}/infra/{{ pascalCase useCaseName }}UseCaseInput",
  {
    dependencies: [Infra.IDGeneratorLive],
    effect: Effect.gen(function* () {
      const repo = yield* Domain.{{ pascalCase aggregateName }}Repo;
      const generateId = yield* Common.IDGenerator;

      const execute: App.{{ pascalCase useCaseName }}UseCaseImpl["execute"] = Effect.fn(
        "{{ pascalCase useCaseName }}UseCase.execute",
      )(function* (dto) {
        const input = yield* App.{{ pascalCase useCaseName }}UseCaseInput.decode(dto);

        const now = new Date(yield* Clock.currentTimeMillis);

        const {{ camelCase aggregateName }}Id = yield* generateId(input.{{ camelCase aggregateName }}.id).pipe(
          Effect.map((id) => Domain.{{ pascalCase aggregateName }}Id.make(id)),
        );

        const {{ camelCase aggregateName }} = Domain.{{ pascalCase aggregateName }}.make({
          id: {{ camelCase aggregateName }}Id,
          createdAt: now,
        });

        yield* repo.save({{ camelCase aggregateName }});

        yield* Effect.annotateCurrentSpan({
          "{{ camelCase aggregateName }}.id": {{ camelCase aggregateName }}.id,
        });

        yield* Effect.logInfo("{{ pascalCase aggregateName }} Created", {
          "{{ camelCase aggregateName }}.id": {{ camelCase aggregateName }}.id,
        });

        return {{ camelCase aggregateName }};
      });

      return { execute } satisfies App.{{ pascalCase useCaseName }}UseCaseImpl;
    }),
  },
) {}
