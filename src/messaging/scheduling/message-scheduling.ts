import {EnquedObject} from "src/messaging/channels/point-to-point/point-to-point-channel";
import {SchedulingAlgorithm} from "src/messaging/scheduling/scheduling-algorithm";

export abstract class MessageScheduling {
	abstract readonly type: SchedulingAlgorithm

	abstract schedule(messages: EnquedObject[]): EnquedObject[]
}
