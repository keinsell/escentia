import {SchedulingAlgorithm} from "src/scheduling/scheduling-algorithm";
import {QueuePosition} from "./queue";

export abstract class MessageScheduling {
  abstract readonly type: SchedulingAlgorithm

  abstract schedule<T>(messages: QueuePosition<T>[]): QueuePosition<T>[]
}
