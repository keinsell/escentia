import {ConditionalKeys} from "type-fest";
import {Model} from "../data-modeling/model";

export type Repository<T extends Model> = {
    select?: Record<ConditionalKeys<Omit<T, "_model">, any>, boolean>
    sort?: Record<ConditionalKeys<Omit<T, "_model">, any>, "ascending" | "descending">
    limit?: number
    skip?: number
} & T
