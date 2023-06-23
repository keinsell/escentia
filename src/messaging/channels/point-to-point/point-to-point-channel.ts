import {randomUUID} from 'node:crypto'
import {Broker} from "src/infrastructure/broker";
import {Message} from "src/messages/message";
import {Channel, ChannelConfiguration} from "src/messaging/channel";
import {ChannelType} from "src/messaging/channels/channel-type";
import {FirstInFirstOut} from "src/messaging/scheduling/first-in-first-out";
import {Subscriber} from "src/messaging/subscriber";

// TODO: Think how to implement queueing when working with local broker make it compatible with remote broker like RabbitMQ

export enum Priority {
	NONE = "NONE",
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	HIGH = "HIGH"
}

export class EnquedObject<T = unknown> {
	constructor(
		public id: string,
		public message: T,
		public priority?: Priority,
		public timestamp: Date = new Date(),
	) {
	}
}

/** Queue is Point-to-Point messaging channel. */
export abstract class PointToPointChannel<M extends Message> extends Channel<M> {
	public override _type: ChannelType = ChannelType.POINT_TO_POINT

	constructor(
		broker: Broker<any>,
		configuration?: ChannelConfiguration
	) {
		super(broker, configuration)
	}

	override async subscribe(subscriber: Subscriber): Promise<void> {
		if (this.subscribers.length > 0) {
			throw new Error("Queue channels allow only one subscriber at same time.")
		}
		this.subscribers.push(subscriber)
		this.broker.subscribe(this._name, subscriber)
	}

	abstract enqueue<T extends M>(message: T, priority?: Priority): void | Promise<void>

	abstract dequeue(): M[] | Promise<M[]>
}

export class InMemoryQueue<M extends Message> extends PointToPointChannel<M> {
	private queue: EnquedObject<M>[] = []

	constructor(
		broker: Broker<any>,
		configuration?: ChannelConfiguration
	) {
		super(broker, configuration)

		this.on(`${this.constructor.name}-enqueued`, async (m: EnquedObject<M>) => {
			console.log(`Queued ${m.message._name}`, m.id)
			this.queue = new FirstInFirstOut().schedule(this.queue)
			const batch = this.dequeue()

			for (const event of batch) {
				await this.publish(event)
			}
		})
	}

	public enqueue<T extends M>(message: T, priority: Priority = Priority.NONE): void | Promise<void> {
		const queueMessage = new EnquedObject(randomUUID(), message, priority)
		this.queue.push(queueMessage)
		this.emit(`${this.constructor.name}-enqueued`, queueMessage)
	}

	public dequeue(): M[] {
		const batch: M[] = []

		while (this.queue.length > 0) {
			const message = this.queue.shift()
			if (message) {
				batch.push(message.message)
			}
		}

		return batch
	}
}
