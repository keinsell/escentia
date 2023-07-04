import {MessagePayload} from "src/eips/messages/message"
import {EmptyObject, Jsonify} from "type-fest"
import {Event} from "../eips/messages/event"
import {AggregateRoot} from "./aggregate-root"

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
