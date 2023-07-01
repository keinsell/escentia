import { MessagePayload } from "src/messages/message"
import { Event } from "../messages/event"
import { AggregateRoot } from "./aggregate-root"
import { Entity } from "./entity"
import { Jsonify } from "type-fest"

export type DomainEventPayload<ENTITY extends AggregateRoot | Entity> =
  MessagePayload<{ aggregateId: Jsonify<ENTITY['id']>, aggregateVersion: Jsonify<ENTITY['_version']> }>

export class DomainEvent<AGGREGATE extends AggregateRoot> extends Event<
  { aggregateId: Jsonify<AGGREGATE['id']>, aggregateVersion: Jsonify<AGGREGATE['_version']> }
> {
  constructor(payload: DomainEventPayload<AGGREGATE>) {
    super(payload)
  }
}
