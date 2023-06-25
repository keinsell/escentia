import { Message, MessagePayload, MessageType } from "src/messages/message"

export abstract class Event<T = unknown> extends Message<T> {
	constructor(properties: MessagePayload<T>) {
		super(properties, MessageType.EVENT)
	}
}
