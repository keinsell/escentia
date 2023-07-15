import { Command } from "src/eips/messages"
import { Handler } from "src/infrastructure/handler"
import { UserRepository } from "../user-repository"
import { User } from "../user"
import { sequentialId } from "src/identifiers"
import { NotImplemented } from "src/exceptions/not-implemented"
import typia from "typia"

export class CreateUser extends Command<{ /** @type email */ email: string }> {}
export const __createUserChecker = typia.createIs<CreateUser>()

export class CreateUserHandler extends Handler<CreateUser, { id: number }> {
	public async handle(message: CreateUser): Promise<{ id: number }> {
		const user = new User({ email: message.body.email, id: sequentialId() })
		const savedResult = await new UserRepository().save(user)

		if (savedResult.isOk()) {
			return { id: savedResult.unwrap().id }
		} else {
			throw new NotImplemented(
				"Unknown error while saving user, even developers don't know what happened - it should like never happen."
			)
		}
	}
}
