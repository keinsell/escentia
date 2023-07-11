import { EmptyObject } from "type-fest"
import { UniqueIdentifier } from "../identifiers/unique-identifier"
import { DomainEvent } from "./domain-event"
import { Entity, EntityProperties } from "./entity"

export abstract class AggregateRoot<
  ID extends UniqueIdentifier = UniqueIdentifier,
  PROPERTIES = EmptyObject
> extends Entity<ID> {
  protected constructor(properties: EntityProperties<ID, PROPERTIES>) {
    super(properties)
  }

  private __events: DomainEvent<this>[] = []

  get _events(): DomainEvent<this>[] {
    return this.__events
  }

  public addEvent<T extends DomainEvent<this>>(
    event: T
  ): void {
    this.incrementVersion()
    this.__events.push(event)
  }

  // TODO: Add apply method that will apply specific event on aggregate
  // This can be based on decorators on somehow on meta programing using specifc
  // methods name in aggregate such as "onOrderCreated".
}
