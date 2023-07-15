import { Exception } from "./exception"

/** This exception occurs in situations where concurrent access to data is allowed, and conflicts arise. It usually happens when multiple users or processes try to modify the same data simultaneously. The exception indicates that an optimistic locking strategy has failed. */
export class OptimisticLockingConflict extends Exception {
	constructor(message: string) {
		super({
			statusCode: 400,
			message: message,
		})
	}
}
