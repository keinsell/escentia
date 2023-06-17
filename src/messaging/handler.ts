export abstract class Handler<INPUT = unknown, OUTPUT = void> {
	public abstract handle(input: INPUT): OUTPUT | Promise<OUTPUT>
}
