import {Store} from "../infrastructure/store";
import {MessageScheduling} from "src/scheduling/message-scheduling";
import {Priority} from "src/messages/priority";

export interface QueuePosition<T> {
  id: string
  timestamp: Date
  priority?: Priority
  estimatedProcessingTime?: number
  message: T
}

type PositionMetadata = Partial<Omit<QueuePosition<unknown>, "id" | "timestamp" | "message">>

export abstract class Queue<T = unknown> {
  protected readonly capacity: number
  protected readonly store: Store<QueuePosition<T>>
  protected readonly scheduling: MessageScheduling

  constructor(configuration: {
    capacity?: number,
    store: Store<QueuePosition<T>>,
    scheduling: MessageScheduling,
  }) {
    this.capacity = configuration.capacity || 0
    this.store = configuration.store
    this.scheduling = configuration.scheduling
  }

  abstract enqueue<T>(message: T, details?: PositionMetadata): Promise<void>

  abstract dequeue<T>(batchSize?: number): Promise<T[]>

  abstract peek<T>(): Promise<QueuePosition<T> | undefined>

  abstract isEmpty(): Promise<boolean>

  abstract clear(): Promise<void>

  abstract size(): Promise<number>
}

// export class InMemoryPointToPointChannel<T = unknown> extends Queue<T> {
//   constructor() {  }

//   public async enqueue(object: T, details?: Partial<Omit<QueuePosition<T>, "id" | "timestamp" | "message">>) {
//     const queueItem: QueuePosition<T> = this.createQueueItem(object, details)
//     this.store.set(queueItem.id, queueItem)
//   }

//   private createQueueItem<T>(object: T, details: Partial<Omit<QueuePosition<T>, "id" | "timestamp" | "message">> | undefined): QueuePosition<T> {
//     return {
//       id: randomUUID(),
//       timestamp: new Date(),
//       message: object,
//       ...details
//     } as QueuePosition<T>
//   }
// }
