import {MessageScheduling} from "src/scheduling/message-scheduling";
import {SchedulingAlgorithm} from "src/scheduling/scheduling-algorithm";
import {QueuePosition} from "./queue";

export class FirstInFirstOut extends MessageScheduling {
  public readonly type: SchedulingAlgorithm = SchedulingAlgorithm.FIFO

  public schedule<T>(messages: QueuePosition<T>[]): QueuePosition<T>[] {
    messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    return messages
  }
}
