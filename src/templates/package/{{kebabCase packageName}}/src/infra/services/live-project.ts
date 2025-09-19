import * as Liveblocks from "@liveblocks/node";
import * as Config from "effect/Config";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";

export type ProjectMetadata = {
  isReady: boolean;
  id: string;
  name: string;
  slug: string;
};

export class LiveProjectUpdateError extends Data.TaggedError(
  "core-workspaces/projects/infra/LiveProjectUpdateError",
)<{
  cause: unknown;
  roomId: string;
}> {}

export class LiveProjectInitRoomError extends Data.TaggedError(
  "core-workspaces/projects/infra/LiveProjectInitRoomError",
)<{
  cause: unknown;
  roomId: string;
}> {}

export class LiveProjectInitRoomStorageError extends Data.TaggedError(
  "core-workspaces/projects/infra/LiveProjectInitRoomStorageError",
)<{
  cause: unknown;
  roomId: string;
}> {}

export class LiveProject extends Effect.Service<LiveProject>()(
  "core-workspaces/projects/infra/LiveProject",
  {
    effect: Effect.gen(function* () {
      const secretKey = yield* Config.redacted("LIVEBLOCKS_SECRET_KEY");

      const liveblocks = new Liveblocks.Liveblocks({
        secret: Redacted.value(secretKey),
      });

      const createRoomId = ({ slug }: { slug: string }) => slug;

      const update = Effect.fn("LiveProject.update")(function* (
        payload: Partial<ProjectMetadata> &
          Pick<ProjectMetadata, "id" | "slug">,
      ) {
        const roomId = createRoomId(payload);

        yield* Effect.tryPromise({
          try: () =>
            liveblocks.mutateStorage(roomId, ({ root }) => {
              const project = root.get(
                "project",
              ) as Liveblocks.LiveObject<ProjectMetadata> | null;
              if (!project) return;

              for (const [key, value] of Object.entries(payload)) {
                project.set(key as keyof ProjectMetadata, value);
              }
            }),
          catch: (cause) => new LiveProjectUpdateError({ cause, roomId }),
        }).pipe(Effect.tapError((err) => Effect.logError(err)));

        yield* Effect.annotateCurrentSpan({
          "project.id": payload.id,
        });

        Effect.logDebug("LiveProject Updated", {
          "project.id": payload.id,
          "project.slug": payload.slug,
        }).pipe(
          Effect.annotateLogs(
            "tag",
            "core-workspaces/projects/infra/LiveProject",
          ),
        );
      });

      const initProject = Effect.fn("LiveProject.initProject")(function* (
        payload: Omit<ProjectMetadata, "isReady">,
      ) {
        const roomId = createRoomId(payload);
        const room = yield* Effect.tryPromise({
          try: () =>
            liveblocks.getOrCreateRoom(roomId, {
              defaultAccesses: ["room:write"],
              metadata: {
                roomType: "project",
              },
            }),
          catch: (cause) => new LiveProjectInitRoomError({ cause, roomId }),
        }).pipe(Effect.tapError((err) => Effect.logError(err)));

        yield* Effect.logDebug("Liveblocks Project Room created", {
          room,
        });

        yield* Effect.tryPromise({
          try: () =>
            // Mutate storage because we assume the client is already in the room
            liveblocks.mutateStorage(room.id, ({ root }) => {
              const project = new Liveblocks.LiveObject({
                ...payload,
                isReady: true,
              } satisfies ProjectMetadata);
              root.set("project", project);
            }),
          catch: (cause) =>
            new LiveProjectInitRoomStorageError({ cause, roomId: room.id }),
        }).pipe(Effect.tapError((err) => Effect.logError(err)));

        yield* Effect.logDebug("Liveblocks Project Room Storage initialised");

        yield* Effect.annotateCurrentSpan({
          "project.id": payload.id,
        });

        Effect.logDebug("LiveProject Project initialised", {
          "project.id": payload.id,
          "project.slug": payload.slug,
        }).pipe(
          Effect.annotateLogs(
            "tag",
            "core-workspaces/projects/infra/LiveProject",
          ),
        );
      });
      return { update, initProject } as const;
    }),
  },
) {}
