import {cuid} from "src/identifiers";
import {Product} from "./product/product";

const product = new Product({name: "Product 1", price: 100, id: cuid()});
product.changeName("Product 2");

console.log(product._events)
