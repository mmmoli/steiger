import * as Command from "@effect/cli/Command";
import * as Aggregate from "./Aggregate.js";
import * as Generate from "./Generate.js";
import * as Package from "./Package.js";
import * as UseCase from "./UseCase.js";

export const run = Command.run(
  Generate.command.pipe(
    Command.withSubcommands([
      Package.command,
      Aggregate.command,
      UseCase.command,
    ]),
  ),
  {
    name: "Steiger",
    version: "0.1.0",
  },
);
