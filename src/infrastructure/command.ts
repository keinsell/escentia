import { Message, MessageType } from "./message";

export class Command<T = unknown> extends Message<T> {
  public override _type: MessageType = MessageType.COMMAND
}
