import * as Schema from "effect/Schema";

export const {{pascalCase aggregateName}}Id = Schema.NonEmptyTrimmedString.pipe(
  Schema.brand("{{pascalCase aggregateName}}Id"),
  Schema.annotations({
    identifier: "{{pascalCase aggregateName}}Id",
  })
);

export type {{pascalCase aggregateName}}Id = typeof {{pascalCase aggregateName}}Id.Type

export class {{pascalCase aggregateName}} extends Schema.Class<{{pascalCase aggregateName}}>(
  "{{kebabCase packageName}}/{{kebabCase aggregateName}}/domain/{{pascalCase aggregateName}}",
)(
  {
  id: {{pascalCase aggregateName}}Id,
  // add other fields
}) {
  static decodeSingle = Schema.decodeUnknown({{pascalCase aggregateName}});
  static copy = (
    base: {{pascalCase aggregateName}},
    patch: Partial<{{pascalCase aggregateName}}Type>,
  ) => {
    return Schema.decodeSync({{pascalCase aggregateName}})({ ...base, ...patch });
  };

  public with(
    patch: Partial<{{pascalCase aggregateName}}Type>,
  ): {{pascalCase aggregateName}} {
    return {{pascalCase aggregateName}}.copy(this, patch);
  }
}

type {{pascalCase aggregateName}}Type = typeof {{pascalCase aggregateName}}.Type;

export declare namespace {{pascalCase aggregateName}} {
  export interface Domain extends {{pascalCase aggregateName}}Type {}
  export interface Encoded
    extends Schema.Schema.Encoded<typeof {{pascalCase aggregateName}}> {}
}
