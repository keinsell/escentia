import {Message} from "src/messages/message";
import {SchedulingAlgorithm} from "src/messaging/scheduling/scheduling-algorithm";

export abstract class MessageScheduling {
	abstract readonly type: SchedulingAlgorithm

	abstract schedule(messages: Message[]): Message[]
}
