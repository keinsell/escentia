import { UseCase } from "src/behaviour/use-case"
import { NotImplemented } from "src/exceptions/not-implemented"
import { Ok, Result } from "src/utilities/result"
import { CreateUser, CreateUserHandler } from "../../commands/create-user"

export class UserRegistration extends UseCase<
	{ email: string },
	{ id: number }
> {
	async execute(payload: { email: string }): Promise<
		Result<{ id: number }, NotImplemented>
	> {
		const command = new CreateUser({ body: { email: payload.email } })
		const userId = await new CreateUserHandler().handle(command)
		return Ok({ id: userId.id })
	}
}
