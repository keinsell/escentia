import { EventEmitter } from "node:events"
import { Message } from "../messages/message"
import { Channel } from "../messaging/channel"
import { Connection } from "../messaging/connection"
import { Subscriber } from "../messaging/subscriber"

export abstract class Broker<
	Channels extends Channel<Message>,
	/** Message brokers typically handle serialized messages rather than deserialized ones. When a message is published to a message broker, it is commonly serialized into a specific format, such as JSON, XML, or binary data, before being sent to the broker. */
	SERIALIZED_MESSAGE_FORMAT = unknown,
	/** Message Broker knows about it's channels and should not be used when channel doesn't exist to avoid error. */
	CONNECTION = unknown
> extends EventEmitter {
	public instance: CONNECTION | undefined

	constructor(connection?: Connection<CONNECTION>) {
		super()
		this.instance = connection?.instance
	}

	abstract publish<C extends Channels>(
		channel: C,
		message: SERIALIZED_MESSAGE_FORMAT
	): Promise<void> | void

	abstract acknowledge(message: SERIALIZED_MESSAGE_FORMAT): Promise<void> | void

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
