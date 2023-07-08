import { Exception } from "src/exceptions/exception";
import { NotImplemented } from "src/exceptions/not-implemented";
import { Result } from "src/utilities/result";
import { EmptyObject } from "type-fest";

/** Example usage of usecase would be `UserRegistration.execute(...)` */
export abstract class UseCase<INPUT, OUTPUT = EmptyObject, EXCEPTIONS extends Exception = NotImplemented> {
  public async $preExecute(input: INPUT): Promise<void> {
    console.log(`${this.constructor.name}:${JSON.stringify(input)}`)
  }

  abstract execute(payload: INPUT, actor?: any): Promise<Result<OUTPUT, EXCEPTIONS>>

  public async $postExecute(result: Result<OUTPUT, EXCEPTIONS>): Promise<void> {
    console.log(`${this.constructor.name}:${JSON.stringify(result)}`)
  }
}
