import { ConditionalKeys } from "type-fest"
import { Model } from "../data-modeling/model"
import { Entity } from "src/domain-modeling/entity"
import { Option, Some } from "src/utilities/option"

export type Repository2<T extends Model> = {
  select?: Record<ConditionalKeys<Omit<T, "_model">, any>, boolean>
  sort?: Record<
    ConditionalKeys<Omit<T, "_model">, any>,
    "ascending" | "descending"
  >
  limit?: number
  skip?: number
} & T

export abstract class Repository<T extends Model<any, any> | Entity<any, any>> {
  abstract findById(id: T["id"]): Promise<Option<T>>
  abstract findAll(): Promise<Some<T>>
  abstract save(model: T): Promise<T>
}
