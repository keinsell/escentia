export abstract class Connection<INSTANCE = unknown> {
	private readonly _connectionInstance: INSTANCE

	protected constructor(instance: INSTANCE) {
		this._connectionInstance = instance
	}

	get instance(): INSTANCE {
		return this._connectionInstance
	}

	abstract close(): Promise<void>

	abstract connect(): Promise<void>
}
