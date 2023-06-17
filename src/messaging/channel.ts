import { kebabSpace } from "src/utilities/kebab-space"
import { Subscriber } from "./subscriber"
import { Broker } from "../infrastructure/broker"

// TODO: Channels are a generic term that refers to the communication pathways through which messages flow between publishers and subscribers in a message broker system. It represents the logical communication paths or destinations for messages. Channels can encompass various types, such as topics, queues, or exchanges, depending on the messaging system or broker being used.

// TODO: Topics are channels used in publish-subscribe messaging patterns. Publishers send messages to a topic, and any interested subscribers that have subscribed to that topic receive the messages. Topics allow for one-to-many communication, where multiple subscribers can receive the same message. Subscribers can choose which topics they want to receive messages from.

// TODO: Queues are channels used in point-to-point messaging patterns. Publishers send messages to a specific queue, and only one subscriber, typically referred to as a consumer, receives and processes each message. Messages are stored in the queue until they are consumed, ensuring that each message is processed by a single consumer.

// TODO: Exchanges are channels used in the context of message routing and distribution. Publishers send messages to an exchange, which acts as a central point responsible for routing messages to one or more queues based on predefined rules or routing keys. Exchanges allow for flexible and dynamic message routing patterns.

export interface ChannelConfiguration {
	serialization?: {
		serializer: any
		deserializer: any
	}
}

/** Channels, also known as topics, queues, or exchanges */
export abstract class Channel {
	public readonly _name: string = kebabSpace(this.constructor.name)
	public readonly _type: ChannelType = ChannelType.DATATYPE

	constructor(
		private readonly broker: Broker<any>,
		private readonly configuration?: ChannelConfiguration
	) {}

	async publish(message: unknown): Promise<void> {
		this.broker.publish(this._name, this.serialize(message))
	}

	async subscribe(subscriber: Subscriber): Promise<void> {
		this.broker.subscribe(this._name, subscriber)
	}

	async unsubscribe(subscriber: Subscriber): Promise<void> {
		this.broker.unsubscribe(this._name, subscriber)
	}

	private serialize(message: unknown) {
		let formattedMessage: unknown = message

		if (this.configuration?.serialization) {
			formattedMessage = this.configuration.serialization.serializer(message)
		}

		return formattedMessage
	}
}

export enum ChannelType {
	POINT_TO_POINT = "POINT_TO_POINT",
	PUBLISH_SUBSCRIBE = "PUBLISH_SUBSCRIBE",
	REQUEST_RESPONSE = "REQUEST_RESPONSE",
	STREAM = "STREAM",
	DEAD_LETTER = "DEAD_LETTER",
	DATATYPE = "DATATYPE",
}
