import { User } from "./user"
import { Option, Some } from "src/utilities/option"
import { SequentialId } from "src/identifiers"
import { Ok, Repository } from "src"

const USERS: User[] = []

export class UserRepository extends Repository<User> {
	all(): Promise<Some<User[]>> {
		return Promise.resolve(Some(USERS))
	}

	findById(id: SequentialId): Promise<Option<User>> {
		return Promise.resolve(Option.from(USERS.find((user) => user.id === id)))
	}

	async save(model: User) {
		// Find and update or create
		const index = USERS.findIndex((o) => o.id === model.id)

		if (index === -1) {
			USERS.push(model)
		} else {
			USERS[index] = model
		}

		return Ok(model)
	}
}
