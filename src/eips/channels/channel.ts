import {EventEmitter} from "node:events"
import {Queue} from "src/scheduling/queue"
import {SchedulingAlgorithm} from "src/scheduling/scheduling-algorithm"
import {kebabSpace} from "src/utilities/kebab-space"
import {Subscriber} from "../../infrastructure/subscriber"
import {Message} from "../messages/message"
import {Broker} from "../routing/broker/broker"
import {Deserializer} from "../transformation/serializer/deserializer"
import {Serializer} from "../transformation/serializer/serializer"
import {ChannelType} from "./channel-type"

// TODO: Channels are a generic term that refers to the communication pathways through which messages flow between publishers and subscribers in a message broker system. It represents the logical communication paths or destinations for messages. Channels can encompass various types, such as topics, queues, or exchanges, depending on the messaging system or broker being used.

// TODO: Topics are channels used in publish-subscribe messaging patterns. Publishers send messages to a topic, and any interested subscribers that have subscribed to that topic receive the messages. Topics allow for one-to-many communication, where multiple subscribers can receive the same message. Subscribers can choose which topics they want to receive messages from.

// TODO: Queues are channels used in point-to-point messaging patterns. Publishers send messages to a specific queue, and only one subscriber, typically referred to as a consumer, receives and processes each message. Messages are stored in the queue until they are consumed, ensuring that each message is processed by a single consumer.

// TODO: Exchanges are channels used in the context of message routing and distribution. Publishers send messages to an exchange, which acts as a central point responsible for routing messages to one or more queues based on predefined rules or routing keys. Exchanges allow for flexible and dynamic message routing patterns.

export interface ChannelConfiguration {
  /** Some brokers may provide serialization functionality, however there is a option to inject custom made serializers and deserializers. */
  serialization?: {
    serializer: Serializer
    deserializer: Deserializer
  }
  scheduling?: SchedulingAlgorithm
  /** When channel do not support Queueing there is possibility to inject custom-made queue that will schedule messages. */
  queueing?: Queue
  maxListeners?: number
}

/** Channels, also known as topics, queues, or exchanges */
export abstract class Channel<M extends Message> extends EventEmitter {
  public readonly _name: string = kebabSpace(this.constructor.name)
  public readonly _type: ChannelType = ChannelType.DATATYPE
  protected subscribers: Subscriber[] = []
  protected readonly broker: Broker<this>

  constructor(
    type: ChannelType,
    broker: Broker<Channel<M>>,
    protected readonly configuration?: ChannelConfiguration
  ) {
    super()
    this.broker = broker
    this._type = type
  }

  async publish<T extends M>(message: T): Promise<void> {
    this.broker.publish(this, this.serialize(message))
  }

  async subscribe(subscriber: Subscriber): Promise<void> {
    // Do not allow exceeding limit of maximum listeners
    if (this.configuration?.maxListeners) {
      if (this.subscribers.length >= this.configuration?.maxListeners) {
        throw new Error(`Max listeners reached for channel ${this._name}`)
      }
    }
    this.subscribers.push(subscriber)
    this.broker.subscribe(this, subscriber)
  }

  async unsubscribe(subscriber: Subscriber): Promise<void> {
    this.subscribers = this.subscribers.filter(
      (existingSubscriber) => existingSubscriber !== subscriber
    )

    this.broker.unsubscribe(this, subscriber)
  }

  protected serialize(message: Message) {
    let formattedMessage: unknown = message

    if (this.configuration?.serialization) {
      formattedMessage =
        this.configuration.serialization.serializer.serialize(message)
    }

    return formattedMessage
  }
}
