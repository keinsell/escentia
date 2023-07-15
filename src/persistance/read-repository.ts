import { Model } from "src/data-modeling/model"
import { Some } from "src/utilities/option"

export abstract class ReadRepository<MODEL extends Model> {
	abstract all(): Promise<Some<MODEL>>
}
