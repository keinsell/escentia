import {Product} from "./product";

const PRODUCT_DATABASE: Product[] = [];

export class ProductRepository {
    async save(product: Product) {
        // Find and update or create
        const index = PRODUCT_DATABASE.findIndex(o => o.id === product.id)
        if (index === -1) {
            PRODUCT_DATABASE.push(product)
        }
        else {
            PRODUCT_DATABASE[index] = product
        }
    }

    public getById(aggregateId: string) {
        return PRODUCT_DATABASE.find(o => o.id === aggregateId)
    }
}
