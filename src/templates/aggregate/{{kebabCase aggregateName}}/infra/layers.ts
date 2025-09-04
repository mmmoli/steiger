import * as Layer from "effect/Layer";
import * as UCs from "./index";

export const InfraLayerLive = Layer.empty;

export const ApplicationLayer = Layer.mergeAll(UCs.{{ pascalCase useCaseName }}UseCase.Default);
