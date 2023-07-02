import { AggregateRoot } from "./aggregate-root";
import { Entity } from "./entity";

// TODO: I wonder if there may be class that will be registred as potencially decorator and will protect against breaking boundary conext rules, as something will be registred as one boundary cannot be used in another boundary.

export abstract class BoundaryContext<
  AGGREGATE extends AggregateRoot,
  ENTITY extends Entity
> { }
