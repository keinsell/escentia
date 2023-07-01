export class OrderAggregate extends Aggregate {
    constructor(payload) {
        super(payload);
        this.name = payload.name;
    }
}
