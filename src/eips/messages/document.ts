import {Message, MessagePayload, MessageType} from "src/eips/messages/message"
import {EmptyObject, Jsonifiable} from "type-fest";

export type DocumentPayload<T extends Jsonifiable = EmptyObject> = MessagePayload<T>

export abstract class Document<T extends Jsonifiable = EmptyObject> extends Message<T> {
	protected constructor(properties: DocumentPayload<T>) {
		super(properties, MessageType.DOCUMENT)
	}
}
