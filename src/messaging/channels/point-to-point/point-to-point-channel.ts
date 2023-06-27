import {Broker} from "src/infrastructure/broker";
import {Message} from "src/messages/message";
import {Channel, ChannelConfiguration} from "src/messaging/channel";
import {ChannelType} from "src/messaging/channels/channel-type";
import {Queue} from "../../../scheduling/queue";

// TODO: Think how to implement queueing when working with local broker make it compatible with remote broker like RabbitMQ

export type PointToPointChannelConfiguration = ChannelConfiguration

/** Queue is Point-to-Point messaging channel. */
export abstract class PointToPointChannel<M extends Message> extends Channel<M> {
  public override _type: ChannelType = ChannelType.POINT_TO_POINT

  protected constructor(
    broker: Broker<PointToPointChannel<M>>,
    configuration?: PointToPointChannelConfiguration
  ) {
    super(broker, { ...configuration, maxListeners: 1 })
  }

  abstract enqueue<T extends M>(message: T): void | Promise<void>

  abstract dequeue(): M[] | Promise<M[]>
}

export class InMemoryPointToPointChannel<M extends Message> extends PointToPointChannel<M> {
  private queue?: Queue<unknown> | undefined

  constructor(
    broker: Broker<any>,
    configuration?: ChannelConfiguration
  ) {
    super(broker, configuration)
    this.queue = configuration?.queueing
  }

  public async enqueue<T extends M>(message: T):  Promise<void> {
    if (!this.queue) {
      throw new Error('Queue is not initialized')
    }
    await this.queue.enqueue(message, { priority: message.priority })
  }

  public async dequeue(): Promise<M[]> {
    if (!this.queue) {
      throw new Error('Queue is not initialized')
    }
    return this.queue.dequeue<M>(10)
  }
}
