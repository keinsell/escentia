import {Message, MessagePayload, MessageType} from "./message"

export abstract class Command<T = unknown> extends Message<T> {
	constructor(properties: MessagePayload<T>) {
		super(properties, MessageType.COMMAND)
	}
}
