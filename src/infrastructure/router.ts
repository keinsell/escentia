import {Channel} from "src/infrastructure/channel"
import {Message} from "src/messages/message"

export abstract class Router {
	abstract register(
		message: Message,
		channel: Channel<Message>
	): Promise<void> | void

	abstract route(
		message: Message
	): Channel<Message>[] | Promise<Channel<Message>[]>
}

export class InMemoryMessageRouter extends Router {
	private RouteRegistry: {
		message: Message
		channel: Channel<Message>
	}[] = []

	public register(
		message: Message,
		channel: Channel<Message>
	): Promise<void> | void {
		this.RouteRegistry.push({ message, channel })
	}

	public route(
		message: Message
	): Channel<Message>[] | Promise<Channel<Message>[]> {
		const matchedRoutes = this.RouteRegistry.filter((route) => {
			// Implement your custom logic here to match the message with registered routes
			// For example, you can compare the message type or content with the registered routes
			// and return the appropriate channel.
			return route.message.name === message.name
		})

		if (matchedRoutes.length > 0) {
			// Return the first matching channels
			return matchedRoutes.map((route) => route.channel)
		} else {
			// Return a default channel or handle the case when no route is found
			// You can throw an error or return a default channel if required.
			throw new Error("No matching route found for the message.")
		}
	}
}
