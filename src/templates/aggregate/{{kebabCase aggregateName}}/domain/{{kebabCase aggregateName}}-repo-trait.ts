import * as Context from "effect/Context";
import * as Data from "effect/Data";
import type * as Effect from "effect/Effect";
import type * as Option from "effect/Option";
import type * as Domain from "./{{kebabCase aggregateName}}";

export class {{pascalCase aggregateName}}NotFoundError extends Data.TaggedError(
  "{{kebabCase packageName}}/{{kebabCase aggregateName}}/domain/{{pascalCase aggregateName}}NotFoundError",
)<{
  cause: unknown;
}> {}

export class {{pascalCase aggregateName}}GetFailed extends Data.TaggedError(
  "{{kebabCase packageName}}/{{kebabCase aggregateName}}/domain/{{pascalCase aggregateName}}GetFailed",
)<{
  cause: unknown;
}> {}

export class {{pascalCase aggregateName}}SaveFailed extends Data.TaggedError(
  "{{kebabCase packageName}}/{{kebabCase aggregateName}}/domain/{{pascalCase aggregateName}}SaveFailed",
)<{
  cause: unknown;
}> {}

export class {{pascalCase aggregateName}}DeleteFailed extends Data.TaggedError(
  "{{kebabCase packageName}}/{{kebabCase aggregateName}}/domain/{{pascalCase aggregateName}}DeleteFailed",
)<{
  cause: unknown;
}> {}

export class {{pascalCase aggregateName}}EncodeError extends Data.TaggedError(
  "{{kebabCase packageName}}/{{kebabCase aggregateName}}/domain/{{pascalCase aggregateName}}EncodeError",
)<{
  cause: unknown;
}> {}

export interface {{pascalCase aggregateName}}RepoTrait {
  getForId(
    id: Domain.{{pascalCase aggregateName}}Id,
  ): Effect.Effect<Option.Option<Domain.{{pascalCase aggregateName}}>, {{pascalCase aggregateName}}GetFailed | {{pascalCase aggregateName}}EncodeError>;
  save({{ camelCase aggregateName }}: Domain.{{pascalCase aggregateName}}.Domain): Effect.Effect<void, {{pascalCase aggregateName}}SaveFailed>;
  delete(
    {{ camelCase aggregateName }}: Domain.{{pascalCase aggregateName}}.Domain,
  ): Effect.Effect<void, {{pascalCase aggregateName}}DeleteFailed>;
}

export class {{pascalCase aggregateName}}Repo extends Context.Tag(
  "{{kebabCase packageName}}/{{kebabCase aggregateName}}/domain/{{pascalCase aggregateName}}Repo",
)<{{pascalCase aggregateName}}Repo, {{pascalCase aggregateName}}RepoTrait>() {}
