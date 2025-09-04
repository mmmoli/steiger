#!/usr/bin/env node

import "tsx/esm";
import { run } from "plop";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plopfilePath = path.resolve(__dirname, "plopfile.ts");

console.log("Using plopfile:", plopfilePath);

await run(["--plopfile", plopfilePath], {
  cwd: __dirname,
});
