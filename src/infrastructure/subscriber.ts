import {Handler} from "./handler"
import {Deserializer} from "./serializer/deserializer"

export class Subscriber {
	constructor(
		public handler: Handler,
		public deserializer?: Deserializer
	) {}

	public async handle(input: unknown): Promise<void> {
		if (this.deserializer) {
			input = this.deserializer.deserialize(input)
		}

		await this.handler.handle(input)
	}
}
