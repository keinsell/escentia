
import { CUID } from "src";
import { AggregateRoot } from "src/domain-modeling/aggregate-root";
import { EntityProperties } from "src/domain-modeling/entity";

interface ProductProperties {
    name: string
    price: number
}

export class Product extends AggregateRoot<CUID, ProductProperties> implements  ProductProperties{
    public name: string;
    public price: number;

    constructor(properties: EntityProperties<CUID, ProductProperties>) {
        super(properties);
        this.name = properties.name;
        this.price = properties.price;
    }

    changeName(name: string) {
        this.name = name;
    }
}
