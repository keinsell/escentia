import {
  SequentialId,
  sequentialId,
} from "src/identifiers/sequential-id/sequential-id"
import { UniqueIdentifier } from "../identifiers/unique-identifier"
import { Entity } from "./entity"
import { DomainEvent } from "./domain-event"

export abstract class AggregateRoot<ENTITY extends Entity<UniqueIdentifier>> {
  protected readonly _id: ENTITY["_id"]
  private _version: SequentialId
  private _events: DomainEvent<AggregateRoot<ENTITY>>[] = []
  protected root: ENTITY

  protected constructor(root: ENTITY, version?: SequentialId) {
    this._id = root._id
    this._version = version || sequentialId(0)
    this.root = root
  }

  protected incrementVersion(): void {
    this._version++
  }

  addEvent<T extends DomainEvent<AggregateRoot<ENTITY>>>(event: T): void {
    this._events.push(event)
  }

  get events(): DomainEvent<AggregateRoot<ENTITY>>[] {
    return this._events
  }
}
