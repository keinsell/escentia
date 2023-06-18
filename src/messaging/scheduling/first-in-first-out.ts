import {EnquedObject} from "src/messaging/channels/point-to-point/point-to-point-channel";
import {MessageScheduling} from "src/messaging/scheduling/message-scheduling";
import {SchedulingAlgorithm} from "src/messaging/scheduling/scheduling-algorithm";

export class FirstInFirstOut extends MessageScheduling {
	public readonly type: SchedulingAlgorithm = SchedulingAlgorithm.FIFO

	public schedule(messages: EnquedObject[]): EnquedObject[] {
		messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

		return messages
	}
}
