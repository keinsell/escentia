import { Priority } from "src/eips/messages/properties/priority"
import { Serializable } from "src/eips/transformation/serializer/registry/serializable-property"
import { UniqueIdentifier } from "src/identifiers/unique-identifier"
import { kebabSpace } from "src/utilities/kebab-space"
import type { EmptyObject, Jsonifiable, KebabCase } from 'type-fest'
import { ulid } from "../../identifiers"
import { ClassSerializationRegistry } from "../transformation/serializer/registry/serialization-class-registry";

export class MessageUtilities {
  static createMessageName(name: string): KebabCase<string> {
    const commonSuffix = ["Query", "Command", "Event", "Message", "Document", "Request", "Reply"]

    for (const suffix of commonSuffix) {
      if (name.endsWith(suffix)) {
        return name.slice(0, -suffix.length)
      }
    }

    return kebabSpace(name)
  }
}


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
}

/**
 * The Message interface defines a common structure for messages
 * that are exchanged between different services in a message-based
 * architecture.
 */
interface MessageProperties<T extends Jsonifiable = EmptyObject> {
  readonly id: UniqueIdentifier
  /** ﻿`causationId` is an identifier used in event-driven architectures to track
   * the causal relationship between events. It represents the ID of the event that
   * caused the current event to occur. This can be useful for tracing and debugging
   * issues in distributed systems, as it allows developers to see the sequence of
   * events that led to a particular state or behavior.
   *
   * @see [RailsEventStore](https://railseventstore.org/docs/v2/correlation_causation/)
   * @see [thenativeweb/commands-events/#1](https://github.com/thenativeweb/commands-events/issues/1#issuecomment-385862281)
   */
  readonly causationId?: UniqueIdentifier | undefined
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
  readonly correlationId?: UniqueIdentifier | undefined
  readonly timestamp: Date
  readonly type: MessageType
  readonly priority?: Priority
  readonly headers?: Record<string, unknown> | undefined
  readonly metadata?: Record<string, unknown> | undefined
  readonly body: T
}

export type MessagePayload<T extends Jsonifiable = EmptyObject> = Omit<
  MessageProperties<T>,
  /** Maybe for reconstruction purposes we may need that, actually will keep this omited. */
  | "id"
  /** Changing a type of message is not a action that we would like to take in constructor I think. */
  | "type"
  | "timestamp"
> & { body: T }

export abstract class Message<T extends Jsonifiable = EmptyObject> implements MessageProperties<T> {
  @Serializable()
  public readonly name: KebabCase<Message<any>["constructor"]["name"]> = MessageUtilities.createMessageName(
    this.constructor.name
  )
  @Serializable()
  public readonly id: UniqueIdentifier = ulid()
  @Serializable()
  public readonly causationId?: UniqueIdentifier | undefined
  @Serializable()
  public readonly correlationId?: UniqueIdentifier | undefined
  @Serializable()
  public readonly type: MessageType = MessageType.DOCUMENT
  @Serializable()
  public readonly priority: Priority = Priority.NONE
  @Serializable()
  public readonly timestamp: Date = new Date()
  @Serializable()
  public readonly headers?: Record<string, unknown> | undefined
  @Serializable()
  public readonly metadata?: Record<string, unknown> | undefined
  @Serializable()
  public readonly body: T

  protected constructor(
    message: MessagePayload<T>,
    type: MessageType = MessageType.DOCUMENT
  ) {
    this.causationId = message.causationId
    this.correlationId = message.correlationId
    this.headers = message.headers ?? {
      "content-type": "application/json",
    }
    this.type = type
    this.priority = message.priority ?? Priority.NONE
    this.metadata = message.metadata ?? {
      id: this.id as string,
      name: this.name as string,
      type: this.type as string,
      "correlation-id": this.correlationId as string,
      "causation-id": this.causationId as string,
      timestamp: this.timestamp.toISOString(),
      priority: this.priority as string,
    }
    this.body = message.body
    Object.assign(this, message)
  }

  // static {
  //   const name = MessageUtilities.createMessageName(this.constructor.name)

  //   if (!ClassSerializationRegistry.has(name)) {
  //     ClassSerializationRegistry.set(name, this.constructor as any)
  //     console.log(`Registered message "${name}"`)
  //   }
  // }
}
