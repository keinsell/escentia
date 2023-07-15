import { Handler } from "src/infrastructure/handler";
import { OrderCreated } from "./order-created";

export class OrderCreatedHandler extends Handler<OrderCreated> {
  public handle(input: OrderCreated): void | Promise<void> {
    console.log(input)
  }
}
