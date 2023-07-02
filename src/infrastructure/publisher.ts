import {Message} from "src/messages/message"
import {Store} from "../persistance/store"
import {Router} from "./router"

export abstract class Publisher {
	protected constructor(
		private router: Router,
		private outbox: any,
		private store: Store<Message>
	) {}

	public async publish<T extends Message>(
		message: T,
		options: { withOutbox: boolean }
	): Promise<void> {
		const channels = await this.router.route(message)

		if (channels.length === 0) {
			throw new Error("No channels found for the message.")
		}

		for (const channel of channels) {
			if (options.withOutbox) await this.outbox.add(message)

			try {
				await channel.publish(message)
				if (options.withOutbox) await this.outbox.delete(message)
				await this.store.set(`message-${message.id}`, message)
			} catch (e) {}
		}
	}

	public async send<T extends Message>(
		message: T,
		options: { withOutbox: boolean }
	): Promise<void> {
		const channels = await this.router.route(message)

		for (const channel of channels) {
			if (options.withOutbox) await this.outbox.add(message)

			try {
				await channel.publish(message)
				if (options.withOutbox) await this.outbox.delete(message)
				await this.store.set(`message-${message.id}`, message)
			} catch (e) {}
		}
	}
}
