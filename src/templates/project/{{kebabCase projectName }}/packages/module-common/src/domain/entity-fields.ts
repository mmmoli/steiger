import * as Schema from "effect/Schema";

export const DateField = Schema.Union(
  Schema.DateFromString,
  Schema.DateFromSelf,
);

export type DateField = typeof DateField.Type;

export const dateFields = {
  createdAt: DateField.pipe(
    Schema.annotations({
      identifier: "createdAt",
      description: "Date this object was first created.",
    }),
  ),
  updatedAt: DateField.pipe(
    Schema.annotations({
      identifier: "updatedAt",
      description: "Date this object was last modified.",
    }),
  ),
};

export const deletedFields = {
  isDeleted: Schema.Boolean.pipe(
    Schema.annotations({
      identifier: "isDeleted",
      description:
        "Boolean flag denoting whether or not this object should be considered deleted. TRUE means `is deleted'",
    }),
    Schema.propertySignature,
    Schema.withConstructorDefault(() => false),
  ),
};

export const DeletionMode = Schema.Literal("SOFT", "HARD").pipe(
  Schema.brand("shouldSoftDelete"),
  Schema.annotations({
    identifier: "DeletionMode",
    description:
      "Describes how to delete an object. SOFT changes a property. HARD removes the object from the database.",
  }),
);

export const entityFields = {
  ...dateFields,
  ...deletedFields,
};
