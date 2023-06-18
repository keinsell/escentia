import { UniqueIdentifier } from "src/identifiers/unique-identifier"
import { MessagePayload } from "src/messages/message"
import { Event } from "../messages/event"
import { AggregateRoot } from "./aggregate-root"
import { Entity } from "./entity"

type DomainEventPayload<
	AGGREGATE extends AggregateRoot<Entity<UniqueIdentifier>>
> = MessagePayload<{ aggregate: AGGREGATE }>

/** Domain Event is kind of event that happens in the area of specific aggregate. These usually aren't mean to be cross-context but can be. */
export class DomainEvent<
	AGGREGATE extends AggregateRoot<Entity<UniqueIdentifier>>
> extends Event<DomainEventPayload<AGGREGATE>> {
	public aggregate: AGGREGATE

	constructor(payload: DomainEventPayload<AGGREGATE>) {
		super(payload)
		this.aggregate = payload.aggregate
	}
}