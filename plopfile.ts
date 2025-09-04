import type * as API from "plop";

export default function (plop: API.NodePlopAPI) {
  plop.setGenerator("module", {
    description: "Generate a new DDD module",
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
        destination: "{{dashCase moduleName}}",
        base: "templates/module",
        templateFiles: "templates/module/**/*",
      },
    ],
  });
}
