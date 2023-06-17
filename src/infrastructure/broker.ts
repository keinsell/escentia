import { Connection } from "../messaging/connection"
import { Subscriber } from "../messaging/subscriber"

export abstract class Broker<
	/** Message brokers typically handle serialized messages rather than deserialized ones. When a message is published to a message broker, it is commonly serialized into a specific format, such as JSON, XML, or binary data, before being sent to the broker. */
	SERIALIZED_MESSAGE_FORMAT = unknown,
	/** Message Broker knows about it's channels and should not be used when channel doesn't exist to avoid error. */
	CONNECTION = unknown
> {
	public instance: CONNECTION | undefined

	constructor(connection?: Connection<CONNECTION>) {
		this.instance = connection?.instance
	}

	abstract publish(
		channel: any,
		message: SERIALIZED_MESSAGE_FORMAT
	): Promise<void> | void

	abstract acknowledge(message: SERIALIZED_MESSAGE_FORMAT): Promise<void> | void

	abstract subscribe(channel: any, subscriber: Subscriber): Promise<void> | void

	abstract unsubscribe(
		channel: any,
		subscriber: Subscriber
	): Promise<void> | void
}
