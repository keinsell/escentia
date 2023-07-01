import {Model, ModelPayload} from "../../src/data-modeling/model";
import {SequentialId} from "../../src/identifiers";

export interface OrderModelProperties {
    name: string
}

export class OrderModel extends Model<SequentialId, OrderModelProperties> implements OrderModelProperties {
    public readonly name: string

    public constructor(payload: ModelPayload<SequentialId, OrderModelProperties>) {
        super(payload)
        this.name = payload.name
    }
}
