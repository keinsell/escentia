import {Command} from "src/eips/messages";
import {Jsonify} from "type-fest";
import {OrderProperties} from "../order.aggregate";

export class CreateOrderCommand extends Command<Jsonify<OrderProperties>> {
  protected constructor(command: Jsonify<OrderProperties>) {
    super({ body: command })
  }
}
