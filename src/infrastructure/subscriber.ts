import {Deserializer} from "../eips/transformation/serializer/deserializer"
import {Handler} from "./handler"

/** https://www.enterpriseintegrationpatterns.com/patterns/messaging/EventDrivenConsumer.html */
export class Subscriber {
	constructor(
		public handler: Handler,
		public deserializer?: Deserializer
	) {}

	public async handle(input: unknown): Promise<void> {

		if (this.deserializer) {
			input = this.deserializer.deserialize(input)
		}
		await this.handler.$preHandle()
		try {
			await this.handler.handle(input)
			await this.handler.$postHandle()
		} catch (e) {
			await this.handler.$onError(e)
		}
	}
}
