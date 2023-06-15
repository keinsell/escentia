export type QueryModelProperties<T> = T;

export abstract class QueryModel<T> {
	// TODO: Add switchable naming convention for model names?
	public readonly _model: string = this.constructor.name.endsWith('Model')
		? this.constructor.name.slice(0, -5).toLowerCase()
		: this.constructor.name.toLowerCase()

	public constructor(payload: QueryModelProperties<T>) {
		Object.assign(this, payload);
	}
}
