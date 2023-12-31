import {Priority} from "src/eips/messages/properties/priority"
import {MessageScheduling} from "src/scheduling/message-scheduling"
import {Store} from "../persistance/store"

export interface QueuePosition<T> {
	id: string
	timestamp: Date
	priority?: Priority
	estimatedProcessingTime?: number
	message: T
}

type PositionMetadata = Partial<
	Omit<QueuePosition<unknown>, "id" | "timestamp" | "message">
>

export abstract class Queue<T = unknown> {
	protected readonly capacity: number
	protected readonly store: Store<QueuePosition<T>>
	protected readonly scheduling: MessageScheduling

	constructor(configuration: {
		capacity?: number
		store: Store<QueuePosition<T>>
		scheduling: MessageScheduling
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
