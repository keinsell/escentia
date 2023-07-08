export abstract class Handler<INPUT = unknown, OUTPUT = void> {
  async $preHandle(): Promise<void> {
    console.log("PreHandle");
  }

  async $postHandle(): Promise<void> {
    console.log("PostHandle");
  }

  async $onError(e: unknown): Promise<void> {
    console.log("OnError", e);
  }

  public abstract handle(input: INPUT): OUTPUT | Promise<OUTPUT>
}
