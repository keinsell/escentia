import {Message, MessagePayload, MessageType} from "src/eips/messages/message"
import {EmptyObject, Jsonifiable} from "type-fest";

export type RequestPayload<T extends Jsonifiable = EmptyObject> = MessagePayload<T>

export class Request<T extends Jsonifiable = EmptyObject> extends Message<T> {
	protected constructor(request: RequestPayload<T>) {
		super(request, MessageType.REQUEST)
	}
}
