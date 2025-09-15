import * as Layer from "effect/Layer";
import * as EventBus from "./domain-event-bus";

export const DomainEventInfraLayerLive = Layer.mergeAll(EventBus.EventBusLive);

export const DomainEventApplicationLayer = Layer.empty;
