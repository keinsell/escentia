import { EventEmitter } from "node:events"
import { Message } from "../messages/message"
import { Channel } from "../messaging/channel"
import { Connection } from "../messaging/connection"
import { Subscriber } from "../messaging/subscriber"

export interface BrokerOptions {
	builtInScheduling?: boolean
	builtInRetryPolicy?: boolean
	builtInDeadLettering?: boolean
	builtInMessageRegistry?: boolean
	builtInMessageValidation?: boolean
}

export abstract class Broker<
	Channels extends Channel<Message>,
> extends EventEmitter {
	public instance: unknown | undefined
	private configuraiton: BrokerOptions

	constructor(
		connection?: Connection,
		options: BrokerOptions = {
			builtInScheduling: false,
			builtInRetryPolicy: false,
			builtInDeadLettering: false,
			builtInMessageRegistry: false,
			builtInMessageValidation: false,
		}
	) {
		super()
		this.instance = connection?.instance
		this.configuraiton = options
	}

	abstract publish<C extends Channels>(
		channel: C,
		message: unknown,
		config?: { metadata: Message["metadata"]; headers: Message["headers"] }
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
