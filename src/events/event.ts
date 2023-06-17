import { Message, MessageType } from "../messaging/message"

export abstract class Event<T = unknown> extends Message<T> {
	public override _type: MessageType = MessageType.EVENT
}
