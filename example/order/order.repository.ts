import { OrderAggregate } from "./order.aggregate";

export const ORDER_DATABASE: OrderAggregate[] = []

export class OrderRepository {
  save(order: OrderAggregate) {
    // Find and update or create
    const index = ORDER_DATABASE.findIndex(o => o.id === order.id)
    if (index === -1) {
      ORDER_DATABASE.push(order)
    }
    else {
      ORDER_DATABASE[index] = order
    }
  }
}
