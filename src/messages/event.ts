import {Message, MessagePayload, MessageType} from "src/messages/message"

export type EventPayload<T = unknown> = MessagePayload<T>

export abstract class Event<T = unknown> extends Message<T> {
	protected constructor(properties: EventPayload<T>) {
		super(properties, MessageType.EVENT)
	}
}
