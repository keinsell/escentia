import { Message } from "./message"

export abstract class Publisher {
	abstract publish<T extends Message>(message: T): Promise<void>
}
