import { Command } from "src/messages";
import { OrderProperties } from "../order.aggregate";
import { Jsonify } from "type-fest";

export class CreateOrderCommand extends Command<Jsonify<OrderProperties>> {
  protected constructor(command: Jsonify<OrderProperties>) {
    super({ body: command })
  }
}
