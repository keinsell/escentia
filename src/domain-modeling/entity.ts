import {
	SequentialId,
	sequentialId,
} from "src/identifiers/sequential-id/sequential-id"
import { UniqueIdentifier } from "../identifiers/unique-identifier"

export type EntityProperties<
	ID extends UniqueIdentifier = UniqueIdentifier,
	PROPERTIES = {}
> = { id?: ID; version?: SequentialId } & PROPERTIES

export abstract class Entity<ID extends UniqueIdentifier, PROPERTIES = {}> {
	public readonly _entity: string = this.constructor.name.endsWith("Entity")
		? this.constructor.name.slice(0, -6).toLowerCase()
		: this.constructor.name.toLowerCase()

	public readonly _id: ID | undefined
	protected _version: SequentialId = sequentialId(0)

	protected constructor(properties: EntityProperties<ID, PROPERTIES>) {
		this._id = properties.id
		this._version = properties.version || sequentialId(0)
	}

	public get id(): ID {
		if (!this._id) {
			throw new Error("Entity has no ID")
		}

		return this._id
	}

	protected incrementVersion(): void {
		this._version++
	}
}
