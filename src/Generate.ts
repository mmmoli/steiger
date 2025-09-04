import * as Command from "@effect/cli/Command";
import * as Options from "@effect/cli/Options";

export const command = Command.make("generate", {
  destination: Options.text("destination").pipe(
    Options.withDescription("The location of the module to generate"),
    Options.withDefault("./"),
  ),
}).pipe(Command.withDescription("Generates code"));
