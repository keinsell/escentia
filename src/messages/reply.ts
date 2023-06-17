import { Message, MessageType } from "src/messages/message"

export class Reply<T = unknown> extends Message<T> {
	public override _type: MessageType = MessageType.REPLY
}
