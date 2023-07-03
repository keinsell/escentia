import {Handler} from "../../../src/infrastructure/handler";
import {Command} from "../../../src/messages";
import {ProductRepository} from "../product-repository";

export class ChangeProductName extends Command<{aggregateId: string, name: string}> {}

export class ChangeProductNameHandler extends Handler<ChangeProductName> {
    public handle(input: ChangeProductName): Promise<void> | void {
        const product = new ProductRepository().getById(input.body.aggregateId)

        if (!product) {
            throw new Error('Product not found')
        }

        product.changeName(input.body.name)

        new ProductRepository().save(product)

        // TODO: Publish events to event bus
    }
}
