import * as Events from "@htch/shared-events/domain";
import * as Effect from "effect/Effect";
import * as Schedule from "effect/Schedule";
import * as Live from "../services/live-project";

export class OnProjectCreatedPolicy extends Effect.Service<OnProjectCreatedPolicy>()(
  "core-workspaces/policy/OnProjectCreatedPolicy",
  {
    dependencies: [Live.LiveProject.Default],
    effect: Effect.gen(function* () {
      const eventBus = yield* Events.EventBus;
      const liveProject = yield* Live.LiveProject;

      const handler: Events.EventBusCallback = Effect.fn(
        "OnProjectCreatedPolicy.handler",
      )(function* (events) {
        yield* Effect.logTrace(`Policy received ${events.length} events`).pipe(
          Effect.annotateLogs(
            "tag",
            "core-workspaces/policy/OnProjectCreatedPolicy",
          ),
        );

        yield* Effect.forEach(events, (event) =>
          Effect.gen(function* () {
            if (event.kind !== "ProjectCreatedEvent") return;

            yield* Effect.logDebug(
              `Processing event: ${event.id} type: ${event.kind}`,
            ).pipe(
              Effect.annotateLogs(
                "tag",
                "core-workspaces/policy/OnProjectCreatedPolicy",
              ),
            );

            yield* liveProject
              .initProject({
                id: event.project.id,
                name: event.project.name,
                slug: event.project.slug,
              })
              .pipe(
                Effect.retry(
                  Schedule.addDelay(Schedule.recurs(3), () => "100 millis"),
                ),
                Effect.mapError(
                  (cause) => new Events.EventBusCallbackError({ cause }),
                ),
              );

            yield* Effect.logTrace("Policy Completed").pipe(
              Effect.annotateLogs(
                "tag",
                "core-workspaces/policy/OnProjectCreatedPolicy",
              ),
            );
          }),
        );
      });

      yield* Effect.logTrace("OnProjectCreatedPolicy Registered").pipe(
        Effect.annotateLogs(
          "tag",
          "core-workspaces/policy/OnProjectCreatedPolicy",
        ),
      );

      yield* eventBus.registerListener(handler);
      return Effect.succeed(void 0);
    }),
  },
) {}
