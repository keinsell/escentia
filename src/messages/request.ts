import { Message, MessagePayload, MessageType } from "src/messages/message"

export type RequestPayload<T = unknown> = MessagePayload<T>

export class Request<T = unknown> extends Message<T> {
	protected constructor(request: RequestPayload<T>) {
		super(request, MessageType.REQUEST)
	}
}
