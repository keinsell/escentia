import {AggregateRoot} from "../../src/domain-modeling/aggregate-root";
import {EntityProperties} from "../../src/domain-modeling/entity";
import {SequentialId} from "../../src/identifiers";
import {UserProperties} from "../user-message-publishing";
import {EmailChanged} from "./email-changed";

export class User extends AggregateRoot<SequentialId, UserProperties> implements UserProperties {
    public email: string

    constructor(properties: EntityProperties<SequentialId, UserProperties>) {
        super(properties)
        this.email = properties.email
    }

    public changeEmail(email: string) {
        this.email = email
        this.addEvent(new EmailChanged(this))
        return this
    }
}
