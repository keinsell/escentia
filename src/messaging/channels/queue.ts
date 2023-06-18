import {Message} from "src/messages/message";
import {MessageScheduling} from "src/messaging/scheduling/message-scheduling";
import {Channel} from "../channel";
import {ChannelType} from "./channel-type";

// TODO: Think how to implement queueing when working with local broker make it compatible with remote broker like RabbitMQ

/** Queue is Point-to-Point messaging channel. */
export abstract class Queue<M extends Message> extends Channel<M> {
	public override _type: ChannelType = ChannelType.POINT_TO_POINT

	override async publish<T extends M>(message: T): Promise<void> {
		console.log("Queued Message", message._id)

		this.queue.push(message)

		if (this.configuration?.scheduling instanceof MessageScheduling) {
			this.queue = this.configuration.scheduling.schedule(this.queue)
		}

		const nextMessage = this.queue.shift()

		if (nextMessage) {
			console.log("Published Message", nextMessage._id)
			this.broker.publish(this._name, this.serialize(nextMessage))
		}
	}

	private queue: Message[] = []
}
