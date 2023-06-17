import { UniqueIdentifier } from "../identifiers/unique-identifier"

export interface ModelProperties<ID extends UniqueIdentifier> {
	readonly id: ID
}

// TODO: This approach will not be compatible with `typeorm` potentially.
// TypeORM would like to have a @PrimaryColumn() decorator on the ID field.
export abstract class Model<ID extends UniqueIdentifier> {
	public readonly _model: string = this.constructor.name.endsWith("Model")
		? this.constructor.name.slice(0, -5).toLowerCase()
		: this.constructor.name.toLowerCase()
	public readonly id: ID

	public constructor(payload: ModelProperties<ID>) {
		this.id = payload.id
		Object.assign(this, payload)
	}
}
