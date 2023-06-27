import {Serializable} from "src/__metadata/serializable-property"
import {MessagePayload} from "src/messages/message"
import {Event} from "../messages/event"
import {AggregateRoot} from "./aggregate-root"

export type DomainEventPayload<AGGREGATE extends AggregateRoot> =
	MessagePayload<{ aggregate: AGGREGATE }>

/** Domain Event is kind of event that happens in the area of specific aggregate. These usually aren't mean to be cross-context but can be. */
export class DomainEvent<AGGREGATE extends AggregateRoot> extends Event<
	DomainEventPayload<AGGREGATE>
> {
	@Serializable()
	public aggregate: AGGREGATE

	constructor(payload: DomainEventPayload<AGGREGATE>) {
		super(payload)
		this.aggregate = payload.aggregate
	}
}
