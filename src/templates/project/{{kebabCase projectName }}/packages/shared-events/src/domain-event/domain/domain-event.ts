import * as Schema from "effect/Schema";
import * as Common from "./common";
import * as WorkspaceProjects from "./workspaces/project";

export const UserRegisteredEvent = Schema.Struct({
  kind: Schema.Literal("UserRegistered"),
  id: Common.DomainEventId,
}).pipe(
  Schema.annotations({
    identifier: "UserRegisteredEvent",
  }),
);

export const AssetCreatedEvent = Schema.Struct({
  kind: Schema.Literal("AssetCreatedEvent"),
  id: Common.DomainEventId,
}).pipe(
  Schema.annotations({
    identifier: "AssetCreatedEvent",
  }),
);

export const VersionCreatedEvent = Schema.Struct({
  kind: Schema.Literal("VersionCreated"),
  id: Common.DomainEventId,
  versionId: Schema.NonEmptyTrimmedString,
}).pipe(
  Schema.annotations({
    identifier: "VersionCreatedEvent",
  }),
);

export const DomainEvent = Schema.Union(
  AssetCreatedEvent,
  UserRegisteredEvent,
  VersionCreatedEvent,
  WorkspaceProjects.ProjectCreatedEvent,
  WorkspaceProjects.ProjectDetailsChangedEvent,
);

export type DomainEventType = Schema.Schema.Type<typeof DomainEvent>;
export type DomainEventEncodedType = Schema.Schema.Encoded<typeof DomainEvent>;
