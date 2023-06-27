import {Message, MessagePayload, MessageType} from "src/messages/message"

export type ReplyPayload<T = unknown> = MessagePayload<T>

export class Reply<T = unknown> extends Message<T> {
	protected constructor(reply: ReplyPayload<T>) {
		super(reply, MessageType.REPLY
		);
	}
}
