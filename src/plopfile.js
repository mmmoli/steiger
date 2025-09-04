import { fileURLToPath } from "url";
import path from "path";

export default function (/** @type {import('node-plop').NodePlopAPI} */ plop) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatesDir = path.join(__dirname, "templates");

  plop.setGenerator("module", {
    description: "Generate a new DDD module + Effect",
    prompts: [
      {
        type: "input",
        name: "moduleName",
        message: "Module name (e.g. Auth)",
      },
      {
        type: "input",
        name: "aggregateName",
        message: "Aggregate root name (e.g. User)",
      },
      {
        type: "input",
        name: "useCaseName",
        message: "Primary use case (e.g. CreateUser)",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: process.cwd(),
        base: path.join(templatesDir, "aggregate"),
        templateFiles: path.join(templatesDir, "aggregate", "**/*"),
      },
    ],
  });
}
