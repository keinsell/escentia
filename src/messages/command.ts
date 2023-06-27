import {Message, MessagePayload, MessageType} from "./message"

export type CommandPayload<T = unknown> = MessagePayload<T>
/**
  * A command is a message that is sent to a single recipient.
  *
 *  ![](https://www.enterpriseintegrationpatterns.com/img/CommandMessageSolution.gif)
*/
export abstract class Command<T = unknown> extends Message<T> {
  protected constructor(properties: CommandPayload<T>) {
    super(properties, MessageType.COMMAND)
  }
}
