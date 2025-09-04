import * as Layer from "effect/Layer";
import * as {{ pascalCase aggregateName }}s from "./{{ kebabCase aggregateName }}/infra/layers";

export const WorkspacesInfraLayer = Layer.mergeAll({{ pascalCase aggregateName }}s.{{ pascalCase aggregateName }}InfraLayerLive);

export const WorkspacesApplicationLayer = Layer.mergeAll(
  {{ pascalCase aggregateName }}s.{{ pascalCase aggregateName }}ApplicationLayer,
);
