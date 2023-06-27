import {Message, MessagePayload, MessageType} from "src/messages/message"

export type ReplyPayload<T = unknown> = MessagePayload<T>

export class Reply<T = unknown> extends Message<T> {
	public override _type: MessageType = MessageType.REPLY

	public constructor(reply: ReplyPayload<T>) {
		super(reply, MessageType.REPLY
		);
	}
}
