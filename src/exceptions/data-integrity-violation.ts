import { Exception } from "./exception"

/** This exception typically occurs when there is a violation of data integrity rules during persistence operations. For example, if you try to insert a record with a duplicate key or violate a unique constraint, this exception may be thrown. */
export class DataIntegrityViolation extends Exception {
	constructor(message: string) {
		super({
			statusCode: 400,
			message: message,
		})
	}
}
