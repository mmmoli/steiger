import * as Command from "@effect/cli/Command";
import { aggregateCommand } from "./commands/Aggregate.js";

const command = Command.make("generate").pipe(
  Command.withDescription("Generates code"),
  Command.withSubcommands([aggregateCommand]),
);

export const run = Command.run(command, {
  name: "Steiger",
  version: "0.1.0",
});
