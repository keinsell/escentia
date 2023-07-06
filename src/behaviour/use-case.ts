import { Exception } from "src/exceptions/exception";
import { NotImplemented } from "src/exceptions/not-implemented";
import { Result } from "src/utilities/result";

export abstract class UseCase<INPUT, OUTPUT, EXCEPTIONS extends Exception = NotImplemented> {
  public async $preExecute(input: INPUT): Promise<void> {
    console.log(`${this.constructor.name}:${JSON.stringify(input)}`)
  }
  abstract execute(payload: INPUT, actor?: any): Promise<Result<OUTPUT, EXCEPTIONS>>
}
