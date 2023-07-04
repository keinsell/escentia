import {EventEmitter} from "node:events"
import {Subscriber} from "../../../infrastructure/subscriber"
import {Channel} from "../../channels/channel"
import {Message} from "../../messages/message"

export abstract class Broker<
  Channels extends Channel<Message>,
> extends EventEmitter {
  public instance: unknown | undefined

  abstract publish<C extends Channels>(
    channel: C,
    message: unknown,
    config?: { metadata: Message<any>["metadata"]; headers: Message<any>["headers"] }
  ): Promise<void> | void

  abstract acknowledge(message: unknown): Promise<void> | void

  abstract subscribe<C extends Channels>(
    channel: C,
    subscriber: Subscriber
  ): Promise<void> | void

  abstract unsubscribe<C extends Channels>(
    channel: C,
    subscriber: Subscriber
  ): Promise<void> | void

  abstract connect?(): Promise<void>
  abstract disconnect?(): Promise<void>
}
