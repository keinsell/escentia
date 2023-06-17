import { Message, MessageType } from "src/messages/message"

export class Request<T = unknown> extends Message<T> {
	public override _type: MessageType = MessageType.REQUEST
}
