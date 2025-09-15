import * as Schema from "effect/Schema";
import * as Common from "../common";

const Project = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  slug: Schema.String,
});

export const ProjectCreatedEvent = Schema.Struct({
  kind: Schema.Literal("ProjectCreatedEvent"),
  id: Common.DomainEventId,
  project: Project,
}).pipe(
  Schema.annotations({
    identifier: "ProjectCreatedEvent",
  }),
);

export const ProjectDetailsChangedEvent = Schema.Struct({
  kind: Schema.Literal("ProjectDetailsChangedEvent"),
  id: Common.DomainEventId,
  project: Project,
}).pipe(
  Schema.annotations({
    identifier: "ProjectDetailsChangedEvent",
  }),
);
