import {EventEmitter} from "node:events"
import {Message} from "../messages/message"
import {Channel} from "../messaging/channel"
import {Connection} from "../messaging/connection"
import {Subscriber} from "../messaging/subscriber"

export abstract class Broker<
	Channels extends Channel<Message>,
> extends EventEmitter {
	public instance: unknown | undefined

	constructor(connection?: Connection) {
		super()
		this.instance = connection?.instance
	}

	abstract publish<C extends Channels>(
		channel: C,
		message: unknown,
		config?: { metadata: Message["_metadata"], headers: Message["_headers"] }
	): Promise<void> | void

	abstract acknowledge(message: unknown): Promise<void> | void

	abstract subscribe<C extends Channels>(
		channel: C,
		subscriber: Subscriber
	): Promise<void> | void

	abstract unsubscribe<C extends Channels>(
		channel: C,
		subscriber: Subscriber
	): Promise<void> | void
}

export class InMemoryBroker {}
