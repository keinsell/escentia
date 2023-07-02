import {Model, ModelPayload} from "../../src/data-modeling/model";
import {CUID} from "../../src/identifiers";


interface ProductModelPropertie {
    name: string
     price: number
}

export class ProductModel extends Model<CUID, ProductModelPropertie> implements ProductModelPropertie {
    public name: string;
    public price: number;

    constructor(properties: ModelPayload<CUID, ProductModelPropertie>) {
        super(properties);
        this.name = properties.name;
        this.price = properties.price;
    }
}
