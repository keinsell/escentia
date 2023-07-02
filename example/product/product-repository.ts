import {Product} from "./product";

const storage: Product[] = [];

export class ProductRepository {
    constructor() {
        console.log("ProductRepository loaded");
        console.log(this.constructor.name);
    }

    async createProduct(product: Product) {
        console.log("ProductRepository.createProduct");
        console.log(product);

        storage.push(product);
    }
}
