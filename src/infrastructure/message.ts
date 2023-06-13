import { UniqueIdentifier } from "src/identifiers/unique-identifier"
import { kebabSpace } from "src/utilities/kebab-space"

export enum MessageType {
  EVENT = 'EVENT',
  COMMAND = 'COMMAND',
  DOCUMENT = 'DOCUMENT',
  REQUEST = 'REQUEST',
  REPLY = 'REPLY',
}

/**
 * The Message interface defines a common structure for messages that are exchanged between different services in a
 * message-based architecture.
 */
interface MessageProperties {
  readonly _id: string
  /** ﻿`causationId` is an identifier used in event-driven architectures to track the causal relationship between events. It represents the ID of the event that caused the current event to occur. This can be useful for tracing and debugging issues in distributed systems, as it allows developers to see the sequence of events that led to a particular state or behavior. */
  readonly _causationId?: UniqueIdentifier | undefined
  /** A correlation ID is a unique identifier used to correlate and track a specific transaction or event as it moves through a distributed system or across different components. It helps to trace the flow of a request and its associated responses across different services and systems. Correlation IDs can be generated and propagated automatically by software components or added manually by developers for debugging and troubleshooting purposes. */
  readonly _correlationId?: UniqueIdentifier | undefined
  readonly _timestamp: Date
  readonly _type: MessageType
  readonly _headers?: Record<string, string> | undefined
  readonly _metadata?: Record<string, any> | undefined
}


export type MessagePayload<T> = Omit<MessageProperties, /** Maybe for reconstruction purposes we may need that, actually will keep this omited. */ '_id' | /** Changing a type of message is not a action that we would like to take in constructor I think. */ '_type' | '_timestamp'> & T


export abstract class Message<T = unknown>
  implements MessageProperties {
  // TODO: How to generate ids and which ID format would be most optimal? Do this should be setup in this abstract on maybe somewhere else like on message construction?
  public readonly _id: string = "nanoid()"
  public readonly _causationId?: UniqueIdentifier | undefined
  public readonly _correlationId?: UniqueIdentifier | undefined
  public readonly _type: MessageType = MessageType.DOCUMENT
  public readonly _timestamp: Date = new Date()
  public readonly _headers?: Record<string, string> | undefined
  public readonly _metadata?: Record<string, any> | undefined

  constructor(message?: MessagePayload<T>) {
    Object.assign(this, message)
    this._causationId = message?._causationId
    this._correlationId = message?._correlationId
    this._headers = message?._headers
    this._metadata = message?._metadata
  }

  static get _name(): string {
    return kebabSpace(this.constructor.name)
  }
}
