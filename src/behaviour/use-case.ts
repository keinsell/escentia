import { Exception } from "src/exceptions/exception"
import { NotImplemented } from "src/exceptions/not-implemented"
import { Result } from "src/utilities/result"
import { EmptyObject } from "type-fest"

/** Example usage of usecase would be `UserRegistration.execute(...)` */
export abstract class UseCase<
	INPUT,
	OUTPUT = EmptyObject,
	EXCEPTIONS extends Exception = NotImplemented
> {
	public async $preExecute(input: INPUT): Promise<void> {
		console.log(
			`Usecase "${this.constructor.name}" started with: ${JSON.stringify(
				input
			)}`
		)
	}

	abstract execute(
		payload: INPUT,
		actor?: any
	): Promise<Result<OUTPUT, EXCEPTIONS>>

	public async $postExecute(result: Result<OUTPUT, EXCEPTIONS>): Promise<void> {
		console.log(
			`Usecase "${this.constructor.name}" was completed with: ${JSON.stringify(
				result.unwrap()
			)}`
		)

		result.isOk()
			? await this.$onSuccess(result.unwrap())
			: await this.$onFailure(result.unwrapErr())
	}

	public async $onFailure<EXCEPTIONS extends Exception>(exception: EXCEPTIONS) {
		console.error(
			`Usecase "${this.constructor.name}" was failed with: ${JSON.stringify(
				exception
			)}`
		)
	}

	public async $onSuccess(output: OUTPUT) {
		console.log(
			`Usecase "${this.constructor.name}" was succeed with: ${JSON.stringify(
				output
			)}`
		)
	}
}
