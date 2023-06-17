import { UniqueIdentifier } from "src/identifiers/unique-identifier"
import { Model } from "src/data-modeling/model"

export abstract class ReadRepository<MODEL extends Model<UniqueIdentifier>> {
	abstract findById(id: MODEL["id"]): Promise<MODEL | undefined>
}
