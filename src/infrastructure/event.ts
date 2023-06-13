import { Message, MessageType } from "./message";

export class Event<T = unknown> extends Message<T> {
  public override _type: MessageType = MessageType.EVENT
}
