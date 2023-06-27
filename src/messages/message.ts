import {Serializable} from "src/__metadata/serializable-property"
import {UniqueIdentifier} from "src/identifiers/unique-identifier"
import {Priority} from "src/messages/priority"
import {kebabSpace} from "src/utilities/kebab-space"
import {sequentialId} from "../identifiers";

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



export abstract class Message<T = unknown> implements MessageProperties {
	// TODO: How to generate ids and which ID format would be most optimal? Do this should be setup in this abstract on maybe somewhere else like on message construction?
	@Serializable()
	public readonly _name: string = MessageUtilities.createMessageName(this.constructor.name)
	@Serializable()
	public readonly _id: UniqueIdentifier = sequentialId()
	@Serializable()
	public readonly _causationId?: UniqueIdentifier | undefined
	@Serializable()
	public readonly _correlationId?: UniqueIdentifier | undefined
	@Serializable()
	public readonly _type: MessageType = MessageType.DOCUMENT
	@Serializable()
	public readonly _priority: Priority = Priority.NONE
	@Serializable()
	public readonly _timestamp: Date = new Date()
	@Serializable()
	public readonly _headers?: Record<string, unknown> | undefined
	@Serializable()
	public readonly _metadata?: Record<string, unknown> | undefined

	protected constructor(
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
}

export class MessageUtilities {
	static createMessageName(name: string): string {
		const commonSuffix = ["Query", "Command", "Event"]

		for (const suffix of commonSuffix) {
			if (name.endsWith(suffix)) {
				return name.slice(0, -suffix.length)
			}
		}

		return kebabSpace(name)
	}
}
