import {
	SequentialId,
	sequentialId,
} from "src/identifiers/sequential-id/sequential-id"
import { UniqueIdentifier } from "../identifiers/unique-identifier"
import { DomainEvent } from "./domain-event"
import { Entity } from "./entity"

export abstract class AggregateRoot<ENTITY extends Entity<UniqueIdentifier>> {
	protected readonly _id: ENTITY["_id"]
	protected root: ENTITY

	protected constructor(root: ENTITY, version?: SequentialId) {
		this._id = root._id
		this.__version = version || sequentialId(0)
		this.root = root
	}

	protected __version: SequentialId

	public get _version(): SequentialId {
		return this.__version
	}

	private __events: DomainEvent<AggregateRoot<ENTITY>>[] = []

	get _events(): DomainEvent<AggregateRoot<ENTITY>>[] {
		return this.__events
	}

	public addEvent<T extends DomainEvent<AggregateRoot<ENTITY>>>(
		event: T
	): void {
		this.__version++
		this.__events.push(event)
	}
}
