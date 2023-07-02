import {Constructor} from "type-fest"
import {Message, MessageUtilities} from "../../messages/message"

type MessageConstructor<T = unknown> = Constructor<Message<T>>

export const ClassSerializationRegistry = new Map<
	string | symbol,
	MessageConstructor
>()

export function SerializableMessage() {
	return function (constructor: MessageConstructor) {
		const name = MessageUtilities.createMessageName(constructor.name)

		if (ClassSerializationRegistry.has(name)) {
			throw new Error(`${name} "${name}" is already registered.`)
		}

		ClassSerializationRegistry.set(name, constructor)

		console.log(`Registered message "${name}"`)
	}
}
