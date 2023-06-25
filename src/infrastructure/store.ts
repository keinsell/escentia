export abstract class Store<T = unknown> {
	abstract set<X extends T>(key: string, value: X): Promise<void>
	abstract get<X extends T>(key: string): Promise<X | undefined>
	abstract delete(key: string): Promise<void>
	abstract clear(): Promise<void>
	abstract keys(): Promise<string[]>
	abstract values(): Promise<T[]>
}
