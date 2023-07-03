import { DomainEvent } from "src/domain-modeling/domain-event";
import { OrderAggregate, OrderProperties } from "../order.aggregate";

export class OrderCreated extends DomainEvent<OrderAggregate, OrderProperties> { }
