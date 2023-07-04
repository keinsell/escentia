import {Channel, ChannelConfiguration} from "src/eips/channels/channel";
import {ChannelType} from "src/eips/channels/channel-type";
import {Message} from "src/eips/messages/message";
import {Broker} from "src/eips/routing/broker/broker";

// TODO: Think how to implement queueing when working with local broker make it compatible with remote broker like RabbitMQ

export type PointToPointChannelConfiguration = ChannelConfiguration

/** Queue is Point-to-Point messaging channel. */
export abstract class PointToPointChannel<M extends Message<any>> extends Channel<M> {
  public override _type: ChannelType = ChannelType.POINT_TO_POINT

  protected constructor(
    broker: Broker<PointToPointChannel<M>>,
    configuration?: PointToPointChannelConfiguration
  ) {
    super(ChannelType.POINT_TO_POINT, broker, { ...configuration, maxListeners: 1 })
  }
}

export class InMemoryPointToPointChannel<M extends Message<any>> extends PointToPointChannel<M> {
  constructor(
    broker: Broker<any>,
    configuration?: ChannelConfiguration
  ) {
    super(broker, configuration)
    this.queue = configuration?.queueing
  }
}
