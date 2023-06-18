// TODO: Do query should be a message?

export abstract class Query<RESPONSE> {
	public readonly _response: RESPONSE = undefined as unknown as RESPONSE
}
