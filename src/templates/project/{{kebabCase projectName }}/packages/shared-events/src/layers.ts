import * as Layer from "effect/Layer";
import * as DomainEvents from "./domain-event/infra";
import * as DomainEventsLayers from "./domain-event/infra/layers";

export const makeCloudflareQueueEventPublisherLayer =
  DomainEvents.makeCloudflareQueueEventPublisherLayer;

export const SharedEventsInfraLayer = Layer.mergeAll(
  DomainEventsLayers.DomainEventInfraLayerLive,
);

export const SharedEventsApplicationLayer = Layer.mergeAll(
  DomainEventsLayers.DomainEventApplicationLayer,
);
