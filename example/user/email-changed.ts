import {DomainEvent} from "../../src/domain-modeling/domain-event";
import {User} from "./user";

export class EmailChanged extends DomainEvent<User, {
    email: string
}> {
    constructor(aggregate: User) {
        super({
            body: {
                aggregateId: aggregate.id,
                aggregateVersion: aggregate._version,
                email: aggregate.email
            }
        })
    }
}
