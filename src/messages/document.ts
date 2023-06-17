import { Message, MessageType } from "src/messages/message"

export abstract class Document<T = unknown> extends Message<T> {
	public override _type: MessageType = MessageType.DOCUMENT
}
