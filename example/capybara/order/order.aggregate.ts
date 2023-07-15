import { AggregateRoot } from "src/domain-modeling/aggregate-root";
import { EntityProperties } from "src/domain-modeling/entity";
import { CUID } from "src/identifiers";

export interface OrderProperties {
  customerId: string
  productId: string
  quantity: number
  total: number
}

export class Order extends AggregateRoot<CUID, OrderProperties> implements OrderProperties {
  customerId: string;
  productId: string;
  quantity: number;
  total: number;

  constructor(properties: EntityProperties<CUID, OrderProperties>) {
    super(properties)
    this.customerId = properties.customerId
    this.productId = properties.productId
    this.quantity = properties.quantity
    this.total = properties.total
  }

  createOrder() {
    return this
  }
}
