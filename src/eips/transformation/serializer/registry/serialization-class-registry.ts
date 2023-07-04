import {Constructor} from "type-fest"
import {Message, MessageUtilities} from "../../../messages/message"

type MessageConstructor = Constructor<Message<any>>

export const ClassSerializationRegistry = new Map<
	string | symbol,
	MessageConstructor
>()

export function SerializableMessage() {
	return function (constructor: MessageConstructor) {
		const name = MessageUtilities.createMessageName(constructor.name)
		if (!ClassSerializationRegistry.has(name)) {
			ClassSerializationRegistry.set(name, constructor)
			console.log(`Registered message "${name}"`)
		}
	}
}
