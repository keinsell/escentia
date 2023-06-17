import {
	SequentialId,
	sequentialId,
} from "src/identifiers/sequential-id/sequential-id"
import { UniqueIdentifier } from "../identifiers/unique-identifier"

export abstract class Entity<ID extends UniqueIdentifier> {
	public readonly _entity: string = this.constructor.name.endsWith("Entity")
		? this.constructor.name.slice(0, -6).toLowerCase()
		: this.constructor.name.toLowerCase()

	protected readonly _id: ID | undefined
	protected _version: SequentialId = sequentialId(0)

	protected constructor(id?: ID, version?: SequentialId) {
		this._id = id
		this._version = version || sequentialId(0)
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
