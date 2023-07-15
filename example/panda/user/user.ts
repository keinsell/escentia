import { SequentialId } from "src"
import { AggregateRoot } from "src/domain-modeling/aggregate-root"
import { EntityProperties } from "src/domain-modeling/entity"

export interface UserProperties {
	/** @type email */
	email: string
}

export class User
	extends AggregateRoot<SequentialId, UserProperties>
	implements UserProperties
{
	public email: string

	constructor(properties: EntityProperties<SequentialId, UserProperties>) {
		super(properties)
		this.email = properties.email
	}
}
