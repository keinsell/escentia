import {Handler} from "../../src/infrastructure/handler";
import {Command} from "../../src/messages";
import {ProductRepository} from "./product-repository";

export class ChangeProductName extends Command<{name: string}> {}

export class ChangeProductNameHandler extends Handler<ChangeProductName> {
    public handle(input: ChangeProductName): Promise<void> | void {
        const product = new ProductRepository().getById(input.body.aggregateId)

        product.changeName(input.body.name)

        new ProductRepository().save(product)
    }
}
