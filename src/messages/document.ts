import { Message, MessagePayload, MessageType } from "src/messages/message"

export type DocumentPayload<T = unknown> = MessagePayload<T>

export abstract class Document<T = unknown> extends Message<T> {
	protected constructor(properties: DocumentPayload<T>) {
		super(properties, MessageType.DOCUMENT)
	}
}
