import type * as Drizzle from "drizzle-orm/d1";
import * as Layer from "effect/Layer";
import * as Assets from "../aggregates/asset/infra/layers";
import * as Packages from "../aggregates/package/infra/layers";
import * as Projects from "../aggregates/project/infra/layers";
import * as ProjectMemberships from "../aggregates/project-membership/infra/layers";
import * as Versions from "../aggregates/version/infra/layers";
import * as Workspaces from "../aggregates/workspace/infra/layers";
import * as WorkspaceMemberships from "../aggregates/workspace-membership/infra/layers";
import * as Policies from "./policies";

export const WorkspacesPoliciesLayerLive = Layer.mergeAll(
  Policies.WorkspacesPolicies.Default,
  Projects.ProjectInfraLayerLive,
);

export const WorkspacesInfraLayer = Layer.mergeAll(
  Assets.AssetInfraLayerLive,
  Packages.PackageInfraLayerLive,
  Projects.ProjectInfraLayerLive,
  ProjectMemberships.ProjectMembershipInfraLayerLive,
  Versions.VersionInfraLayerLive,
  WorkspaceMemberships.WorkspaceMembershipInfraLayerLive,
  Workspaces.WorkspaceInfraLayerLive,
);

export const WorkspacesApplicationLayer = Layer.mergeAll(
  // Assets.AssetApplicationLayer,
  // Packages.PackageApplicationLayer,
  // ProjectMemberships.ProjectMembershipApplicationLayer,
  Projects.ProjectApplicationLayer,
  // Versions.VersionApplicationLayer,
  // WorkspaceMemberships.WorkspaceMembershipApplicationLayer,
  // Workspaces.WorkspaceApplicationLayer,
).pipe(
  Layer.provide(WorkspacesInfraLayer),
  Layer.provide(WorkspacesPoliciesLayerLive),
);

export const makeDbRuntimeLayer = (db: Drizzle.AnyD1Database) =>
  Layer.mergeAll(
    Assets.makeAssetDbRuntimeLayer(db),
    Packages.makePackageDbRuntimeLayer(db),
    ProjectMemberships.makeProjectMembershipDbRuntimeLayer(db),
  );
