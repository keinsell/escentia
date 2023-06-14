import { kebabSpace } from "src/utilities/kebab-space";
import { Message } from "./message";
import { Subscriber } from "./subscriber";
import { Topic, createTopic } from "./topic";

export abstract class Channel {
  public readonly _name: Topic = createTopic(kebabSpace(this.constructor.name))
  public readonly _type: ChannelType = ChannelType.DATATYPE

  constructor(private readonly messageBroker: any) { }

  async send(message: Message): Promise<void> {
    this.messageBroker.send(message)
  }

  async subscribe(subscriber: Subscriber): Promise<void> {
    this.messageBroker.subscribe(subscriber)
  }

  async unsubscribe(subscriber: Subscriber): Promise<void> {
    this.messageBroker.unsubscribe(subscriber)
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
