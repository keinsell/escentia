import {EmptyObject, Jsonifiable} from "type-fest";
import {Message, MessagePayload, MessageType} from "./message"

export type CommandPayload<T extends Jsonifiable = EmptyObject> = MessagePayload<T>
/**
 * A command is a message that is sent to a single recipient.
 *
 *  ![](https://www.enterpriseintegrationpatterns.com/img/CommandMessageSolution.gif)
 */
export abstract class Command<T extends Jsonifiable = EmptyObject> extends Message<T> {
	protected constructor(properties: CommandPayload<T>) {
		super(properties, MessageType.COMMAND)
	}
}
