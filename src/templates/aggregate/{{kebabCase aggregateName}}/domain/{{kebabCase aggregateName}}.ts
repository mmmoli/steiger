import * as Schema from "effect/Schema";

export const {{pascalCase aggregateName}}Id = Schema.NonEmptyTrimmedString.pipe(
  Schema.brand("{{pascalCase aggregateName}}Id"),
  Schema.annotations({
    identifier: "{{pascalCase aggregateName}}Id",
    description: `The unique identifies for this {{pascalCase aggregateName}} e.g. "abc1"`,
  })
);

export type {{pascalCase aggregateName}}Id = typeof {{pascalCase aggregateName}}Id.Type

export const {{pascalCase aggregateName}}Name = Schema.NonEmptyTrimmedString.pipe(
  Schema.brand("{{pascalCase aggregateName}}Name"),
  Schema.annotations({
    identifier: "{{pascalCase aggregateName}}Name",
    description: `The name of this {{pascalCase aggregateName}} e.g. "Project 1"`,
  })
);

export type {{pascalCase aggregateName}}Name = typeof {{pascalCase aggregateName}}Name.Type


export class {{pascalCase aggregateName}} extends Schema.Class<{{pascalCase aggregateName}}>(
  "{{kebabCase packageName}}/{{kebabCase aggregateName}}/domain/{{pascalCase aggregateName}}",
)(
  {
  id: {{pascalCase aggregateName}}Id,
  name: {{pascalCase aggregateName}}Name,
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
