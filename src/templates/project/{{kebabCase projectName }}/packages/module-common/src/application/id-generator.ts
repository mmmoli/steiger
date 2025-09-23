import API from "@paralleldrive/cuid2";
import * as Effect from "effect/Effect";

export class IDGenerator extends Effect.Service<IDGenerator>()(
  "module-common/application/IDGenerator",
  {
    sync: API.createId,
  },
) {}
