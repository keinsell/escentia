import {MessageScheduling} from "src/messaging/scheduling/message-scheduling";
import {SchedulingAlgorithm} from "src/messaging/scheduling/scheduling-algorithm";
import {Message} from "../../messages/message";

export class FirstInFirstOut extends MessageScheduling {
	public readonly type: SchedulingAlgorithm = SchedulingAlgorithm.FIFO

	public schedule(messages: Message[]): Message[] {
		messages.sort((a, b) => a._timestamp.getTime() - b._timestamp.getTime())

		return messages
	}
}
