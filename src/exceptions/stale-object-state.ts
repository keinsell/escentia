import { Exception } from "./exception"

/** This exception is closely related to the optimistic locking mechanism. It occurs when an object being persisted is stale or outdated compared to the version of the object that exists in the data store. This can happen if another process or user has modified the same object since it was last accessed. */
export class StaleObjectState extends Exception {
	constructor(message: string) {
		super({
			statusCode: 400,
			message: message,
		})
	}
}
