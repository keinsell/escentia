import { Handler } from "./handler"

export class Subscriber {
	constructor(public handler: Handler) {}

	public async handle(input: unknown): Promise<void> {
		await this.handler.handle(input)
	}
}
