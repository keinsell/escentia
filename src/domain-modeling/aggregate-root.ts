import { UniqueIdentifier } from "../identifiers/unique-identifier"
import { DomainEvent } from "./domain-event"
import { Entity, EntityProperties } from "./entity"

export abstract class AggregateRoot<
	ID extends UniqueIdentifier = UniqueIdentifier,
	PROPERTIES = {}
> extends Entity<ID> {
	protected constructor(properties: EntityProperties<ID, PROPERTIES>) {
		super(properties)
	}

	private __events: DomainEvent<AggregateRoot<ID, PROPERTIES>>[] = []

	get _events(): DomainEvent<AggregateRoot<ID, PROPERTIES>>[] {
		return this.__events
	}

	public addEvent<T extends DomainEvent<AggregateRoot<ID, PROPERTIES>>>(
		event: T
	): void {
		this.incrementVersion()
		this.__events.push(event)
	}
}
