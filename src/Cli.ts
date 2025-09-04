import * as Command from "@effect/cli/Command";
import * as Aggregate from "./Aggregate.js";
import * as Package from "./Package.js";

const command = Command.make("generate").pipe(
  Command.withDescription("Generates code"),
  Command.withSubcommands([Aggregate.command, Package.command]),
);

export const run = Command.run(command, {
  name: "Steiger",
  version: "0.1.0",
});
