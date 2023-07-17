import { ConditionalKeys } from "type-fest"
import { Model } from "../data-modeling/model"
import { Entity } from "src/domain-modeling/entity"
import { Option, Some } from "src/utilities/option"
import { Result } from "src/utilities/result"
import { DataIntegrityViolation } from "src/exceptions/data-integrity-violation"
import { OptimisticLockingConflict } from "src/exceptions/optimistic-locking-conflict"
import { StaleObjectState } from "src/exceptions/stale-object-state"
import { AggregateRoot } from "src/domain-modeling/aggregate-root"

export type Repository2<T extends Model> = {
	select?: Record<ConditionalKeys<Omit<T, "_model">, any>, boolean>
	sort?: Record<
		ConditionalKeys<Omit<T, "_model">, any>,
		"ascending" | "descending"
	>
	limit?: number
	skip?: number
} & T

export abstract class Repository<
	T extends Model<any, any> | Entity<any, any> | AggregateRoot<any, any>
> {
	abstract findById(id: T["id"]): Promise<Option<T>>
	abstract all(): Promise<Some<T[]>>
	abstract save(
		model: T
	): Promise<
		Result<
			T,
			DataIntegrityViolation | OptimisticLockingConflict | StaleObjectState
		>
	>
}
