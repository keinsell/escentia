import { DomainEvent } from "src/domain-modeling/domain-event";
import { Order, OrderProperties } from "../order.aggregate";

export class OrderCreated extends DomainEvent<Order, OrderProperties> { }
