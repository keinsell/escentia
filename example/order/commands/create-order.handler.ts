import {Handler} from "../../../src/infrastructure/handler";
import {CreateOrderCommand} from "./create-order";

export class CreateOrderHandler extends Handler<CreateOrderCommand> {
    public handle(input: CreateOrderCommand): Promise<void> | void {
        return undefined;
    }
}
