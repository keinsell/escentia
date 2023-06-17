import { Message, MessageType } from "../messaging/message"

export abstract class Command<T = unknown> extends Message<T> {
	public override _type: MessageType = MessageType.COMMAND
}
