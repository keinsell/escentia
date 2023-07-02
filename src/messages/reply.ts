import {Message, MessagePayload, MessageType} from "src/messages/message"
import {EmptyObject, Jsonifiable} from "type-fest";

export type ReplyPayload<T  extends Jsonifiable = EmptyObject> = MessagePayload<T>

export class Reply<T extends Jsonifiable = EmptyObject> extends Message<T> {
	protected constructor(reply: ReplyPayload<T>) {
		super(reply, MessageType.REPLY)
	}
}
