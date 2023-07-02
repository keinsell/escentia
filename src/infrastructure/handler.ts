export abstract class Handler<INPUT = unknown, OUTPUT = void> {

	$preHandle() {
		console.log("PreHandle");
	}

	$postHandle() {
		console.log("PostHandle");
	}

	$onError() {
		console.log("OnError");
	}

	public abstract handle(input: INPUT): OUTPUT | Promise<OUTPUT>
}
