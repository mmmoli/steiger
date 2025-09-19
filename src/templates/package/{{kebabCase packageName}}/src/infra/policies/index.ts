import * as Effect from "effect/Effect";
import { OnProjectCreatedPolicy } from "./on-project-created-policy";
import { OnProjectDetailsChangedPolicy } from "./on-project-details-changed-policy";

export class WorkspacesPolicies extends Effect.Service<WorkspacesPolicies>()(
  "core-workspaces/policy/WorkspacesPolicies",
  {
    dependencies: [
      OnProjectDetailsChangedPolicy.Default,
      OnProjectCreatedPolicy.Default,
    ],
    effect: Effect.gen(function* (_) {
      yield* OnProjectCreatedPolicy;
      yield* OnProjectDetailsChangedPolicy;
      return Effect.succeed(void 0);
    }),
  },
) {}
