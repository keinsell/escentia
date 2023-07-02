import {Model} from "src/data-modeling/model"

export abstract class ReadRepository<MODEL extends Model> {
	abstract findById(id: MODEL["id"]): Promise<MODEL | undefined>
}
