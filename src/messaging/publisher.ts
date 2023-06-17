import { Message } from "src/messages/message"

export abstract class Publisher {
	abstract publish<T extends Message>(message: T): Promise<void>
}
