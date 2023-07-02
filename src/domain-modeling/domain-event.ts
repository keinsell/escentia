import { MessagePayload } from "src/messages/message"
import { Event } from "../messages/event"
import { AggregateRoot } from "./aggregate-root"
import { EmptyObject, Jsonify } from "type-fest"

export type DomainEventPayload<Aggregate extends AggregateRoot, AdditionalProperties = EmptyObject> =
  MessagePayload<{ aggregateId: Jsonify<Aggregate['id']>, aggregateVersion: Jsonify<Aggregate['_version']> } & AdditionalProperties>

export class DomainEvent<AGGREGATE extends AggregateRoot, AdditionalProperties = EmptyObject> extends Event<
  { aggregateId: string, aggregateVersion: number } & AdditionalProperties
> {
  constructor(payload: DomainEventPayload<AGGREGATE, AdditionalProperties>) {
    super({
      ...payload,
      body: {
        ...payload.body,
        aggregateId: JSON.stringify(payload.body.aggregateId),
        aggregateVersion: payload.body.aggregateVersion as number,
      },
    })
  }
}
