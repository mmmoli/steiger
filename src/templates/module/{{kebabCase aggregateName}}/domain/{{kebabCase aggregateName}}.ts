import * as Schema from "effect/Schema";

export const {{pascalCase aggregateName}}Id = Schema.NonEmptyTrimmedString.pipe(
  Schema.brand("{{pascalCase aggregateName}}Id"),
  Schema.annotations({
    identifier: "{{pascalCase aggregateName}}Id",
  })
);

export class {{pascalCase aggregateName}} extends Schema.Class<{{pascalCase aggregateName}}>(
  "{{kebabCase moduleName}}/{{kebabCase aggregateName}}/domain/{{pascalCase aggregateName}}",
)(
  {
  id: {{pascalCase aggregateName}}Id,
  // add other fields
}) {}
