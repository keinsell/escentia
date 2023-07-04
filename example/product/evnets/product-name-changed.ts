import {DomainEvent} from "../../../src/domain-modeling/domain-event";
import {Product} from "../product";

export class ProductNameChanged extends DomainEvent<Product, {name: string}> {
    constructor(product: Product) {
        super({
            body: {
                name: product.name,
                aggregateId: product.id,
                aggregateVersion: product._version,
            }
        });
    }
}
