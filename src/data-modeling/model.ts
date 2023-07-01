import {UniqueIdentifier} from "../identifiers/unique-identifier"


export type ModelPayload<ID = UniqueIdentifier, T = unknown> = {
	id?: ID | undefined
} & T

// TODO: This approach will not be compatible with `typeorm` potentially.
// TypeORM would like to have a @PrimaryColumn() decorator on the ID field.

export abstract class Model<ID extends UniqueIdentifier = UniqueIdentifier, PROPERTIES = unknown> {
	public readonly _model: string = this.constructor.name.endsWith("Model")
		? this.constructor.name.slice(0, -5).toLowerCase()
		: this.constructor.name.toLowerCase()

	// IDs can be managed by underlying database and should not be set by the application.
	// This allows for usage of Sequential Ids in specific database models.
	public readonly id?: ID | undefined

	protected constructor(payload: ModelPayload<ID, PROPERTIES>) {
		this.id = payload.id
		Object.assign(this, payload)
	}
}
