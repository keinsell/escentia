import { Handler } from "./handler"
import { MessageDeserializer } from "./serializer/message-deserializer"

export class Subscriber {
	constructor(
		public handler: Handler,
		public deserializer?: MessageDeserializer
	) {}

	public async handle(input: unknown): Promise<void> {
		if (this.deserializer) {
			input = this.deserializer.deserialize(input)
		}

		await this.handler.handle(input)
	}
}
