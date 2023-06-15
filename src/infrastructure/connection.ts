export abstract class Connection<INSTANCE = unknown> {
	private  readonly _connectionInstance: INSTANCE;

	constructor(
	instance: INSTANCE
	) {
		this._connectionInstance = instance;
	}

	abstract close(): Promise<void>;
	abstract connect(): Promise<void>;

	get instance(): INSTANCE {
		return this._connectionInstance;
	}
}
