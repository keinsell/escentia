import { UniqueIdentifier } from "src/identifiers/unique-identifier"
import { Priority } from "src/messages/priority"
import { SerializableProperty } from "src/messaging/serializer/serializable-property"
import { kebabSpace } from "src/utilities/kebab-space"

export enum MessageType {
	/**
	 * @see [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/EventMessage.html)
	 */
	EVENT = "EVENT",
	/**
	 * @see [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/CommandMessage.html)
	 */
	COMMAND = "COMMAND",
	/**
	 * @see [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/DocumentMessage.html)
	 */
	DOCUMENT = "DOCUMENT",
	/**
	 * @see [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RequestReply.html)
	 */
	REQUEST = "REQUEST",
	/**
	 * @see [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/RequestReply.html)
	 */
	REPLY = "REPLY",
	QUERY = "QUERY",
}

/**
 * The Message interface defines a common structure for messages
 * that are exchanged between different services in a message-based
 * architecture.
 */
interface MessageProperties {
	readonly _id: UniqueIdentifier
	/** ﻿`causationId` is an identifier used in event-driven architectures to track
	 * the causal relationship between events. It represents the ID of the event that
	 * caused the current event to occur. This can be useful for tracing and debugging
	 * issues in distributed systems, as it allows developers to see the sequence of
	 * events that led to a particular state or behavior.
	 *
	 * @see [RailsEventStore](https://railseventstore.org/docs/v2/correlation_causation/)
	 * @see [thenativeweb/commands-events/#1](https://github.com/thenativeweb/commands-events/issues/1#issuecomment-385862281)
	 */
	readonly _causationId?: UniqueIdentifier | undefined
	/** A correlation ID is a unique identifier used to correlate and track a
	 * specific transaction or event as it moves through a distributed system or
	 * across different components. It helps to trace the flow of a request and
	 * its associated responses across different services and systems. Correlation IDs
	 * can be generated and propagated automatically by software components or added
	 * manually by developers for debugging and troubleshooting purposes.
	 *
	 * @see [RailsEventStore](https://railseventstore.org/docs/v2/correlation_causation/)
	 * @see [thenativeweb/commands-events/#1](https://github.com/thenativeweb/commands-events/issues/1#issuecomment-385862281)
	 */
	readonly _correlationId?: UniqueIdentifier | undefined
	readonly _timestamp: Date
	readonly _type: MessageType
	readonly _priority?: Priority
	readonly _headers?: Record<string, unknown> | undefined
	readonly _metadata?: Record<string, unknown> | undefined
}

export type MessagePayload<T> = Omit<
	MessageProperties,
	/** Maybe for reconstruction purposes we may need that, actually will keep this omited. */
	| "_id"
	/** Changing a type of message is not a action that we would like to take in constructor I think. */
	| "_type"
	| "_timestamp"
> &
	T

// TODO: Remove this
let lastId = 0

export abstract class Message<T = unknown> implements MessageProperties {
	// TODO: How to generate ids and which ID format would be most optimal? Do this should be setup in this abstract on maybe somewhere else like on message construction?
	@SerializableProperty()
	public readonly _name: string = kebabSpace(this.constructor.name)
	@SerializableProperty()
	public readonly _id: UniqueIdentifier = lastId++
	@SerializableProperty()
	public readonly _causationId?: UniqueIdentifier | undefined
	@SerializableProperty()
	public readonly _correlationId?: UniqueIdentifier | undefined
	@SerializableProperty()
	public readonly _type: MessageType = MessageType.DOCUMENT
	@SerializableProperty()
	public readonly _priority: Priority = Priority.NONE
	@SerializableProperty()
	public readonly _timestamp: Date = new Date()
	@SerializableProperty()
	public readonly _headers?: Record<string, unknown> | undefined
	@SerializableProperty()
	public readonly _metadata?: Record<string, unknown> | undefined

	constructor(
		message: MessagePayload<T>,
		type: MessageType = MessageType.DOCUMENT
	) {
		this._causationId = message._causationId
		this._correlationId = message._correlationId
		this._headers = message._headers ?? {
			"content-type": "application/json",
		}
		this._type = type
		this._priority = message._priority ?? Priority.NONE
		this._metadata = message._metadata ?? {
			id: this._id as string,
			name: this._name as string,
			type: this._type as string,
			"correlation-id": this._correlationId as string,
			"causation-id": this._causationId as string,
			timestamp: this._timestamp.toISOString(),
			priority: this._priority as string,
		}
		Object.assign(this, message)
	}

	/** Gets the kebab-cased name of the message class. */
	static get _name(): string {
		return kebabSpace(this.constructor.name)
	}
}
