import {Message, MessagePayload, MessageType} from "src/eips/messages/message"
import {EmptyObject, Jsonifiable} from "type-fest";

export type EventPayload<T extends Jsonifiable = EmptyObject> = MessagePayload<T>

export abstract class Event<T extends Jsonifiable = EmptyObject> extends Message<T> {
	protected constructor(properties: EventPayload<T>) {
		super(properties, MessageType.EVENT)
	}
}
