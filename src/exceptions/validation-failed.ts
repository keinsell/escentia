import { Exception } from "./exception"

export interface ValidationError {
	path: string
	message: string
	expected: string
	provided: string
}

export class ValidationFailed extends Exception {
	constructor(public errors: ValidationError[]) {
		super({
			statusCode: 400,
			message: errors.join(", "),
		})
	}
}
